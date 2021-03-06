import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import './Resources/css/styles.css';
import {BrowserRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import promiseMiddleWare from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './reducers/reducers';

const createStoreWithMiddleWare = applyMiddleware(promiseMiddleWare,ReduxThunk)(createStore);

ReactDOM.render(
    <Provider store = {createStoreWithMiddleWare(Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )}>
        <BrowserRouter>
            <Routes />  
        </BrowserRouter>
  </Provider>
 
, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
