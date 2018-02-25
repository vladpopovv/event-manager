import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import usersActions from './../../actions/usersActions/usersActions';

class UserPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.getUserDataById(this.props.match.params.id);
  }

  render() {
    const { user } = this.props;
    if (!user.id) {
      return <h1>Loading... </h1>;
    }
    return (
      <div>
        User Page # {this.props.match.params.id}
        <div>{user.firstname} {user.lastname}</div>
      </div>
    );
  }
}

UserPage.propTypes = {
  user: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  getUserDataById: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
  getUserDataById: bindActionCreators(usersActions.getUserDataById, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
