import React from 'react';

export default class NotFound extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-4 alert alert-danger my-4" role="alert">
          <h2 className="text-center">Page not found!</h2>
        </div>
      </div>
    );
  }
}
