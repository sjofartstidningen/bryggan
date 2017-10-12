// @flow
import type { ChildrenArray, ComponentType } from 'react';
import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  width: 100vw;
  padding: 1em;
  font-size: 1em;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
`;

export const LogotypeContainer = styled.div`
  width: 40px;
  margin-right: 2em;
`;

export const NavContainer = styled.div`
  margin-right: 1em;
`;

export const Nav = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const NavItem: ComponentType<{
  active: boolean,
  children: ChildrenArray<any>,
}> = styled.li`
  display: inline-block;
  margin-right: 0.5em;
  border-right: 1px solid #999;
  padding-right: 0.5em;
  color: ${props => (props.active ? '#000' : '#999')};

  &:last-child {
    margin: 0;
    border: none;
    padding: 0;
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-left: auto;
`;

export const ProfileName = styled.span`
  margin-right: 0.5em;
  line-height: calc(1.5em - 4px);
`;

export const ProfileImage = styled.div`
  position: relative;
  display: inline-block;
  width: calc(1.5em - 4px);
  height: calc(1.5em - 4px);
  border-radius: 100%;
  background-color: #999;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    border: 1px solid #000;
    border-radius: 100%;
  }
`;
