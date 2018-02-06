import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FriendItem from './FriendItem';
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
    if (friends.length === 0) {
      return (
        <p>Friend list is empty</p>
      );
    }
    return (
      <ul className="list-group">
        {this.props.friends.map(friend => (
          <FriendItem key={friend.id} friend={friend} />
        ))}
      </ul>
    );
  }
}

FriendList.propTypes = {
  getFriends: PropTypes.func.isRequired,
  friends: PropTypes.arrayOf(PropTypes.shape({})),
};

FriendList.defaultProps = {
  friends: [],
};

const mapStateToProps = state => ({
  friends: state.friends.friends,
});

const mapDispatchToProps = dispatch => ({
  getFriends: bindActionCreators(friendsActions.getFriends, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);
