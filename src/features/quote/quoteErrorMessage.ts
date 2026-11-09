import type { TFunction } from 'i18next';

import type { QuoteError } from './calculateQuote';

export function quoteErrorMessage(t: TFunction, error: QuoteError): string {
  switch (error.field) {
    case 'quantity':
      return t('quote.errors.quantityOutOfRange', { min: error.min, max: error.max });
    case 'unitPrice':
      return t('quote.errors.unitPriceInvalid');
    case 'customLength':
      if (error.code === 'required') return t('quote.errors.customLengthRequired');
      if (error.code === 'notNumeric') return t('quote.errors.customLengthNotNumeric');
      return t('quote.errors.customLengthOutOfRange', { min: error.min, max: error.max });
  }
}
