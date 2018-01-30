import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { modularScale, lighten } from 'polished';
import { ChevronLeft, ChevronRight, ZoomOut, ZoomIn } from '../Icon';

const Wrapper = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  display: flex;
  flex-flow: row nowrap;
  align-items: baseline;
  border: 1px solid ${lighten(0.8, '#1a1a1a')};
  border-radius: 4px;
  padding: 0.5em;
  background-color: #ffffff;
  transform: translateX(-50%);
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
  opacity: ${p => p.disabled ? 0.5 : 1};
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

function PageController({
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
  onZoomDecrease,
  onZoomIncrease,
}) {
  const curr = Number.parseInt(currentPage, 10);

  return (
    <Wrapper>
      <PageIndicator order={3}>{curr} / {totalPages}</PageIndicator>

      <Button order={2} onClick={onPrevPage} disabled={curr <= 1}>
        <ChevronLeft baseline /> <Hide>Previous page</Hide>
      </Button>

      <Button order={4} onClick={onNextPage} disabled={curr >= totalPages}>
        <ChevronRight baseline /> <Hide>Next page</Hide>
      </Button>

      <Button order={1} onClick={onZoomDecrease}>
        <ZoomOut baseline /> <Hide>Decrease zoom</Hide>
      </Button>

      <Button order={5} onClick={onZoomIncrease}>
        <ZoomIn baseline /> <Hide>Increase zoom</Hide>
      </Button>
    </Wrapper>
  );
}

PageController.propTypes = {
  currentPage: PropTypes.string.isRequired,
  totalPages: PropTypes.number.isRequired,
  onNextPage: PropTypes.func.isRequired,
  onPrevPage: PropTypes.func.isRequired,
  onZoomDecrease: PropTypes.func.isRequired,
  onZoomIncrease: PropTypes.func.isRequired,
};

export default PageController;
