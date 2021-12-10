import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store,Persister} from './components/redux/Store'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={Persister}>
<BrowserRouter>
    <App />
    </BrowserRouter>
    </PersistGate>
    </Provider>
,
  document.getElementById('root')
);

