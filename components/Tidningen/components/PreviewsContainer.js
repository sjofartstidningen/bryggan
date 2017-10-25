import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';

const PreviewsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.zoom}, 1fr);
  grid-gap: ${props => props.theme.size(0)}rem;
  padding: ${props => props.theme.size(0)}em;
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
        padding-right: ${props.theme.size(0) / 2}em;
      }

      & > *:nth-child(even) {
        padding-left: ${props.theme.size(0) / 2}em;
      }
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
