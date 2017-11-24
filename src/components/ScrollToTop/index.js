import { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string,
      key: PropTypes.string,
    }).isRequired,
  };

  componentDidUpdate(nextProps) {
    if (this.props.location !== nextProps.location) {
      window.scrollTo(0, 0);
    }
  }

  // eslint-disable-next-line
  render() {
    return null;
  }
}

export default withRouter(ScrollToTop);
