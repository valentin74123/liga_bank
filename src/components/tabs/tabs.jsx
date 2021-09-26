import React from 'react';
import PropTypes from 'prop-types';
import {getClassName} from '../../utils';
import {TabType, TabTypeToData} from '../../const';

const Tabs = (props) => {
  const {activeTab, onClick} = props;

  const TABS = Object.values(TabType);

  return (
    <ul className="tabs list">
      {TABS.map((type) => {
        const {imgId, title} = TabTypeToData[type];
        const isActive = type === activeTab;
        return (
          <li
            onClick={onClick}
            key={type}
            id={type}
            className={
              getClassName(`tabs__item`,
                  `tabs__item--${type}`,
                  isActive && `tabs__item--active`)
            }
            tabIndex={0}
          >
            <svg className="tabs__icon" width="34" height="30">
              <use xlinkHref={imgId}></use>
            </svg>

            <h3>{title}</h3>
          </li>
        );
      })}
    </ul>
  );
};

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tabs;
