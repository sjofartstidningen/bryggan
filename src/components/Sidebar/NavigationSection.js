// @flow
import React from 'react';
import type { ComponentType } from 'react';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { getTypeScale, getColor, transition } from '../../styles';

type LinkItem = {
  to: string,
  title: string,
  icon?: ComponentType<*>,
  links?: Array<LinkItem>,
};

type Props = {
  links: Array<LinkItem>,
};

const NavWrapper = styled.nav``;

const NavLinkWithoutPassedProps = ({
  to,
  className,
  children,
}: {
  to: string,
  className: string,
  children: any,
}) => (
  <NavLink to={to} className={className}>
    {children}
  </NavLink>
);

const MenuLink = styled(NavLinkWithoutPassedProps)`
  position: relative;
  display: block;
  width: 100%;
  padding: 0.5rem;
  padding-left: 1.25rem;
  ${getTypeScale(1)};
  text-decoration: none;
  color: inherit;
  ${transition('color')};

  &.active,
  &:hover {
    color: ${getColor('primary brand')};

    &::after {
      opacity: 0.99;
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: currentColor;
    opacity: 0.01;
    ${transition('opacity')};
  }

  ${p =>
    p.sublink &&
    css`
      padding-left: 2rem;
      font-weight: ${p.theme.fontWeight.normal};
    `};

  ${p =>
    p.active &&
    css`
      font-weight: ${p.theme.fontWeight.bold};
      color: ${getColor('primary brand')};
    `};

  & .nav-icon {
    margin-right: 0.5rem;
  }
`;

const Menu = styled.ul.attrs({ role: 'menu' })`
  margin: 0;
  padding: 0;
  list-style: none;

  ${MenuLink} + & {
    display: none;
  }

  ${MenuLink}.active + & {
    display: block;
  }
`;

const MenuItem = styled.li.attrs({ role: 'menuitem' })`
  font-weight: ${p => p.theme.fontWeight.bold};
  margin-top: 0.25rem;
`;

function renderLink(link: LinkItem, sub: boolean) {
  return (
    <MenuItem key={link.to}>
      <MenuLink sublink={sub} to={link.to}>
        {link.icon && <link.icon baseline className="nav-icon" />}
        {link.title}
      </MenuLink>
      {link.links && <Menu>{link.links.map(l => renderLink(l, true))}</Menu>}
    </MenuItem>
  );
}

function NavigationSection({ links }: Props) {
  return (
    <NavWrapper aria-label="Page Navigation">
      <Menu aria-label="Page main menu">
        {links.map(l => renderLink(l, false))}
      </Menu>
    </NavWrapper>
  );
}

export default NavigationSection;
