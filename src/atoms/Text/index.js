import styled from 'styled-components';
import { fontSmoothing } from '../../theme/utils';

const Paragraph = styled.p`
  width: 100%;
  max-width: 40rem;
  margin: 0;
  margin-bottom: ${({ theme }) => theme.margin.extra};
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.typeSize.body};
  font-weight: ${({ theme }) => theme.weight.normal};
  line-height: ${({ theme }) => theme.lineHeight.body};
  color: ${({ theme }) => theme.color.black};

  ${fontSmoothing};
`;

const Strong = styled.strong`
  font-weight: ${({ theme }) => theme.weight.bold};
`;

export { Paragraph, Strong };
