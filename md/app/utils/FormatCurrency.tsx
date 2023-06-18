const CURRENCY_FORMATTERS = {
  EGP: new Intl.NumberFormat(undefined, {
    currency: "EGP",
    style: "currency",
  }),
  QAR: new Intl.NumberFormat(undefined, {
    currency: "QAR",
    style: "currency",
  }),
  SAR: new Intl.NumberFormat(undefined, {
    currency: "SAR",
    style: "currency",
  }),
};

export const FormatCurrency = (number, currency="EGP") => {
  const parsedNumber = parseFloat(number);
  const formatter = CURRENCY_FORMATTERS[currency] || CURRENCY_FORMATTERS.EGP;
  return formatter.format(parsedNumber);
};