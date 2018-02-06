import React from 'react';
import PropTypes from 'prop-types';

const FriendListContainer = (props) => {
  const { ListName } = props;
  return (
    <div>
      <h1 className="m-3">My {ListName}</h1>
      { props.isEmpty &&
        <p className="m-3">{ListName} list is empty</p>}
      {props.children}
    </div>
  );
};

FriendListContainer.propTypes = {
  ListName: PropTypes.string,
  isEmpty: PropTypes.bool,
  children: PropTypes.shape({}).isRequired,
};

FriendListContainer.defaultProps = {
  ListName: 'Friends',
  isEmpty: false,
};

export default FriendListContainer;
