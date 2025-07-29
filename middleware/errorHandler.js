const { NotFoundError, ValidationError } = require('../utils/errorClasses');

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;

  if (err instanceof NotFoundError) statusCode = 404;
  else if (err instanceof ValidationError) statusCode = 400;

  res.status(statusCode).json({
    error: err.name,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandler;
