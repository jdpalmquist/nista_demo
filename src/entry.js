//
//
// ENTRY.JS
//
//
// Import required modules
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';
import { createStore, compose, applyMiddleware } from 'redux';
//
//
// Import the top level App React Container
import App from './App/App.js';
//
//
// Import the combined reducers as rootReducer
import { rootReducer } from './App/combinedReducers';
//
//
// Import the combined epics as rootEpic
import { rootEpic } from './App/combinedEpics';
//
//
// Initialize the RXJS Observables/Epics middleware
const epicMiddleware = createEpicMiddleware();
//
//
//
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//
//
// Create the Redux Store 
const store = createStore(
	rootReducer, 
	composeEnhancer(applyMiddleware(epicMiddleware)),
	
);
// console.log(store.getState);
//
//
// Middleware runs the root epic
epicMiddleware.run(rootEpic);
//
//
// Render using the provider object to pass store into the app
render(
  	<Provider store={store}>
    	<App />
  	</Provider>,
  	document.getElementById('root')
)