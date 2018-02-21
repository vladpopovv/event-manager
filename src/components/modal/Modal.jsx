import React from 'react';
import { componentWillAppendToBody } from 'react-append-to-body';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './modal.less';

const Modal = (props) => {
  const animationTimeout = 300;
  const hideHandler = (e) => {
    if (!e.target.classList.contains('modal__body')) {
      return false;
    }
    return props.onHide();
  };

  if (!props.show) {
    props.callBackLeave();
  }
  return (
    <ReactCSSTransitionGroup
      transitionName="modalAnimation"
      transitionEnterTimeout={animationTimeout}
      transitionLeaveTimeout={animationTimeout}
      component="div"
    >
      {props.show && (
        <div>
          <div
            className="modal__background"
            onClick={hideHandler}
            role="button"
            tabIndex={-1}
            onKeyDown={props.onHide}
          >
            <div className="modal__body">
              <div className="modal__content">
                {props.children}
              </div>
            </div>
          </div>
        </div>)
      }
    </ReactCSSTransitionGroup>
  );
};

Modal.propTypes = {
  children: PropTypes.shape({}).isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  callBackLeave: PropTypes.func,
};

Modal.defaultProps = {
  callBackLeave: () => false,
};

export default componentWillAppendToBody(Modal);
