import React from "react";
import {BrowserRouter} from 'react-router-dom';
import CalculateLoanScreen from '../calculate-loan-screen/calculate-loan-screen';

const App = () => {
  return (
    <BrowserRouter>
      <CalculateLoanScreen />
    </BrowserRouter>
  );
};

export default App;
