import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Notification from './Notification';
import style from './notification.less';
import notificationActions from './../../actions/notification/notificationActions';

const NotificationWrapper = (props) => {
  const { notifications, deleteNotification } = props;
  return (
    <div className="notification_wrapper">
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          id={notification.id}
          onClickDelete={deleteNotification}
          title={notification.title}
          description={notification.description}
          type={notification.type}
        />
      ))}
    </div>
  );
};

NotificationWrapper.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.shape({})),
  deleteNotification: PropTypes.func.isRequired,
};

NotificationWrapper.defaultProps = {
  notifications: [],
};

const mapStateToProps = state => ({
  notifications: state.notification.notifications,
});

const mapDispatchToProps = dispatch => ({
  deleteNotification: bindActionCreators(notificationActions.delete, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationWrapper);
