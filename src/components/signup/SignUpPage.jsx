import React from 'react';
import classNames from 'classnames';
import SignUpForm from './SignUpForm';

export default class SignUpPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div className={classNames('container')}>
        <div className={classNames('row', 'justify-content-center', 'pt-5')}>
          <SignUpForm />
        </div>
      </div>
    );
  }
}
