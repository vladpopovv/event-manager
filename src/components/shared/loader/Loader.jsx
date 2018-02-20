import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './loaderStyle.less';

const Loader = (props) => {
  if (!props.loading) {
    return null;
  }
  return (
    <div className={classNames('loader__wrapper', `${props.position}`)}>
      <div className={classNames('loader__spinner', `${props.size}`)}>
        <i className="fa fa-spinner spinner" />
      </div>
    </div>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
  size: PropTypes.string,
  position: PropTypes.string,
};

Loader.defaultProps = {
  size: 'lg',
  position: 'absolute',
};

export default Loader;
