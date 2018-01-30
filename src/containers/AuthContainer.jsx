import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class AuthContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const wrapperClasses = classNames('col-md-6', 'col-sm-8', 'col-10');
    return (
      <div className={wrapperClasses}>
        <div className="card">
          <div className="card-header">
            <h1>Login</h1>
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

AuthContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
