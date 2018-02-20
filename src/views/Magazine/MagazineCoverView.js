// @flow
import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import LazyImage from '../../components/LazyImage';
import { colorMixin, backgroundColorMixin, getColor } from '../../styles/color';
import { typeMixin } from '../../styles/type';
import { transitionMixin } from '../../styles/utils';
import { Eye } from '../../components/Icon';
import type { MagazineEntry } from '../../types';

const ListWrapper = styled.ul`
  display: flex;
  flex-flow: row wrap;
  margin: 0;
  padding: 1rem;
  list-style: none;

  ${colorMixin('text01')};
`;

const ListItem = styled.li`
  width: calc(100% / 4 - ${p => (p.pages ? 0.5 : 1)}rem);
  margin: 0.5rem;
  border: 1px solid ${getColor('ui04')};
  padding: 0.5rem;

  ${backgroundColorMixin('ui02')};

  ${p =>
    p.pages &&
    css`
      &:nth-child(even) {
        margin-right: 0;
        margin-left: 0.5rem;
      }

      &:nth-child(odd) {
        margin-right: 0.5rem;
        margin-left: 0;
        border-left-color: transparent;
      }

      &:first-child {
        margin-left: calc(100% / 4);
        border-left-color: 1px solid ${getColor('ui04')};
      }
    `};
`;

const fadeIn = keyframes`
  from {
    opacity: 0.01;
  }

  to {
    opacity: 0.99;
  }
`;

const ListItemImage = styled.img`
  display: block;
  width: 100%;
  animation-name: ${fadeIn};
  animation-duration: 0.2s;
  animation-timing-function: ease;
`;

const ListItemCaption = styled.p`
  margin: 0;
  text-align: center;
  ${typeMixin('caption')};
  ${colorMixin('text02')};
`;

const ListItemLink = styled(Link)`
  position: relative;
  display: inline-block;
  width: 100%;
  padding: 0.5rem 0 0;
  text-decoration: none;

  ${colorMixin('text02')};
  ${transitionMixin('color')};

  &:hover {
    ${colorMixin('brand02')};
  }
`;

const ListItemEye = styled(Eye)`
  position: absolute;
  opacity: 0.01;
  transform: translate(150%, 1px);
  ${transitionMixin('transform', 'opacity')};

  ${ListItemLink}:hover & {
    opacity: 0.99;
    transform: translate(5px, 1px);
  }
`;

type Props = {
  covers: Array<MagazineEntry>,
  pages?: boolean,
};

function MagazineCoverView({ covers, pages = false }: Props = {}) {
  return (
    <ListWrapper>
      {covers.map(cover => (
        <ListItem key={cover.id} pages={pages}>
          <Link to={cover.url}>
            <LazyImage
              src={cover.cover}
              render={props =>
                !props.loaded ? (
                  <Loader ratio={290 / 225} />
                ) : (
                  <ListItemImage
                    src={props.src}
                    onLoad={props.revokeObjectURL}
                    alt=""
                  />
                )
              }
            />
          </Link>
          <ListItemCaption>
            <ListItemLink to={cover.url}>
              {cover.caption}
              <ListItemEye baseline />
            </ListItemLink>
          </ListItemCaption>
        </ListItem>
      ))}
    </ListWrapper>
  );
}

export default MagazineCoverView;
