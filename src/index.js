import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import store from './redux/redux-store';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
     <HashRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <App/>
      </Provider>
    </HashRouter>
  </React.StrictMode>
);



