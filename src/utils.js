import {Breakpoint, Viewport} from './const';

export const getClassName = (...args) => args.filter(Boolean).join(` `);

export const defineViewportWidth = () => {
  if (window.innerWidth >= Breakpoint.DESKTOP) {
    return Viewport.DESKTOP;
  }
  if (window.innerWidth < Breakpoint.TABLET) {
    return Viewport.MOBILE;
  }
  return Viewport.TABLET;
};

export const clearNumber = (str) => Number(str.replace(/\D/g, ``));

export const isValidValue = (value, min, max) => {
  if (value < min || value > max || isNaN(value)) {
    return false;
  }
  return true;
};

export const getPluralNumeral = (count, formOne, formTwo, formMany) => {
  if (count > 4 && count < 21) {
    return formMany;
  }

  const remainder = count % 10;
  if (remainder === 1) {
    return formOne;
  }

  if (remainder > 1 && remainder < 5) {
    return formTwo;
  }

  return formMany;
};

export const getPeriodLabel = (value) => getPluralNumeral(value, `год`, `года`, `лет`);

export const getPaymentByRate = (total, rate) => Math.round(total * rate / 100);

export const getRateByPayment = (total, payment) => payment * 100 / total;

export const getAnnuityPayment = (total, yearRate, period) => {
  const monthRate = yearRate / (12 * 100);
  const monthCount = period * 12;
  return Math.round(total * monthRate / (1 - Math.pow(1 + monthRate, -monthCount)));
};

export const formatRequestNumber = (count) => `№ ${String(count).padStart(4, `0`)}`;
export const formatMoneyString = (count) => `${count.toLocaleString(`ru-RU`)} рублей`;
