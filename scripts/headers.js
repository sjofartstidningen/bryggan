module.exports = {
  'Content-Security-Policy-Report-Only': [
    `default-src 'self'`,
    `script-src 'self' https://*.firebaseio.com/ https://unpkg.com`,
    `style-src 'self' 'unsafe-inline' blob: https://fonts.googleapis.com/`,
    `font-src 'self' https://fonts.gstatic.com/`,
    `img-src 'self' data: blob: https://content.dropboxapi.com/ https://www.gravatar.com/avatar/`,
    `child-src 'self' blob: data:`,
    `connect-src 'self' blob: wss://*.firebaseio.com/ https://*.googleapis.com/ https://*.dropboxapi.com/`,
    `frame-src 'self' https://*.firebaseio.com/`,
    `object-src 'none'`,
    `worker-src 'self' blob:`,
    `report-uri https://sjofartstidningen.report-uri.com/r/d/csp/reportOnly`,
  ].join('; '),
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer-when-downgrade',
  'Expect-CT':
    'max-age=0, report-uri="https://sjofartstidningen.report-uri.com/r/d/ct/reportOnly"',
};
