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
