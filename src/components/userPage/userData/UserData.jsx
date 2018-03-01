import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserData = (props) => {
  const { user } = props;
  // const sendMessageHandler = () => props.sendMessageHandler(user);

  return (
    <div className="card">
      <div className="card-header">User info</div>
      <div className="card-body">
        <div>Firstname: {user.firstname}</div>
        <div>Lastname: {user.lastname}</div>
        <div>Email: {user.login}</div>
        <Link
          className="btn btn-primary"
          href={`/chats?userId=${user.id}`}
          to={`/chats?userId=${user.id}`}
        >
          Send message
        </Link>
      </div>
    </div>
  );
};

UserData.propTypes = {
  user: PropTypes.shape({}).isRequired,
  // sendMessageHandler: PropTypes.func.isRequired,
};

export default UserData;
