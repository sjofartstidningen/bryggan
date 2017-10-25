/**
 * routeGenerator
 * 
 * routeGenerator generates a route handler for express-routes. It's a
 * conviniet way to setup custom routing for a Next.js app
 * 
 * Example:
 * server.get('/page/:username', routeGenerator(app, '/page'));
 * 
 * These pages can then, on client-side, be requested like this:
 * <Link as={`/page/${username}`} href={`/page?username=${username}`}>
 *   <a>Link to {username}</a>
 * </Link>
 * 
 * @function routeGenerator
 * @param {Object} app A next app instance
 * @param {string} page Actual page to render with leading /, e.g. "/page"
 */
module.exports = (app, page) => (req, res) =>
  app.render(req, res, page, req.params);
