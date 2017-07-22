import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import store from './redux/store.js';
import $ from 'jquery';
import { Provider } from 'react-redux';
import './css/common.css';

store.subscribe(render);

function render(){

    var state = store.getState();
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
            document.getElementById('root'));
}
render();

registerServiceWorker();
