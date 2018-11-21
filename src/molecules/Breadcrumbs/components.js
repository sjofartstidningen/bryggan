import React from 'react';
import styled from 'styled-components';
import { Link } from '../../atoms/Link';
import { Paragraph } from '../../atoms/Text';
import { ChevronRight, ChevronDown } from '../../atoms/Icon';
import { transitions } from '../../theme/utils';

const LinkWithoutExact = ({ exact, ...props }) => <Link {...props} />;

const Wrapper = styled(Paragraph.withComponent('div'))`
  max-width: 100%;
  font-size: ${({ theme }) => theme.typeSize.heading};
`;

const CrumbWrapper = styled.span`
  position: relative;
  margin-right: ${({ theme }) => theme.margin.fourth};
`;

const Crumb = styled(LinkWithoutExact)`
  border: none;
  text-decoration: none;
  text-transform: capitalize;
  color: ${({ exact, theme }) =>
    exact ? theme.color.black : theme.color.greyDark};
`;

const SubRouteIcon = styled(ChevronDown)`
  position: absolute;
  top: 100%;
  left: 50%;
  font-size: ${({ theme }) => theme.typeSize.label};
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -100%);
  ${transitions.short('opacity', 'visibility', 'transform')};

  ${CrumbWrapper}:hover > & {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, -25%);
    transition-delay: 0.5s;
  }
`;

const SubRouteList = styled.ul`
  position: absolute;
  display: flex;
  top: 100%;
  left: 0;
  margin: 0;
  padding: 0;
  padding-top: ${({ theme }) => theme.padding.half};
  font-size: ${({ theme }) => theme.typeSize.label};
  list-style: none;
  opacity: 0;
  visibility: hidden;
  ${transitions.short('opacity', 'visibility')};

  ${CrumbWrapper}:hover > & {
    opacity: 1;
    visibility: visible;
    transition-delay: 0.5s;
  }
`;

const SubRouteListItem = styled.li``;

const SubRouteListItemLink = styled(LinkWithoutExact)`
  border: none;
  padding-right: ${({ theme }) => theme.margin.half};
  color: ${({ exact, theme }) =>
    exact ? theme.color.black : theme.color.greyDark};
`;

const Icon = styled(ChevronRight)`
  margin-right: ${({ theme }) => theme.margin.fourth};
  color: ${({ theme }) => theme.color.greyDark};
  transform: translateY(5%);

  &:last-of-type {
    display: none;
  }
`;

export {
  Wrapper,
  CrumbWrapper,
  Crumb,
  SubRouteIcon,
  SubRouteList,
  SubRouteListItem,
  SubRouteListItemLink,
  Icon,
};
