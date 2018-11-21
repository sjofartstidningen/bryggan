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

const Tinted = styled.span`
  color: ${({ theme }) => theme.color.greyDark};
`;

const Heading1 = styled(Paragraph.withComponent('h1'))`
  margin: 0;
  margin-top: ${({ theme }) => theme.margin.extra};
  margin-bottom: ${({ theme }) => theme.margin.half};
  font-size: ${({ theme }) => theme.typeSize.heading};
  font-weight: ${({ theme }) => theme.weight.bold};
`;

const Heading2 = styled(Heading1.withComponent('h2'))`
  margin-bottom: ${({ theme }) => theme.margin.double};
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.typeSize.body};
  font-weight: ${({ theme }) => theme.weight.normal};
`;

export { Paragraph, Strong, Tinted, Heading1, Heading2 };
