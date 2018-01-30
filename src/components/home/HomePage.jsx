import React from 'react';
// import Authorization from './../authorization/Authorization';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Welcome to home page!</h1>
      </div>
    );
  }
}

// Authorization(HomePage, true);
