import ms from 'modular-scale';

export default {
  color: {
    black: 'rgba(0, 0, 0, 1)',
    grey: 'rgba(153, 153, 153, 1)',
    white: 'rgba(255, 255, 255, 1)',
  },
  size: step => ms(step, { ratio: 1.5, base: 1, decimals: 2 }),
  font: {
    serif:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  },
  pageAspectRatio: 275 / 210,
};
