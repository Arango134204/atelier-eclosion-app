import type { ContactDetails } from './types';

export type ContactErrorCode = 'required' | 'tooShort' | 'invalidEmail' | 'invalidPhone';
export type ContactErrors = Partial<Record<keyof ContactDetails, ContactErrorCode>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_PHONE_DIGITS = 8;
const MIN_NAME_LENGTH = 2;
const MIN_MESSAGE_LENGTH = 10;

/**
 * @param messageRequired el mensaje es obligatorio en encargos sur mesure (describe la pieza deseada).
 */
export function validateContact(contact: ContactDetails, messageRequired: boolean): ContactErrors {
  const errors: ContactErrors = {};

  const name = contact.name.trim();
  if (name === '') errors.name = 'required';
  else if (name.length < MIN_NAME_LENGTH) errors.name = 'tooShort';

  const email = contact.email.trim();
  if (email === '') errors.email = 'required';
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'invalidEmail';

  const phoneDigits = contact.phone.replace(/\D/g, '');
  if (contact.phone.trim() === '') errors.phone = 'required';
  else if (phoneDigits.length < MIN_PHONE_DIGITS || /[^\d\s+().-]/.test(contact.phone)) errors.phone = 'invalidPhone';

  const message = contact.message.trim();
  if (messageRequired) {
    if (message === '') errors.message = 'required';
    else if (message.length < MIN_MESSAGE_LENGTH) errors.message = 'tooShort';
  }

  return errors;
}

export const hasErrors = (errors: ContactErrors) => Object.keys(errors).length > 0;
