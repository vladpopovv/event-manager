import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './LoaderStyle.less';

const Loader = (props) => {
  if (!props.loading) {
    return null;
  }
  return (
    <div className="loader__wrapper">
      <div className="loader__bgr">
        <i className={classNames(
            'fa',
            {
              'fa-spinner': props.loading,
              message__spinner: props.loading,
            },
          )}
        />
      </div>
    </div>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Loader;
