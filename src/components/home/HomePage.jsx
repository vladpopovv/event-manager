import React from 'react';
import Header from './header';
import NotificationWrapper from './../notification/NotificationWrapper';
import Calendar from './../calendar/Calendar';

const HomePage = () => (
  <div>
    <NotificationWrapper />
    <Header />
    <Calendar />
  </div>
);

export default HomePage;
