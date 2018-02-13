// import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './components/calendar/Calendar';
import './style/main.less';

ReactDOM.render(
  <div>
    <h1>Event manager</h1>
    <Calendar />
  </div>,
  document.getElementById('root'),
);
