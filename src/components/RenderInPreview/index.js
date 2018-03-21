// @flow
import { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import type { Node } from 'react';

const previewRoot = document.getElementById('preview-root');

type Props = {
  children: Node,
};

class RenderInPreview extends PureComponent<Props, *> {
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
