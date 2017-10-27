import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import StickyEvent from '../../StickyEvent';
import { H2 } from '../../Typography/headings';

const Title = styled(H2)`
  background-color: ${props => props.theme.color.white};
  transition: border-color 0.3s ease-in-out;
  will-change: border-color;

  ${props =>
    props.stuck &&
    css`
      border-color: transparent;
    `};
`;

Title.propTypes = {
  stuck: PropTypes.bool,
};

const TitleSpan = styled.span`
  display: inline-block;
  transform: translateX(${props => (props.stuck ? props.translate : 0)}px);
  transition: transform 0.3s ease-in-out;
  will-change: transform;
`;

TitleSpan.propTypes = {
  stuck: PropTypes.bool,
  translate: PropTypes.number.isRequired,
};

function SectionTitle({ translateTitle, children }) {
  return (
    <StickyEvent
      style={{ zIndex: 1 }}
      render={({ stuck }) => (
        <Title stuck={stuck}>
          <TitleSpan stuck={stuck} translate={translateTitle}>
            {stuck && '>'} {children}
          </TitleSpan>
        </Title>
      )}
    />
  );
}

SectionTitle.propTypes = {
  translateTitle: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default SectionTitle;
