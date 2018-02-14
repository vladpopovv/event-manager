import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Authorization = (WrappedComponent, needAuth = true, redirectTo = '/login') => {
  const WithAuthorization = (props) => {
    if (props.isAuthentificated === needAuth) {
      return <WrappedComponent {...props} />;
    }
    return <Redirect to={`${redirectTo}`} />;
  };

  WithAuthorization.propTypes = {
    isAuthentificated: PropTypes.bool.isRequired,
  };

  const mapStateToProps = state => ({
    isAuthentificated: state.user.isAuthentificated,
  });

  return connect(mapStateToProps)(WithAuthorization);
};

export default Authorization;
