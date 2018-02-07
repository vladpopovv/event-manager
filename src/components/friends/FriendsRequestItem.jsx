import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ControlButton from './../shared/ControlButton';
import FriendsItemContainer from './../containers/FriendsItemContainer';

const FriendsRequestItem = (props) => {
  const addToFriendsHandler = () => (props.addToFriendsHandler(props.requestData.friender));
  const userLink = `/user/${props.requestData.friender.id}`;
  return (
    <FriendsItemContainer>
      <Link
        className="text-dark"
        to={userLink}
        href={userLink}
      >
        {props.requestData.friender.firstname} {props.requestData.friender.lastname}
      </Link>
      <div>
        <div className="btn-group" role="group">
          <ControlButton
            buttonType="outline-success"
            icon="plus-circle"
            onClickHandler={addToFriendsHandler}
          />
          <ControlButton
            buttonType="outline-danger"
            icon="trash"
            onClickHandler={addToFriendsHandler}
          />
        </div>
      </div>
    </FriendsItemContainer>
  );
};

FriendsRequestItem.propTypes = {
  requestData: PropTypes.shape({
    friender: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
    }),
  }).isRequired,
  addToFriendsHandler: PropTypes.func.isRequired,
};

export default FriendsRequestItem;
