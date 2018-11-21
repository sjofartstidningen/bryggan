import styled, { css } from 'styled-components';
import { Document as _Document, Page as _Page } from 'react-pdf';
import { Button } from '../../atoms/Button';
import { transitions } from '../../theme/utils';
import { slideInDown } from '../../theme/animations';

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

  ${p =>
    p.state === 'success' &&
    css`
      visibility: visible;
      opacity: 1;
    `};
`;

const Document = styled(_Document)``;

const Page = styled(_Page)``;

const CloseButton = styled(Button)`
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  font-size: ${({ theme }) => theme.typeSize.body};
  line-height: 3rem;
  color: ${({ theme }) => theme.color.greyDark};
  background-color: transparent;

  ${transitions.short('color')};
  ${slideInDown};

  &:hover {
    color: ${({ theme }) => theme.color.brand};
    background-color: transparent;
  }
`;

export { Wrapper, Preview, Document, Page, CloseButton };
