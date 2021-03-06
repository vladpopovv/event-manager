import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FriendItem from './FriendItem';
import FriendsListContainer from './../containers/FriendsListContainer';
import friendsActions from './../../actions/friends/friendsActions';

class FriendList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.getFriends();
  }

  render() {
    const { friends } = this.props;
    return (
      <FriendsListContainer listName="Friends" isEmpty={(friends.length === 0)}>
        <ul className="list-group mb-3">
          {this.props.friends.map(friend => (
            <FriendItem
              key={friend.id}
              friend={friend}
              deleteHandler={this.props.deleteFriends}
              deleteLoading={
                this.props.deleteFriendsLoading.indexOf(friend.id) !== -1}
            />
          ))}
        </ul>
      </FriendsListContainer>
    );
  }
}

FriendList.propTypes = {
  getFriends: PropTypes.func.isRequired,
  deleteFriends: PropTypes.func.isRequired,
  friends: PropTypes.arrayOf(PropTypes.shape({})),
  deleteFriendsLoading: PropTypes.arrayOf(PropTypes.number),
};

FriendList.defaultProps = {
  friends: [],
  deleteFriendsLoading: [],
};

const mapStateToProps = state => ({
  friends: state.friends.friends,
  deleteFriendsLoading: state.friends.loading.deleteFriendsLoading,
});

const mapDispatchToProps = dispatch => ({
  getFriends: bindActionCreators(friendsActions.getFriends, dispatch),
  deleteFriends: bindActionCreators(friendsActions.deleteFriends, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);
