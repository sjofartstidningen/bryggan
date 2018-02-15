import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logotype from '../Logotype';
import { getColor, getTypeScale } from '../../styles';

const Wrapper = styled.div`
position: fixed;
top: 0;
left: 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  width: 16rem;
  height: 100vh;
  border-right: 1px solid ${getColor('subtle border')};
  background-color: ${getColor('primary background')};
  font-family: ${p => p.theme.font.sansSerif};
  color: ${getColor('primary text')};
`;

const SidebarSection = styled.div`
  width: 100%;
  border-top: 1px solid ${getColor('subtle border')};
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
  color: ${getColor('primary text')};
  font-weight: ${p => p.theme.fontWeight.bold};
  text-decoration: none;
  white-space: nowrap;

  ${getTypeScale(3)};

  &:hover {
    color: ${getColor('brand01 hover')};
  }
`;

export { Wrapper, SidebarSection, TitleWrapper, Logo, TitleLink };
