import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
// import configureSocket from '../actions/socket';
import { authReducer, genresReducer, messageReducer, updateReducer } from '../reducers';

// const express = require('express');

const reducers = combineReducers({
    auth_state: authReducer,
    genre_state: genresReducer,
    msg_state: messageReducer,
    update_state: updateReducer
})

const initialState = {}

// const token = 
// 'BQBwhcY8E0ziGx9Zn6F-6VuXrC7GgOZmWRJXlLkqg5Q9O7vuu0…lIPBCDQHgavNb-RXSf_RjSCztc1_IcHvtZ_9yQAmpHwjFNlJQ'

const middleware = [thunk]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
)

// var app = express();
// app.io = require('socket.io-client')('http://localhost:3002');

// // setup socket connection
// let configSocket = configureSocket(store.dispatch);

// configSocket(app.io);

export default store;