import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { modularScale } from 'polished';
import transition from '../../../styles/transitions';
import StickyEvent from '../../StickyEvent';
import { H1 } from '../../Typography/headings';
import ChevronsRight from '../../Icons/ChevronsRight';

const Title = H1.withComponent('h2').extend`
  background-color: ${props => props.theme.color.white};
  border-bottom: 1px solid ${props => props.theme.color.grey};
  padding-bottom: 0.5rem;
  color: ${props => props.theme.color.black};
  ${transition('border-color')};

  ${props =>
    props.stuck &&
    css`
      border-color: transparent;
    `};
`;

Title.propTypes = {
  stuck: PropTypes.bool,
};

const Small = styled.small`
  font-size: ${modularScale(-2)};
`;

const TitleSpan = styled.span`
  display: inline-block;
  transform: translateX(${props => (props.stuck ? props.translate : 0)}px);
  ${transition('transform')};
`;

const Icon = styled(ChevronsRight)`
  margin-right: 0.2em;
  margin-left: ${props => (props.stuck ? 0 : -1.2)}em;
  opacity: ${props => (props.stuck ? 1 : 0)};
  ${transition('margin-left', 'opacity')};
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
          <Small>
            <TitleSpan stuck={stuck} translate={translateTitle}>
              <Icon baseline stuck={stuck} />
              {children}
            </TitleSpan>
          </Small>
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
