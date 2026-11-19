import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { BottomActionBar } from '@/components/ui/BottomActionBar';
import { PriceRow } from '@/components/ui/PriceRow';
import { Screen } from '@/components/ui/Screen';
import { StateMessage } from '@/components/ui/StateMessage';
import { TextField, type TextFieldRef } from '@/components/ui/TextField';
import { parseDecimal } from '@/features/quote/calculateQuote';
import { useQuote } from '@/features/quote/useQuote';
import type { ContactDetails } from '@/features/request/types';
import { hasErrors, validateContact, type ContactErrorCode } from '@/features/request/validateContact';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { useAppLanguage } from '@/i18n/useAppLanguage';
import { persistRequestRemote } from '@/services/firebase/requests.repository';
import { useRequestDraftStore } from '@/store/requestDraft.store';
import { useRequestsStore } from '@/store/requests.store';
import { formatPrice } from '@/utils/formatPrice';

const EMPTY_CONTACT: ContactDetails = { name: '', email: '', phone: '', message: '' };

export default function ContactScreen() {
  const { t } = useTranslation();
  const language = useAppLanguage();
  const { product, breakdown, isValid } = useQuote();
  const draft = useRequestDraftStore();
  const addRequest = useRequestsStore((state) => state.add);
  const markSent = useRequestsStore((state) => state.markSent);
  const { isOnline } = useNetworkStatus();
  const [contact, setContact] = useState<ContactDetails>(EMPTY_CONTACT);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const emailRef = useRef<TextFieldRef>(null);
  const phoneRef = useRef<TextFieldRef>(null);
  const messageRef = useRef<TextFieldRef>(null);

  if (!product || !breakdown || !isValid) {
    return (
      <Screen>
        <StateMessage
          icon="document-text-outline"
          title={t('product.notFoundHeading')}
          action={{ label: t('product.backToCatalog'), onPress: () => router.dismissAll() }}
        />
      </Screen>
    );
  }

  const errors = validateContact(contact, draft.surMesure);
  const visibleErrors = submitted ? errors : {};

  const errorText = (field: keyof ContactDetails, code: ContactErrorCode | undefined) => {
    if (!code) return undefined;
    if (code === 'tooShort') return t(field === 'name' ? 'contact.errors.nameTooShort' : 'contact.errors.messageTooShort');
    return t(`contact.errors.${code}`);
  };

  const update = (field: keyof ContactDetails) => (value: string) => setContact((current) => ({ ...current, [field]: value }));

  const submit = async () => {
    setSubmitted(true);
    if (hasErrors(errors) || saving) return;

    setSaving(true);
    const saved = addRequest({
      productHandle: product.handle,
      productName: product.name,
      productImageUrl: product.imageUrl,
      quantity: draft.quantity,
      surMesure: draft.surMesure,
      customLengthCm: draft.surMesure ? parseDecimal(draft.customLength) : null,
      shippingZone: draft.shippingZone,
      quote: breakdown,
      contact: {
        name: contact.name.trim(),
        email: contact.email.trim(),
        phone: contact.phone.trim(),
        message: contact.message.trim(),
      },
    });

    let outcome: 'sent' | 'savedLocal' = 'savedLocal';
    if (isOnline) {
      try {
        outcome = await persistRequestRemote(saved);
        if (outcome === 'sent') markSent(saved.id);
      } catch {
        outcome = 'savedLocal';
      }
    }

    setSaving(false);
    router.replace({ pathname: '/request/confirmation', params: { id: saved.id, outcome } });
  };

  return (
    <Screen>
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerClassName="gap-7 px-6 pb-10 pt-4" keyboardShouldPersistTaps="handled">
          {!isOnline ? (
            <Text className="font-sans text-xs leading-5 text-bordeaux">{t('network.offline')}</Text>
          ) : null}
          <Text className="font-sans-light text-base leading-6 text-taupe">{t('contact.intro')}</Text>

          <TextField
            label={t('contact.name')}
            value={contact.name}
            onChangeText={update('name')}
            placeholder={t('contact.namePlaceholder')}
            autoComplete="name"
            textContentType="name"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
            error={errorText('name', visibleErrors.name)}
          />
          <TextField
            ref={emailRef}
            label={t('contact.email')}
            value={contact.email}
            onChangeText={update('email')}
            placeholder={t('contact.emailPlaceholder')}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
            returnKeyType="next"
            onSubmitEditing={() => phoneRef.current?.focus()}
            error={errorText('email', visibleErrors.email)}
          />
          <TextField
            ref={phoneRef}
            label={t('contact.phone')}
            value={contact.phone}
            onChangeText={update('phone')}
            placeholder={t('contact.phonePlaceholder')}
            keyboardType="phone-pad"
            autoComplete="tel"
            textContentType="telephoneNumber"
            onSubmitEditing={() => messageRef.current?.focus()}
            error={errorText('phone', visibleErrors.phone)}
          />
          <TextField
            ref={messageRef}
            label={t('contact.message')}
            value={contact.message}
            onChangeText={update('message')}
            placeholder={t(draft.surMesure ? 'contact.messagePlaceholderRequired' : 'contact.messagePlaceholderOptional')}
            multiline
            error={errorText('message', visibleErrors.message)}
          />
        </ScrollView>

        <BottomActionBar>
          <View className="gap-4">
            <PriceRow
              label={`${product.name} × ${draft.quantity}`}
              value={formatPrice(breakdown.total, language, product.currency)}
            />
            <AppButton label={saving ? '…' : t('contact.submit')} onPress={submit} disabled={saving} />
          </View>
        </BottomActionBar>
      </KeyboardAvoidingView>
    </Screen>
  );
}
