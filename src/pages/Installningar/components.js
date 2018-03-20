import styled from 'styled-components';

const Section = styled.section`
  max-width: 40rem;
  margin-bottom: calc(${({ theme }) => theme.margin.double} * 2);
  border-bottom: ${({ theme }) => theme.border.greyOpaque};
  padding-bottom: ${({ theme }) => theme.padding.double};
`;

export { Section };
