import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FriendsRequestItem from './FriendsRequestItem';

class FriendsRequestList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <ul className="list-group">
        {this.props.followers.map(follower => (
          <FriendsRequestItem key={follower.id} follower={follower} />
        ))}
      </ul>
    );
  }
}

FriendsRequestList.propTypes = {
  followers: PropTypes.arrayOf(PropTypes.shape({})),
};

FriendsRequestList.defaultProps = {
  followers: [],
};

const mapStateToProps = state => ({
  followers: state.friends.followers,
});

// const mapDispatchToProps = dispatch => ({
//   getFriendsRequests:
// })

export default connect(mapStateToProps)(FriendsRequestList);
