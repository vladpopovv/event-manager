import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './notification.less';

export default class Notification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
    };

    this.onClickDelete = this.onClickDelete.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }


  componentDidMount() {
    this.startTimer();
  }

  onClickDelete() {
    this.props.onClickDelete(this.props.id);
  }

  onMouseEnter() {
    clearTimeout(this.timer);
    this.setState({
      isActive: true,
    });
  }

  onMouseLeave() {
    this.timer = setTimeout(this.onClickDelete, 3000);
    this.setState({
      isActive: false,
    });
  }

  startTimer() {
    this.timer = setTimeout(this.onClickDelete, 3000);
  }

  render() {
    const { title, description, type } = this.props;
    const alertClasses = classNames('alert', `alert-${type}`, 'notification', {
      'notification-active': this.state.isActive,
    });
    return (
      <div
        className={alertClasses}
        role="alert"
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <button
          onClick={this.onClickDelete}
          type="button"
          className="close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <strong>{title} </strong>
        <p>
          {description}
        </p>
      </div>
    );
  }
}

Notification.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  type: PropTypes.string,
  onClickDelete: PropTypes.func.isRequired,
};

Notification.defaultProps = {
  description: '',
  type: 'warning',
};
