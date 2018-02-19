import React from 'react';
import PropTypes from 'prop-types';
import './loaderStyle.less';

const Loader = (props) => {
  if (!props.loading) {
    return null;
  }
  return (
    <div className="loader__wrapper">
      <div className="loader__spinner">
        <i className="fa fa-spinner spinner" />
      </div>
    </div>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Loader;
