import React, {useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigation} from '../../const';
import {defineViewportWidth} from '../../utils';
import {getViewport, getPopup} from '../../store/page/selectors';
import {setViewport, setPopup} from '../../store/actions';

import Header from "../header/header";
import Slider from "../slider/slider";
import TabsSection from "../tabs-section/tabs-section";
import CreditCalculator from "../credit-calculator/credit-calculator";
import MapSection from "../map-section/map-section";
import Footer from "../footer/footer";
import Popup from "../popup/popup";

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

  const popupName = useSelector(getPopup);
  const isPopupShown = Boolean(popupName);

  const closePopup = useCallback(() => dispatch(setPopup(null)), [dispatch]);

  return (
    <div className="page">
      <Header currentPage={Navigation.CREDIT}/>

      <main className="main">
        <Slider />

        <TabsSection />

        <CreditCalculator />

        <MapSection />
      </main>

      <Footer />

      {isPopupShown && <Popup id={popupName} onClose={closePopup}/>}
    </div>
  );
};

export default CalculateLoanScreen;
