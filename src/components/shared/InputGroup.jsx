import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const InputGroup = (props) => {
  const { error, children } = props;
  return (
    <div className="form-group">
      <div className={classNames('col-12', 'p-0')}>
        {children}
        {error &&
          <span className="text-danger">{error}</span>}
      </div>
    </div>
  );
};

InputGroup.propTypes = {
  error: PropTypes.string,
  children: PropTypes.shape({}).isRequired,
};

InputGroup.defaultProps = {
  error: '',
};

export default InputGroup;
