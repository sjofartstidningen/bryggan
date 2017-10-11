/**
 * routeGenerator
 * 
 * routeGenerator returns a function which in turn can be used to register 
 * custom routes on the server to be used in a Next-app.
 * 
 * Example:
 * 
 * const registerRoute = routeGenerator(app, server);
 * registerRoute('/page', '/page/:username');
 * 
 * These pages can then, on client-side, be requested like this:
 * <Link as={`/page/${username}`} href={`/page?username=${username}`}>
 *   <a>Link to {username}</a>
 * </Link>
 * 
 * @function routeGenerator
 * @param {Object} app A next app instance
 * @param {Object} server An express server instance
 * @return {Function}
 */
module.exports = function routeGenerator(app, server) {
  /**
   * @function
   * @param {string} page A string with a leading slash (/) to indicate which 
   * page to actually render
   * @param {string} urlGlob A express-styled url to match against route
   * request, e.g. "/page/:username"
   */
  return (page, urlGlob) => {
    server.get(urlGlob, (req, res) => app.render(req, res, page, req.params));
  };
};
