/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styled, { css } from 'styled-components';
import { modularScale, lighten } from 'polished';
import { Link } from 'react-router-dom';
import { Eye } from '../Icon';
import { ax } from '../../styles';

const IssuesListWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-top: ${modularScale(1)};
`;

const IssueListItem = styled.div`
  width: calc(100% / 4 - ${p => (p.keepPairs ? 0.5 : 1)}rem);
  margin: 0 0.5rem 1rem;
  border: 1px solid ${p => lighten(0.8, ax('color.black')(p))};
  padding: 0.5rem;
  font-size: 1em;
  background-color: transparent;
  transition: border-color 0.2s ease-in-out;

  ${p =>
    p.keepPairs &&
    css`
      &:nth-child(even) {
        margin-right: 0;
        margin-left: 0.5rem;
      }

      &:nth-child(odd) {
        margin-right: 0.5rem;
        margin-left: 0;
        border-left-color: transparent;
      }

      &:first-child {
        margin-left: calc(100% / 4);
        border-left-color: ${lighten(0.8, ax('color.black')(p))};
      }
    `};

  &:hover {
    border-color: ${ax('color.brand')};
  }
`;

const IssueCover = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

const IssueDesc = styled(({ className, to, children }) => (
  <Link to={to} className={className}>
    {children}
  </Link>
))`
  display: block;
  margin: 0;
  margin-top: 0.5rem;
  font-size: ${modularScale(-1)};
  text-decoration: none;
  text-align: center;
  color: ${p =>
    p.isHovering ? ax('color.brand')(p) : lighten(0.5, ax('color.black')(p))};
  transition: color 0.2s ease-in-out;
`;

const IssueShowIcon = styled(Eye)`
  position: absolute;
  margin-left: 5px;
  transform: translateY(100%);
  opacity: 0;
  transition transform 0.3s ease-in-out, opacity 0.3s ease-in-out;

  ${p =>
    p.isHovering &&
    css`
      transform: translateY(0);
      opacity: 1;
    `}  
`;

const IssueReloadButton = styled.button`
  position: absolute;
  top: 0%;
  right: 0%;
  border: none;
  font-size: 1em;
  color: ${ax('color.black')};
  background-color: transparent;
  opacity: 0;
  visibility: hidden;
  cursor: pointer;
  transition opacity 0.2s ease-in-out, visibility 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    color: ${ax('color.brand')};
  }

  ${p =>
    p.isHovering &&
    css`
      opacity: 1;
      visibility: visible;
    `}
`;

export {
  IssuesListWrapper,
  IssueListItem,
  IssueCover,
  IssueDesc,
  IssueShowIcon,
  IssueReloadButton,
};
