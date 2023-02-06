import { ErrorRequestHandler, RequestHandler } from "express";

export const logErrors: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  next(err);
};

export const clientErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  if (req.xhr) {
    res.status(500).send({ error: "Something failed!" });
  } else {
    next(err);
  }
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500);
  res.render("error", { error: err });
};
