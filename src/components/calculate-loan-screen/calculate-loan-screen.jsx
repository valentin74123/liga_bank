import React from 'react';
import {Navigation} from '../../const';
import Header from "../header/header";
import Slider from "../slider/slider";
import TabsSection from "../tabs-section/tabs-section";
import Footer from "../footer/footer";

const CalculateLoanScreen = () => {
  return (
    <div className="page">
      <Header currentPage={Navigation.CREDIT}/>

      <main>
        <Slider />

        <TabsSection />
      </main>

      <Footer />
    </div>
  );
};

export default CalculateLoanScreen;
