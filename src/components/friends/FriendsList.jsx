import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FriendItem from './FriendItem';

class FriendList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
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
  friends: PropTypes.arrayOf(PropTypes.shape({})),
};

FriendList.defaultProps = {
  friends: [],
};

const mapStateToProps = state => ({
  friends: state.friends.friends,
});

// const mapDispatchToProps = dispatch => ({
//   getFollowers:
// })

export default connect(mapStateToProps)(FriendList);
