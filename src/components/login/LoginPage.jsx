import React from 'react';
import classNames from 'classnames';
import LoginForm from './LoginForm';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div className={classNames('container')}>
        <div className={classNames('row', 'justify-content-center', 'pt-5')}>
          <LoginForm />
        </div>
      </div>
    );
  }
}
