// const CURRENCY_FORMATTERS = {
//   EGP: new Intl.NumberFormat(undefined, {
//     currency: "EGP",
//     style: "currency",
//   }),
//   QAR: new Intl.NumberFormat(undefined, {
//     currency: "QAR",
//     style: "currency",
//   }),
//   SAR: new Intl.NumberFormat(undefined, {
//     currency: "SAR",
//     style: "currency",
//   }),
// };

// export const FormatCurrency = (number, currency="EGP") => {
//   const parsedNumber = parseFloat(number);
//   const formatter = CURRENCY_FORMATTERS[currency] || CURRENCY_FORMATTERS.EGP;
//   return formatter.format(parsedNumber);
// };
import React from 'react';
import { useCurrency } from '~/CurrencyContext';
type CustomRates = {
  [currency: string]: number;
};
const FormatCurrency: React.FC<{ value: number }> = ({ value }) => {
  const { currency } = useCurrency();
  const formatCurrency = (number: number, currency: string) => {
    const customRates: CustomRates = {
      USD: 0.032,
    };
    const exchangeRate = customRates[currency] || 1;
    const formattedValue = number * exchangeRate;
    const formatter = new Intl.NumberFormat(undefined, {
      currency,
      style: 'currency',
    });
    return formatter.format(formattedValue);
  };
  return <>{formatCurrency(value, currency)}</>;
};
export default FormatCurrency;