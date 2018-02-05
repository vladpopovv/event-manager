import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import NotificationWrapper from './../notification/NotificationWrapper';

export default class AuthContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const wrapperClasses = classNames('col-md-6', 'col-sm-8', 'col-10', 'mb-5');
    return (
      <div className={wrapperClasses}>
        <NotificationWrapper />
        <div className="card">
          <div className="card-header">
            <h3>{this.props.title}</h3>
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

AuthContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  title: PropTypes.string.isRequired,
};
