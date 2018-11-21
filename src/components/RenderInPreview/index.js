import { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const previewRoot = document.getElementById('preview-root');

class RenderInPreview extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  el = document.createElement('div');

  componentDidMount() {
    if (previewRoot) {
      previewRoot.appendChild(this.el);
    }
  }

  componentWillUnmount() {
    if (previewRoot) {
      previewRoot.removeChild(this.el);
    }
  }

  render() {
    return createPortal(this.props.children, this.el);
  }
}

export { RenderInPreview as default };
