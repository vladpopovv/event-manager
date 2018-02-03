import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class Notification extends React.Component {
  constructor(props) {
    super(props);

    this.onClickDelete = this.onClickDelete.bind(this);
  }

  onClickDelete() {
    this.props.onClickDelete(this.props.id);
  }

  render() {
    const { title, description, type } = this.props;
    const alertClasses = classNames('alert', `alert-${type}`);
    return (
      <div className={alertClasses} role="alert">
        <strong>{title}</strong>
        {description}
        <button
          onClick={this.onClickDelete}
          type="button"
          className="close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
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
