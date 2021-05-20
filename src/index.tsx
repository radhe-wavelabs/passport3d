import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './styles/fonts.scss';
import App from './app/App';
import { appRoutes } from './config';

ReactDOM.render(
  <React.StrictMode>
    <App routes={appRoutes} />
  </React.StrictMode>,
  document.getElementById('root')
);
