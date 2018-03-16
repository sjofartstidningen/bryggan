import styled, { css } from 'styled-components';
import { Document as _Document, Page as _Page } from 'react-pdf';
import {transitions} from '../../theme/utils';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-flow: column nowrap;
  jsutify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.color.greyLight};
`;

const Preview = styled.div`
  margin-top: ${({ theme }) => theme.margin.double};
  border: ${({ theme }) => theme.border.greyOpaque};
  max-width: calc(100% - 2rem);
  max-height: calc(100vh - 6rem);
  overflow: scroll;
  visibility: hidden;
  opacity: 0;

  ${transitions.short('visibility', 'opacity')};

  ${p => p.state === 'success' && css`
    visibility: visible;
    opacity: 1;
  `};
`;

const Document = styled(_Document)``;

const Page = styled(_Page)``;

export { Wrapper, Preview, Document, Page };
