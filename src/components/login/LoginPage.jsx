import React from 'react';
import LoginForm from './LoginForm';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <LoginForm />
    );
  }
}
