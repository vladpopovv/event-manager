import React from 'react';
import PropTypes from 'prop-types';
import DialogsList from './../dialogsList/DialogsList';
import SearchBox from './SearchBox';

class Dialogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };

    this.changeSearchTextHandler = this.changeSearchTextHandler.bind(this);
    this.filterChats = this.filterChats.bind(this);
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

  render() {
    const chats = this.filterChats(this.state.searchText);
    return (
      <div>
        <SearchBox changeSearchTextHandler={this.changeSearchTextHandler} />
        <DialogsList
          chats={chats}
          openDialogHandler={this.props.openDialogHandler}
        />
      </div>
    );
  }
}

Dialogs.propTypes = {
  chats: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  openDialogHandler: PropTypes.func.isRequired,
};

export default Dialogs;
