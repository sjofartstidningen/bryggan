// @flow
import type { ComponentType } from 'react';
import styled from 'styled-components';
import Link from '../Link';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  width: 100vw;
  padding: 1em;
  font-size: ${props => props.theme.size(0)}rem;
  overflow: hidden;
  font-family: ${props => props.theme.font.serif};
`;

export const LogotypeContainer = styled.div`
  width: 40px;
  margin-right: ${props => props.theme.size(1)}em;
`;

export const NavContainer = styled.div`
  margin-right: ${props => props.theme.size(1)}em;
`;

export const Nav = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const NavItem = styled.li`
  display: inline-block;
  margin-right: ${props => props.theme.size(-1)}em;
  border-right: 1px solid ${props => props.theme.color.grey};
  padding-right: ${props => props.theme.size(-1)}em;
  color: ${props =>
    props.active ? props.theme.color.black : props.theme.color.grey};

  &:last-child {
    margin: 0;
    border: none;
    padding: 0;
  }
`;

export const NavLink: ComponentType<{ active: boolean }> = styled(Link)`
  color: ${props =>
    props.active ? props.theme.color.black : props.theme.color.grey};
  text-decoration: none;
  transition: color 0.2s ease-in-out;

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
  margin-right: ${props => props.theme.size(-1)}em;
  line-height: calc(${props => props.theme.size(1)}em - 4px);
`;

export const ProfileImage = styled.div`
  position: relative;
  display: inline-block;
  width: calc(${props => props.theme.size(1)}em - 4px);
  height: calc(${props => props.theme.size(1)}em - 4px);
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
