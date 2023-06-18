// currencyUtils.js
import { persistentAtom } from '@nanostores/persistent';

const currencyAtom = persistentAtom('selectedCurrency', 'EGP');

export function getSelectedCurrency() {
  return currencyAtom.value;
}

export function setSelectedCurrency(currency) {
  currencyAtom.set(currency);
}
