import React from 'react';
import PropTypes from 'prop-types';

const FriendsItemContainer = props => (
  <li
    className="list-group-item border-top-0 border-left-0 border-right-0
    border-bottom d-flex justify-content-between align-items-center"
  >
    {props.children}
  </li>
);

FriendsItemContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default FriendsItemContainer;
