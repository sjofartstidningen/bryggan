import styled from 'styled-components';
import { modularScale } from 'polished';

const Paragraph = styled.p`
  width: 100%;
  max-width: calc(1em * 30);
  font-family: ${props => props.theme.font.serif};
  font-size: ${modularScale(0)};
  line-height: 1.5;
`;

const Description = Paragraph.extend`
  font-size: ${modularScale(-1)};
  color: ${props => props.theme.color.grey};
`;

export { Paragraph, Description };
