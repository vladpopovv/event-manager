import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import usersActions from './../../actions/usersActions/usersActions';
import chatActions from './../../actions/chat/chatActions';
import UserData from './userData/UserData';
import Chat from './../chat/Chat';
import Loader from './../shared/loader/Loader';
import friendsActions from './../../actions/friends/friendsActions';

class UserPage extends React.Component {
  componentDidMount() {
    const { friends } = this.props;
    this.props.getUserDataById(this.props.match.params.id);
    if (!friends.length) {
      this.props.getFriends();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { user } = this.props;
    if (user.id !== nextProps.match.params.id) {
      this.props.getUserDataById(nextProps.match.params.id);
    }
  }

  render() {
    const { user } = this.props;

    return (
      <div className="container">
        <div className="row justify-content-center py-4">
          <div className="col-8">
            {!user.id
              ? <Loader loading={!user.id} />
              : <UserData
                user={user}
                friends={this.props.friends}
                addToFriendsHandler={this.props.addToFriends}
                deleteFriendsHandler={this.props.deleteFriends}
                createDialogHandler={this.props.createChat}
              />
            }
          </div>
          <div className="col-4">
            <Chat />
          </div>
        </div>
      </div>
    );
  }
}

UserPage.propTypes = {
  user: PropTypes.shape({}).isRequired,
  friends: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  deleteFriends: PropTypes.func.isRequired,
  addToFriends: PropTypes.func.isRequired,
  // userDataLoading: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  getUserDataById: PropTypes.func.isRequired,
  getFriends: PropTypes.func.isRequired,
  createChat: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.users.user,
  userDataLoading: state.users.loading,
  friends: state.friends.friends,
});

const mapDispatchToProps = dispatch => ({
  getUserDataById: bindActionCreators(usersActions.getUserDataById, dispatch),
  createChat: bindActionCreators(chatActions.createChat, dispatch),
  addToFriends: bindActionCreators(friendsActions.addToFriends, dispatch),
  getFriends: bindActionCreators(friendsActions.getFriends, dispatch),
  deleteFriends: bindActionCreators(friendsActions.deleteFriends, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
