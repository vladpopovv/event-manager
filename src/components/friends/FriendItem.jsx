import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ControlButton from './../shared/ControlButton';
import FriendsItemContainer from './../containers/FriendsItemContainer';

class FriendItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deleteIsClicked: false,
    };

    this.onDeleteFriends = this.onDeleteFriends.bind(this);
    this.onClickChat = this.onClickChat.bind(this);
  }

  onDeleteFriends() {
    this.setState({
      deleteIsClicked: true,
    });
    this.props.deleteHandler(this.props.friend);
  }

  onClickChat() {
    console.log('Click chat', this.state.deleteIsClicked);
  }

  render() {
    const userLink = `/user/${this.props.friend.id}`;
    const loading = this.props.loading && this.state.deleteIsClicked;
    return (
      <FriendsItemContainer>
        <Link
          className="text-dark"
          to={userLink}
          href={userLink}
        >
          {this.props.friend.firstname} {this.props.friend.lastname}
        </Link>
        <div>
          <div className="btn-group" role="group">
            <ControlButton
              buttonType="outline-success"
              icon="comments-o"
              onClickHandler={this.onClickChat}
            />
            <ControlButton
              buttonType="outline-danger"
              icon="trash"
              onClickHandler={this.onDeleteFriends}
              loading={loading}
            />
          </div>
        </div>
      </FriendsItemContainer>
    );
  }
}

FriendItem.propTypes = {
  friend: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
  }).isRequired,
  deleteHandler: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

FriendItem.defaultProps = {
  loading: false,
};

export default FriendItem;
