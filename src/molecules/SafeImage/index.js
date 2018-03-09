// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Img } from '../../atoms/Image';

const Wrapper = styled.div`
  width: ${p => p.width};
  height: ${p => p.height};
  background-color: ${p => p.backgroundColor};
`;

type Props = {
  src: string,
  width?: string | number,
  height?: string | number,
  backgroundColor?: string,
  className?: string,
  onLoad?: () => void,
  onError?: () => void,
  onCancel?: () => void,
};

type State = {
  fetched: boolean,
  error: boolean,
};

class SafeImage extends PureComponent<Props, State> {
  static defaultProps = {
    width: 'auto',
    height: 'auto',
    backgroundColor: 'transparent',
  };

  state = {
    fetched: false,
    error: false,
  };

  cancel: ?() => void;

  componentDidMount() {
    this.fetchImage(this.props.src);
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.src !== prevProps.src) {
      if (this.cancel) this.cancel();
      this.fetchImage(this.props.src);
    }
  }

  componentWillUnmount() {
    if (this.cancel) this.cancel();
  }

  fetchImage = (src: string) => {
    this.setState({ fetched: false, error: false });

    if (src) {
      const img = new Image();
      img.onload = this.handleLoad.bind(this);
      img.onerror = this.handleError.bind(this);
      img.src = src;

      this.cancel = () => {
        if (this.props.onCancel) this.props.onCancel();

        img.onload = undefined;
        img.onerror = undefined;
        img.src = '';
      };
    }
  };

  handleLoad = () => {
    this.setState(() => ({ fetched: true }));
    if (this.props.onLoad) this.props.onLoad();
  };

  handleError = () => {
    this.setState(() => ({ fetched: true, error: true }));
    if (this.props.onError) this.props.onError();
  };

  render() {
    const { src, width, height, backgroundColor, className } = this.props;
    const { fetched, error } = this.state;
    return (
      <Wrapper
        className={className}
        width={width}
        height={height}
        backgroundColor={backgroundColor}
      >
        {fetched && !error && <Img src={src} />}
      </Wrapper>
    );
  }
}

export default SafeImage;
