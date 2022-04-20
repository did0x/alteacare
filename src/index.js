import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import * as defaults from "./helper/default"

// COMPONENT & OTHER
import App from './base/App';
import "./assets/scss/index.scss";


// REDUX
import thunk from "redux-thunk"
import rootReducer from "./redux/reducers"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"

// REDUX PERSIST
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

// SET REDUX STORE
const store = createStore(rootReducer, applyMiddleware(thunk))
const persistor = persistStore(store)

// SET DEFAULTS
defaults.setAxios()

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</PersistGate>
	</Provider>,
	document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
