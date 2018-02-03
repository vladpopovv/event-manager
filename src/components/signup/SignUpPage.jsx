import React from 'react';
import classNames from 'classnames';
import SignUpForm from './SignUpForm';

const SignUpPage = () => (
  <div className={classNames('container')}>
    <div className={classNames('row', 'justify-content-center', 'pt-5')}>
      <SignUpForm />
    </div>
  </div>
);

export default SignUpPage;
