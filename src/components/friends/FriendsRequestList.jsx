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
        {this.props.users.map(user => (
          <FriendsRequestItem key={user.id} user={user} />
        ))}
      </ul>
    );
  }
}

FriendsRequestList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({})),
};

FriendsRequestList.defaultProps = {
  users: [],
};

const mapStateToProps = state => ({
  users: state.friends.followers,
});

// const mapDispatchToProps = dispatch => ({
//   getFriendsRequests:
// })

export default connect(mapStateToProps)(FriendsRequestList);
