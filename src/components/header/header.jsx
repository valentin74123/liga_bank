import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {getClassName} from '../../utils';
import {ESC_KEY, HEADER_LINKS, Viewport, PopupType} from '../../const';
import {getViewport} from '../../store/page/selectors';
import {setPopup} from '../../store/actions';
import Logo from '../logo/logo';

import "./style.scss";

const Header = (props) => {
  const {currentPage} = props;

  const viewportType = useSelector(getViewport);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isMobile = viewportType === Viewport.MOBILE;

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    document.body.classList.remove(`page--lock`);
  }, [setIsMenuOpen]);

  const openMenu = useCallback(() => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      document.body.classList.add(`page--lock`);
    }
  }, [isMenuOpen, setIsMenuOpen]);

  const handleEscKeyDown = useCallback((evt) => {
    if (evt.key === ESC_KEY) {
      closeMenu();
    }
  }, [closeMenu]);

  useEffect(() => (
    isMenuOpen
      ? document.addEventListener(`keydown`, handleEscKeyDown)
      : document.removeEventListener(`keydown`, handleEscKeyDown)
  ), [handleEscKeyDown, isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen && !isMobile) {
      setIsMenuOpen(false);
      document.body.classList.remove(`page--lock`);
    }
  }, [isMenuOpen, isMobile]);

  const headerClassName = useMemo(() => getClassName(`header`, isMenuOpen ? `header--open` : `header--close`), [isMenuOpen]);


  const dispatch = useDispatch();

  const handleLoginClick = useCallback(() => dispatch(setPopup(PopupType.LOGIN)), [dispatch]);


  return (
    <header className={headerClassName}>
      <div className="header__wrapper">
        <Logo className="header__logo" isMobile={isMobile} />
        <button onClick={openMenu} className="header__button header__button--open" isabled={isMenuOpen}>
          Открыть меню
        </button>

        <button onClick={closeMenu} className="header__button header__button--close">
          Закрыть меню
        </button>

        <div className="header__container">
          <nav className="header__nav navigation">
            <ul className="navigation__list">
              {HEADER_LINKS.map(({link, title}) => (
                <li key={link} className="navigation__item">
                  {(currentPage.title === title)
                    ? <span className="navigation__link navigation__link--current">{title}</span>
                    : <Link to={link} className="navigation__link">{title}</Link>}
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__user-nav user-nav">
            <div className="user-nav__wrapper">
              <button onClick={handleLoginClick} className="user-nav__link" type="button" aria-label="Войти в Интернет-банк">
                <svg className="user-nav__icon" width="20" height="22">
                  <use xlinkHref="#login"></use>
                </svg>
                <span className="user-nav__label">Войти в Интернет-банк</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  currentPage: PropTypes.shape({
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default Header;
