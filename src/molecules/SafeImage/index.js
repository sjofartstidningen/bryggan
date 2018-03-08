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
  onError?: () => void,
  onSuccess?: () => void,
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

  componentDidMount() {
    this.fetchImage();
  }

  fetchImage = () => {
    const { src } = this.props;
    const img = new Image();

    img.onload = () => {
      this.setState(() => ({ fetched: true }));
      if (this.props.onSuccess) this.props.onSuccess();
    };

    img.onerror = () => {
      this.setState(() => ({ fetched: true, error: true }));
      if (this.props.onError) this.props.onError();
    };

    img.src = src;
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
