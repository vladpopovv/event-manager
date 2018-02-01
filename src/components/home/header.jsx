import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import authActions from './../../actions/authActions';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { firstname, lastname } = this.props.userData;
    return (
      <div>
        <h1>Welcome</h1>
        <span>{firstname} {lastname}</span>
        <button onClick={this.props.logOutRequest}>Log out</button>
      </div>
    );
  }
}

Header.propTypes = {
  userData: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
  }),
  logOutRequest: PropTypes.func.isRequired,
};

Header.defaultProps = {
  userData: {
    firstname: '',
    lastname: '',
  },
};

const mapStateToProps = state => ({
  userData: state.user.data,
});

const mapDispathcToProps = dispatch => ({
  logOutRequest: bindActionCreators(authActions.logOutRequest, dispatch),
});

export default connect(mapStateToProps, mapDispathcToProps)(Header);
