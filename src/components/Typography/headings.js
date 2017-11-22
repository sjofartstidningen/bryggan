import styled from 'styled-components';
import { modularScale } from 'polished';
import media from '../../styles/media';

export const H1 = styled.h1`
  font-family: ${props => props.theme.font.serif};
  font-weight: 400;
  font-size: ${modularScale(3)};
  letter-spacing: 0.05em;
  color: ${props => props.theme.color.grey};

  ${media.notSmall`
    font-size: ${modularScale(4)};
  `};
`;

export const H2 = H1.withComponent('h2').extend`
  padding: 0;
  font-size: ${modularScale(2)};
  color: ${props => props.theme.color.black};

  ${media.notSmall`
    font-size: ${modularScale(2)};
  `}
`;
