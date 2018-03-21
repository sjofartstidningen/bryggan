import styled from 'styled-components';
import { Paragraph } from '../../atoms/Text';
import { Button } from '../../atoms/Button';
import { transitions } from '../../theme/utils';
import { slideInDown } from '../../theme/animations';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 16rem;
  margin: 0 auto;

  ${slideInDown};
`;

const Control = Button.extend`
  flex: 1;
  margin: 0;
  padding: 0;
  font-size: ${({ theme }) => theme.typeSize.body};
  line-height: 3rem;
  color: ${({ theme }) => theme.color.greyDark};
  background-color: transparent;

  ${transitions.short('color')};

  &:hover {
    color: ${({ theme }) => theme.color.brand};
    background-color: transparent;
  }

  &:disabled {
    color: ${({ theme }) => theme.color.grey};
  }
`;

const Indicator = Paragraph.withComponent('span').extend`
  flex: 0;
  width: auto;
  margin: 0;
  padding: 0 ${({ theme }) => theme.padding.half};
  font-size: ${({ theme }) => theme.typeSize.label};
  text-align: center;
  user-select: none;
`;

export { Wrapper, Control, Indicator };
