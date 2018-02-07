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
    // console.error('PROPS', this.props.users[0].friender);
    return (
      <FriendsListContainer listName="Friends" isEmpty={(this.props.requests.length === 0)}>
        <ul className="list-group">
          {this.props.requests.map(requestItem => (
            <FriendsRequestItem key={requestItem.id} requestData={requestItem} />
          ))}
        </ul>
      </FriendsListContainer>
    );
  }
}

FriendsRequestList.propTypes = {
  getFriendRequets: PropTypes.func.isRequired,
  requests: PropTypes.arrayOf(PropTypes.shape({})),
};

FriendsRequestList.defaultProps = {
  requests: [],
};

const mapStateToProps = state => ({
  requests: state.friends.followers,
});

const mapDispatchToProps = dispatch => ({
  getFriendRequets: bindActionCreators(friendsActions.getFriendRequets, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendsRequestList);
