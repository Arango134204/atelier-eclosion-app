import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform, ScrollView, Switch, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';

import { FreeShippingProgress } from '@/components/request/FreeShippingProgress';
import { AppButton } from '@/components/ui/AppButton';
import { BottomActionBar } from '@/components/ui/BottomActionBar';
import { Chip } from '@/components/ui/Chip';
import { PriceRow } from '@/components/ui/PriceRow';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { Screen } from '@/components/ui/Screen';
import { StateMessage } from '@/components/ui/StateMessage';
import { TextField } from '@/components/ui/TextField';
import {
  CUSTOM_LENGTH_RANGE,
  FREE_SHIPPING_THRESHOLD,
  QUANTITY_MAX,
  QUANTITY_MIN,
  SUR_MESURE_RATE,
  type ShippingZone,
} from '@/features/quote/quote.rules';
import { quoteErrorMessage } from '@/features/quote/quoteErrorMessage';
import { useQuote } from '@/features/quote/useQuote';
import { useAppLanguage } from '@/i18n/useAppLanguage';
import { useRequestDraftStore } from '@/store/requestDraft.store';
import { colors } from '@/theme/colors';
import { formatPrice } from '@/utils/formatPrice';
import { shopifyImage } from '@/utils/shopifyImage';

const SHIPPING_ZONES: ShippingZone[] = ['france', 'eu', 'international'];

function SectionTitle({ children }: { children: string }) {
  return <Text className="font-sans-medium text-[11px] uppercase tracking-[2px] text-taupe">{children}</Text>;
}

export default function QuoteScreen() {
  const { t } = useTranslation();
  const language = useAppLanguage();
  const { product, breakdown, isValid, errorFor } = useQuote();
  const draft = useRequestDraftStore();
  const [lengthTouched, setLengthTouched] = useState(false);
  const [attemptedContinue, setAttemptedContinue] = useState(false);

  const handleResetQuote = () => {
    draft.resetQuote();
    setLengthTouched(false);
    setAttemptedContinue(false);
  };

  if (!product || !breakdown) {
    return (
      <Screen>
        <StateMessage
          icon="document-text-outline"
          title={t('product.notFoundHeading')}
          action={{ label: t('product.backToCatalog'), onPress: () => router.replace('/') }}
        />
      </Screen>
    );
  }

  const price = (amount: number) => formatPrice(amount, language, product.currency);
  const range = CUSTOM_LENGTH_RANGE[product.type];
  const lengthError = errorFor('customLength');
  const showLengthError = lengthError && (lengthTouched || attemptedContinue);

  const goToContact = () => {
    setAttemptedContinue(true);
    if (isValid) router.push('/request/contact');
  };

  return (
    <Screen>
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerClassName="gap-8 px-6 pb-10 pt-4" keyboardShouldPersistTaps="handled">
          <View className="flex-row items-center gap-4">
            <View className="h-24 w-20 overflow-hidden rounded-sm bg-lin">
              {product.imageUrl ? (
                <Image
                  source={{ uri: shopifyImage(product.imageUrl, 300) }}
                  style={{ width: '100%', height: '100%' }}
                  contentFit="cover"
                />
              ) : null}
            </View>
            <View className="flex-1 gap-1">
              <SectionTitle>{t('quote.piece')}</SectionTitle>
              <Text className="font-serif-medium text-2xl text-encre">{product.name}</Text>
              <Text className="font-sans text-sm text-or">{price(product.price)}</Text>
            </View>
          </View>

          <View className="flex-row items-center justify-between">
            <SectionTitle>{t('product.quantity')}</SectionTitle>
            <QuantityStepper
              value={draft.quantity}
              min={QUANTITY_MIN}
              max={QUANTITY_MAX}
              onChange={draft.setQuantity}
              decreaseLabel={t('product.decrease')}
              increaseLabel={t('product.increase')}
            />
          </View>

          <View className="gap-5 border-t border-sable pt-6">
            <View className="flex-row items-center gap-4">
              <View className="flex-1 gap-1">
                <Text className="font-serif-medium text-xl text-encre">{t('quote.surMesureTitle')}</Text>
                <Text className="font-sans-light text-sm leading-5 text-taupe">
                  {t('quote.surMesureBody', { rate: Math.round(SUR_MESURE_RATE * 100) })}
                </Text>
              </View>
              <Switch
                value={draft.surMesure}
                onValueChange={draft.setSurMesure}
                accessibilityLabel={t('quote.surMesureTitle')}
                trackColor={{ false: colors.grege, true: colors.or }}
                thumbColor={colors.ivoire}
              />
            </View>
            {draft.surMesure ? (
              <Animated.View entering={FadeInDown.duration(260)} exiting={FadeOut.duration(150)}>
                <TextField
                  label={t('quote.customLength')}
                  value={draft.customLength}
                  onChangeText={draft.setCustomLength}
                  onBlur={() => setLengthTouched(true)}
                  keyboardType="decimal-pad"
                  hint={t('quote.customLengthHint', range)}
                  error={showLengthError ? quoteErrorMessage(t, lengthError) : undefined}
                />
              </Animated.View>
            ) : null}
          </View>

          <View className="gap-4 border-t border-sable pt-6">
            <SectionTitle>{t('quote.shippingTitle')}</SectionTitle>
            <View className="flex-row flex-wrap gap-2">
              {SHIPPING_ZONES.map((zone) => (
                <Chip
                  key={zone}
                  label={t(`quote.zone_${zone}`)}
                  selected={draft.shippingZone === zone}
                  onPress={() => draft.setShippingZone(zone)}
                />
              ))}
            </View>
          </View>

          <View className="gap-3 rounded-sm bg-lin p-5">
            <PriceRow label={t('quote.subtotal')} value={price(breakdown.subtotal)} />
            {breakdown.surMesureFee > 0 ? (
              <PriceRow label={t('quote.surMesureFee')} value={price(breakdown.surMesureFee)} />
            ) : null}
            <PriceRow
              label={t('quote.shipping')}
              value={breakdown.shipping === 0 ? t('quote.free') : price(breakdown.shipping)}
            />
            <FreeShippingProgress
              progress={1 - breakdown.remainingForFreeShipping / FREE_SHIPPING_THRESHOLD}
              label={
                breakdown.remainingForFreeShipping > 0
                  ? t('quote.remainingForFree', { amount: price(breakdown.remainingForFreeShipping) })
                  : t('quote.freeReached')
              }
            />
            <View className="mt-2">
              <PriceRow label={t('quote.total')} value={price(breakdown.total)} emphasis />
            </View>
          </View>

          <Text className="font-sans-light text-xs leading-5 text-taupe">{t('quote.estimateNote')}</Text>

          <AppButton label={t('quote.reset')} onPress={handleResetQuote} variant="secondary" />
        </ScrollView>

        <BottomActionBar>
          <AppButton label={t('quote.continue')} onPress={goToContact} disabled={attemptedContinue && !isValid} />
        </BottomActionBar>
      </KeyboardAvoidingView>
    </Screen>
  );
}
