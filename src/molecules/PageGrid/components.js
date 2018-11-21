import styled from 'styled-components';
import { Paragraph } from '../../atoms/Text';
import { Link } from '../../atoms/Link';
import { Button } from '../../atoms/Button';
import { transitions } from '../../theme/utils';
import { Eye, Refresh } from '../../atoms/Icon';

const Wrapper = styled.ol`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: ${({ theme }) => theme.padding.standard};
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Page = styled.li`
  position: relative;
`;

const PageLink = styled(Link)`
  display: block;
  border: ${({ theme }) => theme.border.greyOpaque};
  border-radius: 4px;
  padding: ${({ theme }) => theme.padding.fourth};
  color: ${({ theme }) => theme.color.greyDark};

  ${transitions.short('border', 'color')};

  &:hover {
    border: ${({ theme }) => theme.border.brand};
    color: ${({ theme }) => theme.color.brand};
  }
`;

const Description = styled(Paragraph)`
  display: block;
  width: 100%;
  max-width: 100%;
  margin: 0;
  margin-top: ${({ theme }) => theme.margin.half};
  font-size: ${({ theme }) => theme.typeSize.label};
  line-height: 1em;
  text-align: center;
  color: inherit;

  & > span {
    position: relative;
  }
`;

const Placeholder = styled.div`
  width: 100%;
  height: 0;
  padding-top: calc(100% * ${p => p.ratio});
`;

const EyeIcon = styled(Eye).attrs(() => ({ baseline: false }))`
  position: absolute;
  margin-left: ${({ theme }) => theme.margin.fourth};
  transform: translateX(100%);
  opacity: 0;

  ${transitions.short('transform', 'opacity')};

  ${PageLink}:hover & {
    transform: translateY(0);
    opacity: 1;
  }
`;

const RefreshButton = styled(Button)`
  position: absolute;
  top: ${({ theme }) => theme.margin.fourth};
  right: ${({ theme }) => theme.margin.fourth};
  width: ${({ theme }) => theme.margin.extended};
  height: ${({ theme }) => theme.margin.extended};
  margin: 0;
  padding: 0;
  line-height: 1;
  background-color: transparent;
  color: ${({ theme }) => theme.color.grey};
  visibility: hidden;
  opacity: 0;

  ${transitions.short('color', 'visibility', 'opacity')};

  ${Page}:hover & {
    visibility: visible;
    opacity: 1;
  }

  &:hover {
    color: ${({ theme }) => theme.color.brand};
    background-color: transparent;
  }
`;

const RefreshIcon = styled(Refresh)``;

export {
  Wrapper,
  Page,
  PageLink,
  Description,
  Placeholder,
  EyeIcon,
  RefreshButton,
  RefreshIcon,
};
