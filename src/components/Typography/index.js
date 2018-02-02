import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { modularScale, lighten } from 'polished';
import { ax } from '../../styles';

const Title = styled.h1`
  margin: 0;
  font-size: ${modularScale(4)};
  font-weight: 400;
  letter-spacing: 0.03em;
  color: ${p => lighten(0.5, ax('color.black')(p))};
`;

const SubTitle = styled.h2`
  position: sticky;
  top: 0;
  margin: 0;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${p => lighten(0, ax('color.grey')(p))};
  padding-top: 1rem;
  padding-bottom: 0.5rem;
  font-size: ${modularScale(1)};
  font-weight: 700;
  background-color: ${ax('color.white')};
`;

const SubTitleLink = styled(Link)`
  padding: 0 0.2em;
  color: ${ax('color.black')};
  text-decoration: none;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${p => lighten(0.5, ax('color.black')(p))};
  }
`;

export { Title, SubTitle, SubTitleLink };
