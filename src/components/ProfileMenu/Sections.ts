import styled, { css } from 'styled-components';
import { boxShadow } from '../../styles/utils';
import { color, maxWidth } from '../../styles/theme';

export const ProfileMenuWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-flow: column nowrap;
  width: 100vw;
  max-width: ${maxWidth('xs')};
  height: 100vh;
  background: ${color('white')};
  overflow-x: hidden;
  overflow-y: scroll;

  ${boxShadow('md')};
`;

export const MenuSection = styled.div<{ push?: boolean }>`
  width: 100%;
  height: auto;
  border-bottom: 1px solid ${color('shade')};

  ${({ push }) =>
    push &&
    css`
      margin-top: auto;
      border-top: 1px solid ${color('shade')};
    `}
`;
