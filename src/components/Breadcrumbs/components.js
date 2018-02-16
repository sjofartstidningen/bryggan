// @flow
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { typeMixin } from '../../styles/type';
import { colorMixin } from '../../styles/color';
import { transitionMixin } from '../../styles/utils';

export const BreadcrumbsWrapper = styled.div`
  ${typeMixin('zeta')};
  font-weight: 300;
`;

export const Breadcrumb = styled(Link)`
  position: relative;
  display: inline-block;
  margin-right: 0.5rem;
  text-decoration: none;
  text-transform: capitalize;
  ${colorMixin('text02')};
  ${transitionMixin('color')};

  &:hover {
    ${colorMixin('brand01')};
  }

  &::after {
    content: '/';
    margin-left: 0.5rem;
    ${colorMixin('brand01')};
  }

  &:last-child {
    margin-right: 0;

    &::after {
      content: '';
      margin-left: 0rem;
    }
  }
`;
