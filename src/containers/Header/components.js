import styled from 'styled-components';
import { modularScale } from 'polished';
import { NavLink as Link } from 'react-router-dom';
import transition from '../../styles/transitions';

export const HeaderContainer = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  width: 100vw;
  padding: ${modularScale(0)};
  font-size: ${modularScale(0)};
  font-family: ${props => props.theme.font.serif};
  z-index: ${props => props.theme.zIndex.top};
`;

export const LogotypeContainer = styled(Link)`
  display: block;
  width: 40px;
  margin-right: ${modularScale(1)};
`;

export const NavContainer = styled.div`
  margin-right: ${modularScale(1)};
`;

export const Nav = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const NavItem = styled.li`
  display: inline-block;
  margin-right: ${modularScale(-1)};
  border-right: 1px solid ${props => props.theme.color.grey};
  padding-right: ${modularScale(-1)};
  color: ${props =>
    props.active ? props.theme.color.black : props.theme.color.grey};

  &:last-child {
    margin: 0;
    border: none;
    padding: 0;
  }
`;

export const NavLink = styled(Link)`
  color: ${props => props.theme.color.grey};
  text-decoration: none;
  ${transition('color')};

  &:hover {
    color: ${props => props.theme.color.black};
  }

  &.active {
    color: ${props => props.theme.color.black};
  }
`;
