import React, {useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigation} from '../../const';
import {defineViewportWidth} from '../../utils';
import {getViewport} from '../../store/page/selectors';
import {setViewport} from '../../store/actions';

import Header from "../header/header";
import Slider from "../slider/slider";
import TabsSection from "../tabs-section/tabs-section";
import CreditCalculator from "../credit-calculator/credit-calculator";
import Footer from "../footer/footer";

const CalculateLoanScreen = () => {
  const viewport = useSelector(getViewport);

  const dispatch = useDispatch();

  const changeDevice = useCallback(() => {
    const newViewport = defineViewportWidth();
    if (newViewport !== viewport) {
      dispatch(setViewport(newViewport));
    }
  }, [dispatch, viewport]);

  useEffect(() => {
    window.addEventListener(`resize`, changeDevice);
    return () => {
      window.removeEventListener(`resize`, changeDevice);
    };
  }, [changeDevice]);

  return (
    <div className="page">
      <Header currentPage={Navigation.CREDIT}/>

      <main>
        <Slider />

        <TabsSection />

        <CreditCalculator />
      </main>

      <Footer />
    </div>
  );
};

export default CalculateLoanScreen;
