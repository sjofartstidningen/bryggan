// @flow
import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import SafeImage from '../SafeImage';
import { Logotype } from '../../atoms/Icon';
import { gravatarUrl } from '../../utils';
import {
  slideInUp,
  slideInDown,
  slideOutUp,
  slideOutDown,
} from '../../theme/animations';

const emailRe = () => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const Wrapper = styled.div`
  position: relative;
  width: 5rem;
  height: 5rem;
  margin-top: -2.5rem;
  border-radius: 100%;
`;

const InnerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.padding.fourth};
  border-radius: 100%;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: ${({ theme }) => theme.boxShadow.greyOpaque};
  overflow: hidden;
`;

const Image = styled(SafeImage)`
  border-radius: 100%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.color.white};
  ${slideInUp};

  ${p =>
    p.hide &&
    css`
      ${slideOutDown};
    `};
`;

const Logo = styled(Logotype)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.5rem;

  & > svg {
    ${slideInDown};
  }

  ${p =>
    p.hide &&
    css`
      & > svg {
        ${slideOutUp};
      }
    `};
`;

const Cutout = styled.div`
  position: absolute;
  top: -0.5rem;
  left: -0.5rem;
  width: calc(100% + 1rem);
  height: calc(100% + 1rem);
  border-radius: 100%;
  background-color: ${({ theme }) => theme.color.greyLight};
`;

type Props = {
  email: string,
};

type State = {
  fetched: boolean,
};

class ProfilePicture extends PureComponent<Props, State> {
  state = {
    fetched: false,
  };

  handleLoad = () => this.setState(() => ({ fetched: true }));
  handleError = () => this.setState(() => ({ fetched: false }));

  render() {
    const { email } = this.props;
    const { fetched } = this.state;

    const src = emailRe().test(email) ? gravatarUrl(email) : null;

    return (
      <Wrapper>
        <Cutout />
        <InnerWrapper>
          <Logo baseline={false} hide={src && fetched} />
          <Image
            src={src || ''}
            hide={!src && !fetched}
            onLoad={this.handleLoad}
            onError={this.handleError}
            onCancel={this.handleError}
          />
        </InnerWrapper>
      </Wrapper>
    );
  }
}

export { ProfilePicture as default };
