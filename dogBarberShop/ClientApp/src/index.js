import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import {
    createStore,
    applyMiddleware
} from 'redux';

import { reducers } from './reducers/index';

const store = createStore(
    reducers,
    applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);