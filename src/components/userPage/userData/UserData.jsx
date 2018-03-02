import React from 'react';
import PropTypes from 'prop-types';

const UserData = (props) => {
  const { user } = props;
  const userIsFriends = props.friends.some(friend => friend.id === user.id);
  const deleteFriendsHandler = () => props.deleteFriendsHandler(user);
  const addToFriendsHandler = () => props.addToFriendsHandler(user);
  const createDialogHandler = () => props.createDialogHandler(user);

  return (
    <div className="card">
      <div className="card-header">
        {user.firstname.toUpperCase()} {user.lastname.toUpperCase()}
      </div>
      <div className="card-body">
        <div>Firstname: {user.firstname}</div>
        <div>Lastname: {user.firstname}</div>
        <div>Email: {user.login}</div>
      </div>
      <div className="card-footer">
        <div className="float-right">
          <button
            className="btn btn-primary"
            onClick={createDialogHandler}
            type="button"
          >
            Send message
          </button>
          {userIsFriends
            ?
              <button className="btn btn-danger ml-2" onClick={deleteFriendsHandler}>
                Delete from friends
              </button>
            :
              <button
                className="btn btn-success ml-2"
                onClick={addToFriendsHandler}
              >
                Add to friends
              </button>
          }
        </div>
      </div>
    </div>
  );
};

UserData.propTypes = {
  user: PropTypes.shape({}).isRequired,
  friends: PropTypes.arrayOf(PropTypes.shape({
    some: PropTypes.func,
  })).isRequired,
  deleteFriendsHandler: PropTypes.func.isRequired,
  createDialogHandler: PropTypes.func.isRequired,
  addToFriendsHandler: PropTypes.func.isRequired,
};

export default UserData;
