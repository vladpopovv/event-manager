import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import authActions from './../../actions/authorization/authActions';
import modalActions from './../../actions/modalActions/modalActions';
import UserPage from './../userPage/UserPage';
import ChatPage from './../chat/ChatPage';
import Header from './../header/Header';
import Footer from './../footer/Footer';
import HomePage from './../home/HomePage';
import Loader from './../shared/loader/Loader';
import FriendsPage from './../friends/FriendsPage';
import NotFound from './../shared/NotFound';
import Modal from './../modal/Modal';
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
      <div>
        <Modal onHide={this.props.deleteModal} show={this.props.modals.length !== 0}>
          {this.props.modals[0]}
        </Modal>
        <div className={classNames(this.props.appClasses)}>
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/users/:id(\d+)" component={UserPage} />
            <Route exact path="/chats/:id?" component={ChatPage} />
            <Route path="/friends" component={FriendsPage} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </div>
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
  modals: PropTypes.arrayOf(PropTypes.element).isRequired,
  deleteModal: PropTypes.func.isRequired,
};

Layout.defaultProps = {
  userData: {
    firstname: '',
  },
};

const mapStateToProps = state => ({
  userData: state.user.data,
  appClasses: state.app.classes,
  modals: state.modal.modals,
});

const mapDispatchToProps = dispatch => ({
  getUserData: bindActionCreators(authActions.getUserDataRequest, dispatch),
  deleteModal: bindActionCreators(modalActions.delete, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
