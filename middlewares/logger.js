const { logEvent } = require('../services/logService');

function loggingMiddleware(req, res, next) {
  res.on("finish", () => {
    const status = res.statusCode;
    const msg = `${req.method} ${req.originalUrl} => ${status}`;

    if (status >= 500) {
      logEvent("backend", "fatal", "middleware", msg);
    } else if (status >= 400) {
      logEvent("backend", "error", "middleware", msg);
    } else {
      logEvent("backend", "info", "middleware", msg);
    }
  });

  next();
}

module.exports = loggingMiddleware;
