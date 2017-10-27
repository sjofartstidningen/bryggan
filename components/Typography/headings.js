import styled from 'styled-components';
import media from '../../styles/media';

export const H1 = styled.h1`
  font-family: ${props => props.theme.font.serif};
  font-weight: 400;
  font-size: ${props => props.theme.size(1)}em;
  letter-spacing: 0.05em;
  color: ${props => props.theme.color.grey};

  ${media.notSmall`
    font-size: ${props => props.theme.size(2)}em;
  `};
`;

export const H2 = H1.withComponent('h2').extend`
  border-bottom: 1px solid ${props => props.theme.color.grey};
  padding: 0.5em;
  font-size: ${props => props.theme.size(0)}em;
  color: ${props => props.theme.color.black};

  ${media.notSmall`
    font-size: ${props => props.theme.size(1)}em;
  `}
`;
