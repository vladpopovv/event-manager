import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const AuthContainer = (props) => {
  const wrapperClasses = classNames('col-md-6', 'col-sm-8', 'col-10', 'mb-5');
  return (
    <div className={wrapperClasses}>
      <div className="card">
        <div className="card-header">
          <h3>{props.title}</h3>
        </div>
        {props.children}
      </div>
    </div>
  );
};

AuthContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  title: PropTypes.string.isRequired,
};

export default AuthContainer;
