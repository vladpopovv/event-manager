import React from 'react';
import { componentWillAppendToBody } from 'react-append-to-body';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './modal.less';

const Modal = props => (
  <ReactCSSTransitionGroup
    transitionName="modalAnimation"
    transitionEnterTimeout={300}
    transitionLeaveTimeout={300}
    component="div"
  >
    {props.show && (
      <div>
        <div
          className="modal__background"
          onClick={props.onHide}
          role="button"
          tabIndex={-1}
          onKeyDown={props.onHide}
        />
        <div className="modal__body">
          <div className="modal__content">
            {props.children}
          </div>
        </div>
      </div>)
    }
  </ReactCSSTransitionGroup>
);

Modal.propTypes = {
  children: PropTypes.shape({}).isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default componentWillAppendToBody(Modal);
