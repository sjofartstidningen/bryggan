// @flow
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logotype from '../Logotype';
import { getColor, colorMixin, backgroundColorMixin } from '../../styles/color';
import { typeMixin } from '../../styles/type';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  width: 16rem;
  height: 100vh;
  border-right: 1px solid ${getColor('ui04')};

  ${typeMixin('ui')};
  ${colorMixin('text01')};
  ${backgroundColorMixin('ui01')};
`;

const SidebarSection = styled.div`
  width: 100%;
  border-top: 1px solid ${getColor('ui04')};
  padding: 1rem 0rem;

  &:first-child {
    border: none;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 1rem;
`;

const Logo = styled(Logotype)`
  width: auto;
  height: 2rem;
  margin-right: 1rem;
`;

const TitleLink = styled(Link)`
  display: inline;
  width: 100%;
  text-decoration: none;
  white-space: nowrap;
  ${typeMixin('delta')};
  ${colorMixin('text01')};

  &:hover {
    ${colorMixin('brand02')};
  }
`;

export { Wrapper, SidebarSection, TitleWrapper, Logo, TitleLink };
