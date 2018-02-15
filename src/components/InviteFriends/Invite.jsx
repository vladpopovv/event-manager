import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';
import friendsActions from './../../actions/friends/friendsActions';
import EventButton from './../shared/EventButton';
import UninvitedFriends from './UninvitedFriends';
import Participants from './Participants';
import './InviteStyle.less';

class Invites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addFriendsIsShow: false,
      uninvitedFriends: [],
      invitedFriends: [],
    };

    this.onToggleOpenFriendsList = this.onToggleOpenFriendsList.bind(this);
    this.addToEventHandler = this.addToEventHandler.bind(this);
    this.removeFromEventHandler = this.removeFromEventHandler.bind(this);
  }

  componentDidMount() {
    this.props.getFriends()
      .then(() => {
        this.setState({
          uninvitedFriends: this.props.friends,
        });
      });
  }


  onToggleOpenFriendsList() {
    const { addFriendsIsShow } = this.state;
    this.setState({
      addFriendsIsShow: !addFriendsIsShow,
    });
  }

  addToEventHandler(friend) {
    const { friends } = this.props;
    const invitedFriends = this.state.invitedFriends.concat(friend);

    const uninvitedFriends = friends.filter(friendItem =>
      (invitedFriends.indexOf(friendItem) < 0));

    const invitedFriendsID = [];
    invitedFriends.forEach(friendItem => invitedFriendsID.push(friendItem.id));

    this.props.onChangeInvitedFriends(invitedFriendsID);

    this.setState({
      invitedFriends,
      uninvitedFriends,
    });
  }

  removeFromEventHandler(friend) {
    const { friends } = this.props;
    const uninvitedFriends = this.state.uninvitedFriends.concat(friend);

    const invitedFriends = friends.filter(friendItem =>
      (uninvitedFriends.indexOf(friendItem) < 0));

    const invitedFriendsID = [];
    invitedFriends.forEach(friendItem => invitedFriendsID.push(friendItem.id));

    this.props.onChangeInvitedFriends(invitedFriendsID);

    this.setState({
      invitedFriends,
      uninvitedFriends,
    });
  }

  render() {
    return (
      <div>
        <div>
          <span>Participants</span>
          <div className="float-right">
            <EventButton
              clickHandler={this.onToggleOpenFriendsList}
              icon="fa-plus"
            />
          </div>
        </div>
        <ReactCSSTransitionGroup
          transitionName="uninvitedFriends"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          component="div"
        >
          {this.state.addFriendsIsShow &&
            <UninvitedFriends
              friends={this.state.uninvitedFriends}
              addHandler={this.addToEventHandler}
            />}
        </ReactCSSTransitionGroup>
        <Participants
          friends={this.state.invitedFriends}
          removeHandler={this.removeFromEventHandler}
        />
      </div>
    );
  }
}

Invites.propTypes = {
  onChangeInvitedFriends: PropTypes.func.isRequired,
  getFriends: PropTypes.func.isRequired,
  friends: PropTypes.arrayOf(PropTypes.shape({})),
};

Invites.defaultProps = {
  friends: [],
};

const mapStateToProps = state => ({
  friends: state.friends.friends,
});

const mapDispatchToProps = dispatch => ({
  getFriends: bindActionCreators(friendsActions.getFriends, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Invites);
