import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import App from './App';
import reportWebVitals from './reportWebVitals';

const reducer = (state = 0, action) => {
  console.log({state, action})
  switch(action.type) {
    case 'incrementar':
      return state + 1
    case 'decrementar':
      return state - 1
    default:
      return state
  }
}

const store = createStore(reducer)

console.log({ store })

store.dispatch({ type: 'lala' })
store.dispatch({ type: 'incrementar' })
store.dispatch({ type: 'incrementar' })
console.log('state', store.getState())

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
