import React from 'react';
import styled, { css } from 'styled-components';
import { modularScale, triangle } from 'polished';
import { Link } from 'react-router-dom';
import transition from '../../styles/transitions';

export const ProfileContainer = styled.div`
  position: relative;
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
  background-color: ${props =>
    props.loaded ? 'transparent' : props.theme.color.grey};

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

  & img {
    display: block;
    width: 100%;
    border-radius: 100%;
  }
`;

export const ProfileMenu = styled.ul`
  position: absolute;
  top: 200%;
  right: 0;
  width: calc(100% + 2px);
  max-width: 200px;
  margin: 0;
  border: 1px solid ${props => props.theme.color.black};
  border-radius: 4px;
  padding: ${modularScale(-2)};
  list-style: none;

  opacity: 0;
  visibility: hidden;
  transform: translateY(50%);
  ${transition('opacity', 'visibility', 'transform')};
  transition-delay: 0.5s;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -8px;
    left: calc(50% - 4px);
    color: ${props => props.theme.color.black};
    ${triangle({
      pointingDirection: 'top',
      width: 12,
      height: 8,
      foregroundColor: 'currentColor',
    })};
  }

  &::after {
    top: -7px;
    color: ${props => props.theme.color.white};
  }

  ${props =>
    props.hover &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
      transition-delay: 0s;
    `};
`;

export const ProfileMenuItem = styled.li`
  margin-bottom: ${modularScale(-2)};
  font-size: ${modularScale(-1)};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ProfileMenuLink = styled(({ warning, ...rest }) => (
  <Link {...rest} />
))`
  display: block;
  color: ${props => props.theme.color.black};
  text-decoration: none;
  ${transition('color')};

  &:hover {
    color: ${props =>
      props.warning ? props.theme.color.warning : props.theme.color.brand};
  }
`;

export const ProfileMenuInfo = ProfileMenuLink.extend`
  margin-top: ${modularScale(1)};
  color: ${props => props.theme.color.grey};
  font-size: ${modularScale(-1)};
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
