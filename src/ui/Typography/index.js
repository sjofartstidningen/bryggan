import styled from 'styled-components';
import { modularScale, lighten } from 'polished';

const MainHeading = styled.h1`
  margin: 0;
  margin-bottom: ${modularScale(-1)};
  font-family: ${props => props.theme.font.serif};
  font-weight: 600;
  font-size: ${modularScale(4)};
  line-height: ${modularScale(1)};
  text-transform: capitalize;
  color: ${props => props.theme.color[props.color || 'black']};
`;

const SubpageTitle = MainHeading.withComponent('h2').extend`
  margin-bottom: ${modularScale(2)};
  font-size: ${modularScale(3)};
`;

const SectionHeader = MainHeading.withComponent('h3').extend`
  font-size: ${modularScale(2)};
  font-style: italic;
`;

const SubSectionHeading = MainHeading.withComponent('h4').extend`
  font-size: ${modularScale(1)};
`;

const BodyContent = styled.p`
  width: 100%;
  max-width: 450px;
  margin: 0;
  margin-bottom: ${modularScale(0)};
  font-family: ${props => props.theme.font.serif};
  font-size: ${modularScale(0)};
  line-height: ${modularScale(1)};
`;

const MetaContent = BodyContent.extend`
  font-size: ${modularScale(-1)};
  color: ${props => lighten(0.5, props.theme.color.black)};
`;

export {
  MainHeading,
  SubpageTitle,
  SectionHeader,
  SubSectionHeading,
  BodyContent,
  MetaContent,
};
