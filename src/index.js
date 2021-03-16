import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Homepage from './sources/Homepage';
import reportWebVitals from './reportWebVitals';

// Render Homepage
ReactDOM.render(
  <React.StrictMode>
    <Homepage />
  </React.StrictMode>,
  document.getElementById('homepage')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
