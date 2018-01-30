import React from 'react';
import { Redirect } from 'react-router-dom';

const Authorization = (WrappedComponent, allowedRoles, redirectTo = 'login') =>
  (class WithAuthorization extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        user: {
          role: 'unLogged', // user or unLogged
        },
      };
    }

    componentWillMount() {
      // TODO call promise from services
      this.setState({
        user: {
          role: 'user',
        },
      });
    }

    render() {
      const { role } = this.state.user;
      if (allowedRoles.includes(role)) {
        return <WrappedComponent {...this.props} />;
      }
      return <Redirect to={`/${redirectTo}`} />;
    }
  });

export default Authorization;
