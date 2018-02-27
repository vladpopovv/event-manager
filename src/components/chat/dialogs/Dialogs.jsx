import React from 'react';
import PropTypes from 'prop-types';
import DialogsList from './dialogsList/dialogsList/DialogsList';
import FriendsChatList from './../friendsChatList/FriendsChatList';
import SearchBox from './../../shared/SearchBox';

class Dialogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      friendsIsOpen: false,
      dialogsIsOpen: true,
    };

    this.changeSearchTextHandler = this.changeSearchTextHandler.bind(this);
    this.filterChats = this.filterChats.bind(this);
    this.onClickOpenDialogs = this.onClickOpenDialogs.bind(this);
    this.onClickOpenFriends = this.onClickOpenFriends.bind(this);
  }

  onClickOpenFriends() {
    this.setState({
      friendsIsOpen: true,
      dialogsIsOpen: false,
    });
  }

  onClickOpenDialogs() {
    this.setState({
      friendsIsOpen: false,
      dialogsIsOpen: true,
    });
  }

  changeSearchTextHandler(text) {
    this.setState({
      searchText: text,
    });
  }

  filterChats(searchText) {
    const filteredChats = this.props.chats.filter(chat =>
      chat.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
    return filteredChats;
  }

  filterFriends(searchText) {
    const filteredFriends = this.props.friends.filter(friend => (
      friend.firstname.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
      friend.lastname.toLowerCase().indexOf(searchText.toLowerCase()) !== -1));
    return filteredFriends;
  }

  render() {
    const chats = this.filterChats(this.state.searchText);
    const friends = this.filterFriends(this.state.searchText);
    const { friendsIsOpen, dialogsIsOpen } = this.state;
    return (
      <div>
        <SearchBox changeSearchTextHandler={this.changeSearchTextHandler} />
        <div className="py-2">
          <div>
            <button className="btn btn-sm mr-1" onClick={this.onClickOpenDialogs}>
              Dialogs
            </button>
            <button className="btn btn-sm" onClick={this.onClickOpenFriends}>
              Friends
            </button>
          </div>
          <div>
            {dialogsIsOpen &&
              <DialogsList
                chats={chats}
                openDialogHandler={this.props.openDialogHandler}
              />
            }
            {friendsIsOpen &&
              <FriendsChatList
                friends={friends}
                openDialogHandler={this.props.createDialogHandler}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

Dialogs.propTypes = {
  friends: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  chats: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  openDialogHandler: PropTypes.func.isRequired,
  createDialogHandler: PropTypes.func.isRequired,
};

export default Dialogs;
