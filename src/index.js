import React from 'react';
import ReactDOM from 'react-dom';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {rootReducer} from './store/root-reducer';
import {defineViewportWidth} from './utils';
import {setViewport} from './store/actions';

import App from './components/app/app';
import "./sass/style.scss";

const store = configureStore({
  reducer: rootReducer,
});

const viewport = defineViewportWidth();
store.dispatch(setViewport(viewport));

ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById(`root`)
);
