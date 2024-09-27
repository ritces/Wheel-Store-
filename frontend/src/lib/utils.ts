import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  value: number | null | undefined,
  decimalPlaces = 2,
  locale = 'en-US',
  currency = 'USD',
): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '-';
  }

  const absValue = Math.abs(value);
  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    });

    const formattedValue = formatter.format(absValue);
    return value < 0 ? `-${formattedValue}` : formattedValue;
  } catch (error) {
    console.error('Error formatting currency:', error);
    // Fallback to a simple formatting if Intl.NumberFormat fails
    const fixedValue = absValue.toFixed(decimalPlaces);
    return value < 0 ? `-$${fixedValue}` : `$${fixedValue}`;
  }
}
