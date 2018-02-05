import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FollowerItem from './FollowerItem';

class FollowerList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <ul className="list-group">
        {this.props.followers.map(follower => (
          <FollowerItem key={follower.id} follower={follower} />
        ))}
      </ul>
    );
  }
}

FollowerList.propTypes = {
  followers: PropTypes.arrayOf(PropTypes.shape({})),
};

FollowerList.defaultProps = {
  followers: [],
};

const mapStateToProps = state => ({
  followers: state.friends.followers,
});

// const mapDispatchToProps = dispatch => ({
//   getFollowers:
// })

export default connect(mapStateToProps)(FollowerList);
