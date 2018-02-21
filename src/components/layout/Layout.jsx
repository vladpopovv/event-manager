import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import authActions from './../../actions/authorization/authActions';
import Header from './../header/Header';
import Footer from './../footer/Footer';
import HomePage from './../home/HomePage';
import Loader from './../shared/loader/Loader';
import FriendsPage from './../friends/FriendsPage';
import NotFound from './../shared/NotFound';
import './layoutStyle.less';

class Layout extends React.Component {
  componentDidMount() {
    this.props.getUserData();
  }

  render() {
    const loading = !this.props.userData.firstname;
    if (loading) {
      return (<Loader loading={loading} />);
    }

    return (
      <div className={classNames(this.props.appClasses)}>
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
  appClasses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Layout.defaultProps = {
  userData: {
    firstname: '',
  },
};

const mapStateToProps = state => ({
  userData: state.user.data,
  appClasses: state.app.classes,
});

const mapDispatchToProps = dispatch => ({
  getUserData: bindActionCreators(authActions.getUserDataRequest, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
