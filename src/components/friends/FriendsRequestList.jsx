import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import friendsActions from './../../actions/friends/friendsActions';
import FriendsRequestItem from './FriendsRequestItem';
import FriendsListContainer from './../containers/FriendsListContainer';

class FriendsRequestList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.getFriendRequets();
  }

  render() {
    return (
      <FriendsListContainer listName="Friends" isEmpty={(this.props.users.length === 0)}>
        <ul className="list-group">
          {this.props.users.map(user => (
            <FriendsRequestItem key={user.id} user={user} />
          ))}
        </ul>
      </FriendsListContainer>
    );
  }
}

FriendsRequestList.propTypes = {
  getFriendRequets: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({})),
};

FriendsRequestList.defaultProps = {
  users: [],
};

const mapStateToProps = state => ({
  users: state.friends.followers,
});

const mapDispatchToProps = dispatch => ({
  getFriendRequets: bindActionCreators(friendsActions.getFriendRequets, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendsRequestList);
