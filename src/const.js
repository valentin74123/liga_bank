const ESC_KEY = `Escape`;

const AppRoute = {
  ROOT: `/`,
  CONTACTS: `/contacts`,
  CURRENCY: `/currency`,
  LOGIN: `/login`,
  SERVICES: `/services`,
  QUESTION: `/query`,
};

const Breakpoint = {
  DESKTOP: 1024,
  TABLET: 768,
};

const TabType = {
  DEPOSIT: `deposit`,
  CREDIT: `credit`,
  INSURANCE: `insurance`,
  SERVICES: `services`,
};

const TabTypeToData = {
  credit: {
    title: `Кредиты`,
    imgId: `#cards`,
  },
  deposit: {
    title: `Вклады`,
    imgId: `#vault`,
  },
  insurance: {
    title: `Страхование`,
    imgId: `#security`,
  },
  services: {
    title: `Онлайн-сервисы`,
    imgId: `#phone`,
  },
};

const Viewport = {
  DESKTOP: `desktop`,
  TABLET: `tablet`,
  MOBILE: `mobile`,
};

const Navigation = {
  CONTACTS: {
    link: AppRoute.CONTACTS,
    title: `Контакты`,
  },

  CREDIT: {
    link: AppRoute.ROOT,
    title: `Рассчитать кредит`,
  },

  CURRENCY: {
    link: AppRoute.CURRENCY,
    title: `Конвертер валют`,
  },

  SERVICES: {
    link: AppRoute.SERVICES,
    title: `Услуги`,
  },
};

const HEADER_LINKS = [Navigation.SERVICES, Navigation.CREDIT, Navigation.CURRENCY, Navigation.CONTACTS];

export {AppRoute, Breakpoint, ESC_KEY, HEADER_LINKS, Navigation, TabType, TabTypeToData, Viewport};
