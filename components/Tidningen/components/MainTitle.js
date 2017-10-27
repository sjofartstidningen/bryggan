import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import StickyEvent from '../../StickyEvent';
import Link from '../../Link';
import { H1 } from '../../Typography/headings';

const Title = styled(H1)`
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s ease-in-out;
  will-change: border-color;

  ${props =>
    props.stuck &&
    css`
      border-color: ${props.theme.color.grey};
    `};
`;

Title.propTypes = {
  stuck: PropTypes.bool,
};

const TitleLink = styled(Link)`
  display: inline-block;
  padding-bottom: 0.5rem;
  text-decoration: none;
  color: ${props => props.theme.color.grey};
  background-color: ${props => props.theme.color.white};
  transition: color 0.3s ease-in-out;
  will-change: color;

  &:hover {
    color: ${props => props.theme.color.black};
  }
`;

function MainTitle({ children }) {
  return (
    <StickyEvent
      style={{ zIndex: 2 }}
      render={({ stuck }) => (
        <Title stuck={stuck}>
          <TitleLink href="/tidningen">{children}</TitleLink>
        </Title>
      )}
    />
  );
}

MainTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainTitle;