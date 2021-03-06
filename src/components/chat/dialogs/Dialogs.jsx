import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DialogsList from './dialogsList/dialogsList/DialogsList';
import FriendsChatList from './../friendsChatList/FriendsChatList';
import SearchBox from './../../shared/SearchBox';
import './dialogsStyle.less';

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

    if (this.props.isHidden && this.props.chatType === 'compressed') {
      return null;
    }

    return (
      <div className="chat__dialogs p-1">
        <SearchBox
          changeSearchTextHandler={this.changeSearchTextHandler}
          placeholder="Please enter firstname or lastname"
        />
        <div className="dialogs__container pt-2">
          <div className="dialogs__tabs nav nav-tabs">
            <div className="nav-item">
              <button
                className={classNames('dialogs__tab nav-link bg-white', { active: dialogsIsOpen })}
                onClick={this.onClickOpenDialogs}
              >
                Dialogs
              </button>
            </div>
            <div className="nav-item">
              <button
                className={classNames('dialogs__tab nav-link bg-white border-bottom', { active: friendsIsOpen })}
                onClick={this.onClickOpenFriends}
              >
                Friends
              </button>
            </div>
          </div>
          <div className="dialogs-list__wrapper border-bottom border-left border-right">
            {dialogsIsOpen &&
              <DialogsList
                chats={chats}
                openDialogHandler={this.props.openDialogHandler}
                currentChat={this.props.currentChat}
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
  chatType: PropTypes.string,
  isHidden: PropTypes.bool.isRequired,
  friends: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  chats: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  openDialogHandler: PropTypes.func.isRequired,
  createDialogHandler: PropTypes.func.isRequired,
  currentChat: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

Dialogs.defaultProps = {
  chatType: 'compressed',
};

export default Dialogs;
