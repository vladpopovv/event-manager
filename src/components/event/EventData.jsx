import React from 'react';
import PropTypes from 'prop-types';
import EventDescription from './EventDescription';

const EventData = (props) => {
  const { event } = props;
  const clickDeleteEventHandler = () => (
    props.deleteEventHandler(event)
      .then(() => props.onHide())
  );

  return (
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{event.title}</h5>
          <button
            type="button"
            className="close text-dark"
            data-dismiss="modal"
            aria-label="Close"
            onClick={props.onHide}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <EventDescription
          clickDeleteEventHandler={clickDeleteEventHandler}
          event={event}
        />
      </div>
    </div>
  );
};

EventData.propTypes = {
  event: PropTypes.shape({}).isRequired,
  onHide: PropTypes.func.isRequired,
  deleteEventHandler: PropTypes.func.isRequired,
};

export default EventData;
