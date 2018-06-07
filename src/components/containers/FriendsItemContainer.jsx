import React from 'react';
import PropTypes from 'prop-types';

const FriendsItemContainer = props => (
  <li
    className="list-group-item border-bottom d-flex justify-content-between align-items-center px-3"
  >
    {props.children}
  </li>
);

FriendsItemContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default FriendsItemContainer;
