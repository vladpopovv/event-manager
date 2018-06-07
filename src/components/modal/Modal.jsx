import React from 'react';
// import { componentWillAppendToBody } from 'react-append-to-body';
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

  // if (!props.show) {
  //   props.callBackLeave();
  // }
  return (
    <div className="modal__wrapper" >
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
              role="presentation"
              tabIndex={-1}
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
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.shape({}),
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  children: <div />,
};

export default Modal;
