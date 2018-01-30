import React from 'react';
import { Redirect } from 'react-router-dom';

const Authorization = (WrappedComponent, allowedRoles) =>
  (class WithAuthorization extends React.Component {
    constructor(props) {
      super(props);
      // In this case the user is hardcoded, but it could be loaded from anywhere.
      // Redux, MobX, RxJS, Backbone...
      this.state = {
        user: {
          name: 'vcarl',
          // role: 'user',
        },
      };
    }
    render() {
      const { role } = this.state.user;
      if (allowedRoles.includes(role)) {
        return <WrappedComponent {...this.props} />;
      }
      return <Redirect to="/login" />;
    }
  });


export default Authorization;
