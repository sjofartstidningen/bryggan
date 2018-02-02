import styled from 'styled-components';
import { modularScale, lighten } from 'polished';
import { ax } from '../../styles';

const Wrapper = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  display: flex;
  flex-flow: row nowrap;
  align-items: baseline;
  border: 1px solid ${p => lighten(0.8, ax('color.black')(p))};
  border-radius: 4px;
  padding: 0.5em;
  color: ${ax('color.black')};
  background-color: ${ax('color.white')};
  transform: translateX(-50%);
  user-select: none;
`;

const PageIndicator = styled.p`
  order: ${p => p.order || 0};
  margin: 0 1em;
  font-size: ${modularScale(0)};
  line-height: 1;
`;

const Button = styled.button`
  order: ${p => p.order || 0};
  margin: 0 1em;
  border: none;
  padding: 0.5em;
  font-size: ${modularScale(0)};
  line-height: 1em;
  opacity: ${p => (p.disabled ? 0.5 : 1)};
  cursor: pointer;
`;

const Hide = styled.span`
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
`;

export { Wrapper, PageIndicator, Button, Hide };
