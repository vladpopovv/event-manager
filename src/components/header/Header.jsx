import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import authActions from './../../actions/authorization/authActions';

const Header = (props) => {
  const { userData } = props;
  return (
    <div
      className="navbar navbar-expand-md navbar-dark bg-dark "
    >
      <Link href="/" to="/" className="navbar-brand">Event manager</Link>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/" href="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/friends" href="/friends" className="nav-link">Friends</Link>
        </li>
      </ul>
      <div className="">
        <span className="text-light mr-2">Hello, {userData.firstname} {userData.lastname}</span>
        <button
          className="btn btn-sm btn-outline-warning"
          onClick={props.logOutRequest}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

Header.propTypes = {
  userData: PropTypes.shape({}).isRequired,
  logOutRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userData: state.user.data,
});

const mapDispathcToProps = dispatch => ({
  logOutRequest: bindActionCreators(authActions.logOutRequest, dispatch),
});

export default connect(mapStateToProps, mapDispathcToProps)(Header);
