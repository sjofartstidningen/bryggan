// @flow
import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { Logotype } from '../../atoms/Icon';
import { gravatarUrl } from '../../utils';
import {
  slideInUp,
  slideInDown,
  slideOutUp,
  slideOutDown,
} from '../../theme/animations';
import LazyImage from '../../atoms/LazyImage';

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
  border-radius: 100%;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: ${({ theme }) => theme.boxShadow.greyOpaque};
  overflow: hidden;

  ${p =>
    p.error &&
    css`
      box-shadow: ${({ theme }) => theme.boxShadow.error};
    `};
`;

const Image = styled(LazyImage)`
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

const Logo = styled(Logotype).attrs({ baseline: false })`
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
  error: boolean,
};

type State = {};

class ProfilePicture extends Component<Props, State> {
  state = {};

  shouldComponentUpdate({ email, error }: Props) {
    const { email: prevEmail, error: prevError } = this.props;
    return (
      (prevEmail !== email && emailRe().test(email)) || error !== prevError
    );
  }

  render() {
    const { email, error } = this.props;
    const src = gravatarUrl(email);

    return (
      <Wrapper>
        <Cutout />
        <InnerWrapper error={error}>
          <Image
            src={src}
            alt={`Gravatar for ${email}`}
            renderPlaceholder={() => <Logo />}
            renderLoading={() => <Logo />}
            renderError={() => <Logo />}
          />
        </InnerWrapper>
      </Wrapper>
    );
  }
}

export { ProfilePicture as default };
