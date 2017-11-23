import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authCheckInitialStatus } from '../../store/user/actions';

class Auth extends PureComponent {
  static propTypes = {
    authCheckInitialStatus: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.authCheckInitialStatus();
  }

  // eslint-disable-next-line
  render() {
    return null;
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ authCheckInitialStatus }, dispatch);
export default connect(null, mapDispatchToProps)(Auth);
