import styled from 'styled-components';
import { modularScale } from 'polished';
import transition from '../../styles/transitions';
import Link from '../Link';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  width: 100vw;
  padding: ${modularScale(0)};
  font-size: ${modularScale(0)};
  overflow: hidden;
  font-family: ${props => props.theme.font.serif};
`;

export const LogotypeContainer = styled.div`
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
  color: ${props =>
    props.active ? props.theme.color.black : props.theme.color.grey};
  text-decoration: none;
  ${transition('color')};

  &:hover {
    color: ${props => props.theme.color.black};
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-left: auto;
`;

export const ProfileName = styled.span`
  margin-right: ${modularScale(-1)};
  line-height: calc(${modularScale(1)} - 4px);
`;

export const ProfileImage = styled.div`
  position: relative;
  display: inline-block;
  width: calc(${modularScale(1)} - 4px);
  height: calc(${modularScale(1)} - 4px);
  border-radius: 100%;
  background-color: ${props => props.theme.color.grey};

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    border: 1px solid ${props => props.theme.color.black};
    border-radius: 100%;
  }
`;
