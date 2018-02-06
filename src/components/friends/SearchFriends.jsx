import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FriendItem from './FriendItem';
import friendsActions from './../../actions/friends/friendsActions';

class SearchFriends extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
    };

    this.onChangeQuery = this.onChangeQuery.bind(this);
    this.getFoundUser = this.getFoundUser.bind(this);
    this.onSubmitSearch = this.onSubmitSearch.bind(this);
  }

  onChangeQuery(e) {
    clearTimeout(this.debouceTimer);
    this.setState({
      query: e.target.value,
    });
    this.debouceTimer = setTimeout(this.getFoundUser, 1000);
  }

  onSubmitSearch(e) {
    e.preventDefault();
    this.getFoundUser();
  }

  getFoundUser() {
    const { query } = this.state;
    if (query === '') {
      return;
    }
    this.props.searchUsers(query);
  }

  render() {
    return (
      <div>
        <form className="form-inline">
          <input
            className="form-control w-75 mr-2"
            type="search"
            placeholder="Search"
            value={this.state.query}
            onChange={this.onChangeQuery}
          />
          <button
            className="btn btn-outline-success my-2 my-0"
            type="submit"
            onClick={this.onSubmitSearch}
          >
            <i className="fa fa-search" />
          </button>
        </form>
        <ul>
          {this.props.foundUsers.map(user => (
            <FriendItem friend={user} />
          ))}
        </ul>
      </div>
    );
  }
}

SearchFriends.propTypes = {
  foundUsers: PropTypes.arrayOf(PropTypes.shape({})),
  searchUsers: PropTypes.func.isRequired,
};

SearchFriends.defaultProps = {
  foundUsers: [],
};

const mapStateToProps = state => ({
  foundUsers: state.friends.foundUsers,
});

const mapDispatchToProps = dispatch => ({
  searchUsers: bindActionCreators(friendsActions.searchUsers, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchFriends);
