import React from 'react';
import Header from './header';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}
