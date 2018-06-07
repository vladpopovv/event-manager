import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ControlButton from './../shared/ControlButton';
import FriendsItemContainer from './../containers/FriendsItemContainer';

const FriendsRequestItem = (props) => {
  const addToFriendsHandler = () => (props.addToFriendsHandler(props.requestData.friender));
  const deleteRequestHandler = () => (props.deleteRequestHandler(props.requestData.friender));
  const diffTime = moment(props.requestData.createdAt).fromNow();
  const userLink = `/users/${props.requestData.friender.id}`;

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
        <small className="text-muted mr-1">{diffTime}</small>
        <div className="btn-group" role="group">
          <ControlButton
            buttonType="outline-success"
            icon="plus-circle"
            onClickHandler={addToFriendsHandler}
            loading={props.addToFriendsLoading}
            disabled={props.addToFriendsLoading}
          />
          <ControlButton
            buttonType="outline-danger"
            icon="trash"
            onClickHandler={deleteRequestHandler}
            loading={props.deleteRequestLoading}
            disabled={props.deleteRequestLoading}
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
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  addToFriendsHandler: PropTypes.func.isRequired,
  addToFriendsLoading: PropTypes.bool,
  deleteRequestLoading: PropTypes.bool,
  deleteRequestHandler: PropTypes.func.isRequired,
};

FriendsRequestItem.defaultProps = {
  addToFriendsLoading: false,
  deleteRequestLoading: false,
};

export default FriendsRequestItem;
