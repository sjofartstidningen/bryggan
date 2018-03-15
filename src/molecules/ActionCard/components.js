import styled from 'styled-components';
import { borderRadius } from 'polished';
import { Button as _Button } from '../../atoms/Button';
import { Paragraph } from '../../atoms/Text';
import { transitions } from '../../theme/utils';

const Button = _Button.extend`
  display: inline-flex;
  flex-flow: column nowrap;
  align-items: stretch;
  width: 8rem;
  height: 8rem;
  border: ${({ theme }) => theme.border.greyOpaque};
  padding: 0;
  background-color: transparent;

  ${transitions.short('border')};

  &:hover {
    background-color: transparent;
    border: ${({ theme }) => theme.border.brand};
  }
`;

const Title = Paragraph.extend`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin: 0;
  padding: ${({ theme }) => theme.padding.half};
  text-align: center;
  white-space: normal;
`;

const Label = styled.span`
  display: block;
  margin-top: auto;
  border-top: ${({ theme }) => theme.border.greyOpaque};
  font-size: ${({ theme }) => theme.typeSize.label};
  line-height: 2rem;
  background-color: transparent;

  ${borderRadius('top', 0)};
  ${borderRadius('bottom', 0)};
  ${transitions.short('border-top', 'color')};

  &:hover {
    background-color: transparent;
  }

  ${Button}:hover & {
    border-top: ${({ theme }) => theme.border.brand};
    color: ${({ theme }) => theme.color.brand};
  }
`;

export { Button, Title, Label };
