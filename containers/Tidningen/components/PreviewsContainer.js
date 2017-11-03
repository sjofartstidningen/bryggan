import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { modularScale } from 'polished';
import media from '../../../styles/media';

const PreviewsContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: ${modularScale(0)};
  padding: ${modularScale(0)};
  z-index: ${props => props.theme.zIndex.zero};

  ${props =>
    props.bind &&
    props.zoom > 1 &&
    css`
      grid-column-gap: 0;

      & > *:last-child {
        display: none;
      }

      & > *:nth-child(1) {
        grid-column-start: 2;
      }

      & > *:nth-child(odd) {
        padding-right: calc(${modularScale(0)} / 2);
      }

      & > *:nth-child(even) {
        padding-left: calc(${modularScale(0)} / 2);
      }
    `};

  ${media.notSmall`
    grid-template-columns: repeat(${props => props.zoom}, 1fr);
  `};
`;

PreviewsContainer.propTypes = {
  zoom: PropTypes.number.isRequired,
  bind: PropTypes.bool,
};

const mapStateToProps = state => ({
  zoom: state.tidningen.zoom,
});

export default connect(mapStateToProps)(PreviewsContainer);
