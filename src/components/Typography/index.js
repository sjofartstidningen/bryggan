import styled from 'styled-components';
import { modularScale, lighten } from 'polished';

const Title = styled.h1`
  margin: 0;
  font-size: ${modularScale(4)};
  font-weight: 400;
  letter-spacing: 0.03em;
  color: ${lighten(0.5, '#1a1a1a')};
`;

const SubTitle = styled.h2`
  position: sticky;
  top: 0;
  margin: 0;
  padding-top: 1rem;
  padding-bottom: 0.5rem;
  font-size: ${modularScale(1)};
  font-weight: 700;
  background-color: white;
`;

export { Title, SubTitle };
