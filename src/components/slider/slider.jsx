import React from 'react';
import SwiperCore, {Pagination, Autoplay} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Link} from 'react-scroll';

SwiperCore.use([Pagination, Autoplay]);

const Slider = () => {
  return (
    <Swiper
      pagination={{clickable: true}}
      loop
      autoplay={{delay: 4000, disableOnInteraction: true}}
      simulateTouch={false}
      className="slider"
    >
      <SwiperSlide className="swiper-slide slide slide--1 slide--dark">
        <div className="slide__wrapper">
          <h3 className="slide__title">Лига Банк</h3>
          <p className="slide__text">Кредиты на любой случай</p>
          <Link to="calculator" smooth offset={-40} duration={500} className="slide__button button">
            Рассчитать кредит
          </Link>
        </div>
      </SwiperSlide>

      <SwiperSlide className="swiper-slide slide slide--2 slide--light">
        <div className="slide__wrapper">
          <h3 className="slide__title">Лига Банк</h3>
          <p className="slide__text">Ваша уверенность в&nbsp;завтрашнем дне</p>
        </div>
      </SwiperSlide>

      <SwiperSlide className="swiper-slide slide slide--3 slide--light">
        <div className="slide__wrapper">
          <h3 className="slide__title">Лига Банк</h3>
          <p className="slide__text">Всегда рядом</p>
          <Link to="map-section" smooth offset={-40} duration={500} className="slide__button button">
            Найти отделение
          </Link>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
