import React from 'react';
import Chat from './../chat/Chat';
import Calendar from './../calendar/Calendar';

const HomePage = () => (
  <div className="container py-4">
    <div className="row">
      <div className="col-8">
        <Calendar />
      </div>
      <div className="col-4">
        <Chat />
      </div>
    </div>
  </div>
);

export default HomePage;
