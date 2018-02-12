import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchFriendsItem from './SearchFriendsItem';
import friendsActions from './../../actions/friends/friendsActions';
import './searchFriends.less';

class SearchFriends extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      submitSuccess: false,
    };

    this.onChangeQuery = this.onChangeQuery.bind(this);
    this.getFoundUser = this.getFoundUser.bind(this);
    this.onSubmitSearch = this.onSubmitSearch.bind(this);
  }

  onChangeQuery(e) {
    clearTimeout(this.debouceTimer);
    this.setState({
      query: e.target.value,
      submitSuccess: false,
    });
    this.debouceTimer = setTimeout(this.getFoundUser, 500);
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
    this.props.searchUsers(query)
      .then(() => this.setState({
        submitSuccess: true,
      }));
  }

  renderList() {
    return (
      <ul className="list-group">
        {this.props.foundUsers.map(user => (
          <SearchFriendsItem
            key={user.id}
            user={user}
            onClickAddHandler={this.props.sendRequestToFriends}
          />
        ))}
      </ul>
    );
  }

  render() {
    const { query, submitSuccess } = this.state;
    const flag = query && submitSuccess && !(this.props.foundUsers.length > 0);
    return (
      <div>
        <form className="form-inline d-flex justify-content-between pb-1">
          <input
            className="form-control col-10 mr-2"
            type="search"
            placeholder="Find friends"
            value={query}
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
        <div className="search__list my-1">
          {flag
            ? <span>Nothing found on your request</span>
            : query && this.renderList()
          }
        </div>
      </div>
    );
  }
}

SearchFriends.propTypes = {
  foundUsers: PropTypes.arrayOf(PropTypes.shape({})),
  searchUsers: PropTypes.func.isRequired,
  sendRequestToFriends: PropTypes.func.isRequired,
};

SearchFriends.defaultProps = {
  foundUsers: [],
};

const mapStateToProps = state => ({
  foundUsers: state.friends.foundUsers,
});

const mapDispatchToProps = dispatch => ({
  searchUsers: bindActionCreators(friendsActions.searchUsers, dispatch),
  sendRequestToFriends: bindActionCreators(friendsActions.sendRequestToFriends, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchFriends);
