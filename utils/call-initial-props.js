export default (Component, context) => {
  if (typeof Component.getInitialProps !== 'function') return {};
  return Promise.resolve(context).then(Component.getInitialProps);
};
