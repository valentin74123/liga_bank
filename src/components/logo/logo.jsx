import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Logo = (props) => {
  const {className, isMobile, isHeader} = props;

  const imgUrl = useMemo(() => isMobile ? `./img/logo-mobile.svg` : `./img/logo.svg`, [isMobile]);
  const logoClass = useMemo(() => `${className} logo`, [className]);

  const tabIndex = isHeader ? 1 : 0;

  return (
    <Link tabIndex={tabIndex} className={logoClass} to="/" aria-label="На главную">
      <img src={imgUrl} width="150" height="25" alt="Логотип Лига Банк" />
    </Link>
  );
};

Logo.propTypes = {
  className: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isHeader: PropTypes.bool.isRequired,
};

export default Logo;
