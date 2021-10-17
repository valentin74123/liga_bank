import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Service} from '../../data/services';
import {getClassName} from '../../utils';
import {TabType, Viewport} from '../../const';

import "./style.scss";

const getImgSize = (viewportType) => {
  switch (viewportType) {
    case Viewport.MOBILE:
      return ({
        width: `125`,
        height: `113`,
      });
    case Viewport.TABLET:
      return ({
        width: `395`,
        height: `260`,
      });
    default:
      return ({
        width: `440`,
        height: `290`,
      });
  }
};

const TabContent = (props) => {
  const {tabName, viewportType} = props;

  const {title, features, imageUrl} = Service[tabName];

  const imageSrc = imageUrl[viewportType];

  const className = useMemo(() => getClassName(`tabs-content`, `tabs-content--${tabName}`), [tabName]);

  const isCreditTab = tabName === TabType.CREDIT.type;

  let tabIndex;

  if (tabName === TabType.DEPOSIT.type) {
    tabIndex = 1;
  }

  if (tabName === TabType.INSURANCE.type) {
    tabIndex = 3;
  }

  if (tabName === TabType.SERVICES.type) {
    tabIndex = 4;
  }

  const {width, height} = getImgSize(viewportType);

  return (
    <article className={className}>
      <div className="tabs-content__container">
        <div className="tabs-content__column tabs-content__column--left">
          <h3 className="tabs-content__title">{title}</h3>

          <ul className="tabs-content__features">
            {features.map(({id, text}) => (
              <li key={id} className="tabs-content__item">
                <span>{text}</span>
              </li>
            ))}
          </ul>

          {isCreditTab ?
            <p className="tabs-content__credit-info">
              Рассчитайте ежемесячный платеж и&nbsp;ставку&nbsp;по кредиту воспользовавшись нашим <a tabIndex={2} href="/">кредитным калькулятором</a>
            </p>
            : <Link tabIndex={tabIndex} className="tabs-content__button" to="/">
              Узнать подробнее
            </Link>}
        </div>

        <div className="tabs-content__column tabs-content__column--right">
          <div className="tabs-content__image">
            <img src={imageSrc} width={width} height={height} alt={title} />
          </div>
        </div>
      </div>
    </article>
  );
};

TabContent.propTypes = {
  tabName: PropTypes.string.isRequired,
  viewportType: PropTypes.string.isRequired,
};

export default TabContent;
