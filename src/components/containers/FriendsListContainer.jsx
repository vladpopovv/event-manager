import React from 'react';
import PropTypes from 'prop-types';

const FriendListContainer = (props) => {
  const { listName } = props;
  return (
    <div>
      <h1 className="m-3">My {listName}</h1>
      { props.isEmpty &&
        <p className="m-3">{listName} list is empty</p>}
      {props.children}
    </div>
  );
};

FriendListContainer.propTypes = {
  listName: PropTypes.string,
  isEmpty: PropTypes.bool,
  children: PropTypes.shape({}).isRequired,
};

FriendListContainer.defaultProps = {
  listName: 'Friends',
  isEmpty: false,
};

export default FriendListContainer;
