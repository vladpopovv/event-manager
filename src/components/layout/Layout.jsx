import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import authActions from './../../actions/authorization/authActions';
import Header from './../header/Header';
import Footer from './../footer/Footer';
import HomePage from './../home/HomePage';
import FriendsPage from './../friends/FriendsPage';
import NotFound from './../shared/NotFound';

class Layout extends React.Component {
  componentDidMount() {
    this.props.getUserData();
  }

  render() {
    if (!this.props.userData.firstname) {
      return (<h1>Loading</h1>);
    }
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/friends" component={FriendsPage} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

Layout.propTypes = {
  getUserData: PropTypes.func.isRequired,
  userData: PropTypes.shape({
    firstname: PropTypes.string,
  }),
};

Layout.defaultProps = {
  userData: {
    firstname: '',
  },
};

const mapStateToProps = state => ({
  userData: state.user.data,
});

const mapDispatchToProps = dispatch => ({
  getUserData: bindActionCreators(authActions.getUserDataRequest, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
