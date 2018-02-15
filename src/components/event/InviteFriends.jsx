import React from 'react';
import EventButton from './../shared/EventButton';

export default class InviteFriends extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addFriendsIsShow: false,
      // invitedFriends: [],
    };

    this.onToggleOpenFriendsList = this.onToggleOpenFriendsList.bind(this);
  }

  onToggleOpenFriendsList() {
    const { addFriendsIsShow } = this.state;
    this.setState({
      addFriendsIsShow: !addFriendsIsShow,
    });
  }

  render() {
    return (
      <div>
        <div>
          <span>Friends</span>
          <div className="float-right">
            <EventButton
              clickHandler={this.onToggleOpenFriendsList}
              icon="fa-plus"
            />
          </div>
        </div>
        {this.state.addFriendsIsShow &&
          <h1>Friends list</h1>}
        <h1>Friends invited</h1>
      </div>
    );
  }
}
