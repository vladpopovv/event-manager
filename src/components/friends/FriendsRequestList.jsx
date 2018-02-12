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
    console.error('PROPS', this.props.addToFriendsLoading, this.props.requests);
    return (
      <FriendsListContainer listName="Requests" isEmpty={(this.props.requests.length === 0)}>
        <ul className="list-group">
          {this.props.requests.map(requestItem => (
            <FriendsRequestItem
              key={requestItem.id}
              requestData={requestItem}
              addToFriendsLoading={
                this.props.addToFriendsLoading.indexOf(requestItem.friender.id) !== -1
              }
              addToFriendsHandler={this.props.addToFriends}
              deleteRequestHandler={this.props.deleteRequest}
            />
          ))}
        </ul>
      </FriendsListContainer>
    );
  }
}

FriendsRequestList.propTypes = {
  getFriendRequets: PropTypes.func.isRequired,
  addToFriendsLoading: PropTypes.arrayOf(PropTypes.number),
  requests: PropTypes.arrayOf(PropTypes.shape({})),
  addToFriends: PropTypes.func.isRequired,
  deleteRequest: PropTypes.func.isRequired,
};

FriendsRequestList.defaultProps = {
  requests: [],
  addToFriendsLoading: [],
};

const mapStateToProps = state => ({
  requests: state.friends.followers,
  addToFriendsLoading: state.friends.loading.addToFriendsLoading,
});

const mapDispatchToProps = dispatch => ({
  getFriendRequets: bindActionCreators(friendsActions.getFriendRequets, dispatch),
  addToFriends: bindActionCreators(friendsActions.addToFriends, dispatch),
  deleteRequest: bindActionCreators(friendsActions.deleteRequestToFriends, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendsRequestList);
