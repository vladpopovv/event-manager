import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import authActions from './../../actions/authorization/authActions';
import LoginForm from './LoginForm';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const queryParams = new URLSearchParams(this.props.location.search);
    const token = queryParams.get('token');
    if (token) {
      this.props.history.push('/');
      this.props.getUserDataRequestByToken(token);
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center pt-5">
          <LoginForm />
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  getUserDataRequestByToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

const mapDispatchToProps = dispatch => ({
  getUserDataRequestByToken: bindActionCreators(authActions.getUserDataRequestByToken, dispatch),
});

export default connect(null, mapDispatchToProps)(LoginPage);
