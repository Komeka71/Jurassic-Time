const { ApiError } = require("../utils/ApiError.js");

// Catches requests to routes that don't exist
const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Central error handler — handles both legacy plain-Error/Mongoose errors
// (main) and ApiError instances (Timeline).
const errorHandler = (err, req, res, next) => {
  // Timeline-style operational errors
  if (err instanceof ApiError) {
    const body = { success: false, message: err.message };
    if (err.details) body.errors = err.details;
    if (process.env.NODE_ENV !== "production") body.stack = err.stack;
    return res.status(err.statusCode).json(body);
  }

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || "Something went wrong on our end.";

  // Mongoose bad ObjectId
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found.";
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  // Duplicate key (username/email/slug already exists)
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `That ${field} is already taken.`;
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};