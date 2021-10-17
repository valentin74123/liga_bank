import React from 'react';
import PropTypes from 'prop-types';
import SwiperCore, {Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import TabContent from '../tab-content/tab-content';
import {TabType} from '../../const';

import "./style.scss";

SwiperCore.use([Pagination]);

const services = Object.values(TabType);

const TabsSlider = (props) => {
  const {viewportType} = props;

  return (
    <Swiper
      pagination={{clickable: true}}
      className="tabs-slider"
    >
      {services.map((tab) => (
        <SwiperSlide key={tab.type}>
          <TabContent tabName={tab.type} viewportType={viewportType}/>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

TabsSlider.propTypes = {
  viewportType: PropTypes.string.isRequired,
};

export default TabsSlider;
