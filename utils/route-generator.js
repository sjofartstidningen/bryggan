module.exports = function routeGenerator(app, server) {
  return (page, urlGlob) => {
    server.get(urlGlob, (req, res) => app.render(req, res, page, req.params));
  };
};
