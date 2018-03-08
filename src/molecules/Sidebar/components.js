import styled from 'styled-components';
import { timingFunctions } from 'polished';
import { NavLink as _NavLink } from 'react-router-dom';
import { fontSmoothing } from '../../theme/utils';
import { Link } from '../../atoms/Link';
import SafeImage from '../SafeImage';
import { slideInUp, slideInLeft } from '../../theme/animations';

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  max-width: 15rem;
  height: 100vh;
  padding: ${({ theme }) => theme.padding.double};

  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.typeSize.body};
  font-weight: ${({ theme }) => theme.weight.normal};
  line-height: ${({ theme }) => theme.lineHeight.body};
  color: ${({ theme }) => theme.color.black};

  background-color: ${({ theme }) => theme.color.greyLight};

  ${fontSmoothing};
`;

const IconContainer = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: ${({ theme }) => theme.margin.double};
  font-size: 2rem;
`;

const NavContainer = styled.nav`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.margin.double};
`;

const NavList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const NavListItem = styled.li`
  ${slideInLeft};

  ${p =>
    Array.from(
      { length: p.items || 0 },
      (_, i) => `&:nth-child(${i + 1}){ animation-delay: ${i * 0.1}s }`,
    ).join('')};
`;

const NavLink = Link.withComponent(_NavLink).extend`
  display: inline-block;
  width: 100%;
  padding: 0.75rem 0;
  border: none;
  color: ${({ theme }) => theme.color.greyDark};
  line-height: 1;
  text-transform: capitalize;

  &.active {
    font-weight: ${({ theme }) => theme.weight.bold};
    color: ${({ theme }) => theme.color.black};
  }

  &:hover {
    color: ${({ theme }) => theme.color.brand};
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  width: 100%;
  margin-top: auto;
  padding-top: ${({ theme }) => theme.padding.double};

  ${slideInUp};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -1rem;
    width: calc(100% + 2rem);
    border-top: ${({ theme }) => theme.border.greyOpaque};
  }
`;

const ProfileImageContainer = styled.div`
  flex: 0 0 2rem;
  margin-right: ${({ theme }) => theme.margin.half};
`;

const ProfileImage = styled(SafeImage)`
  border-radius: 100%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.color.white};
`;

const ProfileDataContainer = styled.div`
  flex: 1;
  min-width: 0;
`;

const ProfileDataName = styled.span`
  display: block;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.margin.fourth};
  line-height: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProfileSignOutButton = styled.button`
  display: block;
  margin: 0;
  padding: 0;
  border: none;
  font-size: 0.625rem;
  color: ${({ theme }) => theme.color.greyDark};
  background-color: transparent;
  transition: color 0.2s ${timingFunctions('easeInOutCubic')};

  &:hover {
    color: ${({ theme }) => theme.color.error};
    cursor: pointer;
  }
`;

export {
  Wrapper,
  IconContainer,
  NavContainer,
  NavList,
  NavListItem,
  NavLink,
  ProfileContainer,
  ProfileImageContainer,
  ProfileImage,
  ProfileDataContainer,
  ProfileDataName,
  ProfileSignOutButton,
};
