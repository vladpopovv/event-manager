import React from 'react';
import Header from './header';
import NotificationWrapper from './../notification/NotificationWrapper';
import Chat from './../chat/Chat';

const HomePage = () => (
  <div>
    <NotificationWrapper />
    <Header />
    <div className="container">
      <div className="row">
        <div className="col-4">
          <Chat />
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;
