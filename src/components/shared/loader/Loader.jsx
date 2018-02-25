import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './loaderStyle.less';

const Loader = (props) => {
  const animationTimeout = 500;
  // if (!props.loading) {
  //   return null;
  // }
  return (
    <ReactCSSTransitionGroup
      transitionName="loaderAnimation"
      transitionEnterTimeout={animationTimeout}
      transitionLeaveTimeout={animationTimeout}
      component="div"
    >
      {props.loading &&
        <div className={classNames('loader__wrapper', `${props.position}`)}>
          <div className={classNames('loader__spinner', 'text-primary', `${props.size}`)}>
            <i className="fa fa-spinner spinner" />
          </div>
        </div>
      }
    </ReactCSSTransitionGroup>
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
