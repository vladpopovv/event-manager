import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ControlButton from './../shared/ControlButton';

const SearchFriendsItem = (props) => {
  const onClickAddHandler = () => {
    props.onClickAddHandler(props.user);
  };
  const userUrl = `/users/${props.user.id}`;
  return (
    <li
      className="list-group-item border-top-0 border-left-0 border-right-0
      border-bottom d-flex justify-content-between align-items-center"
    >
      <Link
        className="text-dark"
        to={userUrl}
        href={userUrl}
      >
        {props.user.firstname} {props.user.lastname}
      </Link>
      <ControlButton
        type="button"
        buttonType="outline-success"
        icon="plus"
        disabled={props.addBtnLoading}
        loading={props.addBtnLoading}
        onClickHandler={onClickAddHandler}
      />
    </li>
  );
};

SearchFriendsItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
  }).isRequired,
  onClickAddHandler: PropTypes.func.isRequired,
  addBtnLoading: PropTypes.bool,
};

SearchFriendsItem.defaultProps = {
  addBtnLoading: false,
};

export default SearchFriendsItem;
