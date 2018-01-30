import React from 'react';
import classNames from 'classnames';
import SingUpForm from './SingUpForm';
// import Authorization from './../authorization/Authorization';

export default class SingUpPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div className={classNames('container')}>
        <div className={classNames('row', 'justify-content-center', 'pt-5')}>
          <SingUpForm />
        </div>
      </div>
    );
  }
}

// export default Authorization(SingUpPage, false, 'home');
