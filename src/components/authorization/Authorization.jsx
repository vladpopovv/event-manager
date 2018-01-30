import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import userAction from './../../actions/userAction';

const Authorization = (WrappedComponent, needAuth, redirectTo = 'login') => {
  class WithAuthorization extends React.Component {
    constructor(props) {
      super(props);

      this.state = {};
    }

    render() {
      const { isAuthentificated } = this.props.user;
      if (isAuthentificated === needAuth) {
        return <WrappedComponent {...this.props} />;
      }
      return <Redirect to={`${redirectTo}`} />;
    }
  }

  WithAuthorization.propTypes = {
    user: PropTypes.shape({
      isAuthentificated: PropTypes.bool.isRequired,
    }).isRequired,
  };

  const mapStateToProps = state => ({
    user: state.user,
  });

  const mapDispachToProps = dispatch => ({
    checkAuthentificated: bindActionCreators(userAction.checkAuthentificated, dispatch),
  });

  return connect(mapStateToProps, mapDispachToProps)(WithAuthorization);
};

export default Authorization;
