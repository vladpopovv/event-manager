import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class InputField extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      error,
    } = this.props;
    return (
      <div className="form-group">
        <div className={classNames('col-12', 'p-0')}>
          {this.props.children}
          {error &&
            <span className="text-danger">{error}</span>}
        </div>
      </div>
    );
  }
}

InputField.propTypes = {
  error: PropTypes.string,
  children: PropTypes.shape({}).isRequired,
};

InputField.defaultProps = {
  error: '',
};
