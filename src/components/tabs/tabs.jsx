import React from 'react';
import PropTypes from 'prop-types';
import {getClassName} from '../../utils';
import {TabType, TabTypeToData} from '../../const';

import "./style.scss";

const Tabs = (props) => {
  const {activeTab, onFocus, onClick} = props;

  const TABS = Object.values(TabType);

  return (
    <ul className="tabs">
      {TABS.map((tab) => {
        const {imgId, title} = TabTypeToData[tab.type];
        const isActive = tab.type === activeTab;

        return (
          <li
            onClick={onClick}
            onFocus={onFocus}
            key={tab.type}
            id={tab.type}
            className={
              getClassName(`tabs__item`,
                  `tabs__item--${tab.type}`,
                  isActive && `tabs__item--active`)
            }
            tabIndex={tab.tabIndex}
          >
            <svg className="tabs__icon" width="34" height="30">
              <use xlinkHref={imgId}></use>
            </svg>

            <h3 className="tabs__title">{title}</h3>
          </li>
        );
      })}
    </ul>
  );
};

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onFocus: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tabs;
