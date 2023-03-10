import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './App';
import { asyncMiddleware } from './middlewares/aync'
import { reducer } from './features/todos';
import reportWebVitals from './reportWebVitals';

const args = [
  reducer,
  asyncMiddleware ? applyMiddleware(asyncMiddleware) : undefined
]

const store = createStore(...args)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
