import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchFriendsItem from './SearchFriendsItem';
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
        <form className="form-inline d-flex justify-content-between pb-1">
          <input
            className="form-control col-10 mr-2"
            type="search"
            placeholder="Search"
            value={this.state.query}
            onChange={this.onChangeQuery}
          />
          <button
            className="btn btn-outline-success"
            type="submit"
            onClick={this.onSubmitSearch}
          >
            <i className="fa fa-search" />
          </button>
        </form>
        <ul className="list-group">
          {this.props.foundUsers.map(user => (
            <SearchFriendsItem
              key={user.id}
              user={user}
              onClickAddHandler={this.props.addToFriends}
            />
          ))}
        </ul>
      </div>
    );
  }
}

SearchFriends.propTypes = {
  foundUsers: PropTypes.arrayOf(PropTypes.shape({})),
  searchUsers: PropTypes.func.isRequired,
  addToFriends: PropTypes.func.isRequired,
};

SearchFriends.defaultProps = {
  foundUsers: [],
};

const mapStateToProps = state => ({
  foundUsers: state.friends.foundUsers,
});

const mapDispatchToProps = dispatch => ({
  searchUsers: bindActionCreators(friendsActions.searchUsers, dispatch),
  addToFriends: bindActionCreators(friendsActions.addToFriends, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchFriends);
