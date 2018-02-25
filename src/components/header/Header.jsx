import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import authActions from './../../actions/authorization/authActions';

const Header = (props) => {
  const { userData } = props;
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Link href="/" to="/" className="navbar-brand">Event manager</Link>
      <button
        className="navbar-toggler collapsed"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="navbar-collapse collapse" id="navbarColor01">
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
            className="btn btn-sm btn-secondary"
            onClick={props.logOutRequest}
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
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
