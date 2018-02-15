import React from 'react';
import { componentWillAppendToBody } from 'react-append-to-body';
import PropTypes from 'prop-types';
import './modal.less';

const Modal = (props) => {
  console.log(props);
  if (!props.show) {
    return null;
  }
  return (
    <div className="">
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
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.shape({}).isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default componentWillAppendToBody(Modal);
