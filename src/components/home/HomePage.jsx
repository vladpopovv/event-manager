import React from 'react';
import Authorization from './../authorization/Authorization';

class HomePage extends React.Component {
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

export default Authorization(HomePage, ['user']);
