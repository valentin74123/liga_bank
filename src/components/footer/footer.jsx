import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {FOOTER_LINKS, Viewport} from '../../const';
import {getViewport} from '../../store/page/selectors';
import Logo from '../logo/logo';

const Footer = () => {
  const viewportType = useSelector(getViewport);

  const isMobile = viewportType === Viewport.MOBILE;

  return (
    <footer className="page__footer footer">
      <div className="footer__wrapper">
        <div className="footer__column footer__column--left">
          <Logo className="footer__logo" isMobile={isMobile} />

          <div className="footer__item footer__item--info">
            <address className="footer__text">150015, г. Москва, ул. Московская, д. 32</address>
            <p className="footer__text">Генеральная лицензия Банка России №1050</p>
            <p className="footer__text">&copy; Лига Банк, 2019</p>
          </div>

          <div className="footer__item footer__item--nav">
            <ul className="footer-nav list">
              {FOOTER_LINKS.map(({link, title}) => (
                <li key={link} className="footer-nav__item">
                  <Link to={link} className="footer-nav__link">{title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__column footer__column--right">
          <div className="footer__item contact contact--mobile">
            <a className="contact__link contact__link--short" href="tel:0904">
              <svg className="contact__icon" width="10" height="16">
                <use xlinkHref="#phone"></use>
              </svg>
              <span>*0904</span>
            </a>
            <p className="contact__text">Бесплатно для абонентов МТС, Билайн, Мегафон, Теле2</p>
          </div>

          <div className="footer__item contact contact--phone">
            <a className="contact__link contact__link--long" href="tel:+78001112233">
              <svg className="contact__icon" width="16" height="16">
                <use xlinkHref="#telephone"></use>
              </svg>
              <span>8 800 111 22 33</span>
            </a>
            <p className="contact__text">Бесплатный для всех городов России</p>
          </div>

          <div className="footer__item footer__item--social social">
            <ul className="social__list list">
              <li className="social__item">
                <Link to="/" className="social__link" aria-label="Лига Банк в фейсбук">
                  <svg className="icon" width="9" height="16"><use xlinkHref="#facebook"></use></svg>
                </Link>
              </li>

              <li className="social__item">
                <Link to="/" className="social__link" aria-label="Лига Банк в Инстаграм">
                  <svg className="icon" width="16" height="16"><use xlinkHref="#instagram"></use></svg>
                </Link>
              </li>

              <li className="social__item">
                <Link to="/" className="social__link" aria-label="Лига Банк в Твиттере">
                  <svg className="icon" width="16" height="13"><use xlinkHref="#twitter"></use></svg>
                </Link>
              </li>

              <li className="social__item">
                <Link to="/" className="social__link" aria-label="Лига Банк на Ютюб">
                  <svg className="icon" width="16" height="13"><use xlinkHref="#youtube"></use></svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
