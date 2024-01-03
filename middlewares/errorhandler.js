module.exports = function (error, req, res, next) {
  let status = 500;
  let message = "Internal Server Error";

  switch (error.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = error.errors[0].message;
      break;
    case "EmailPasswordRequired":
      status = 400;
      message = "Email And Password Are Required";
      break;
    case "InvalidToken":
    case "JsonWebTokenError":
      status = 401;
      message = "Invalid Token";
      break;
    case "InvalidUser":
      status = 401;
      message = "Invalid Email Or Password";
      break;
    case "Forbidden":
      status = 403;
      message = "You're Not Authorized";
      break;
    case "NotFound":
      status = 404;
      message = "Article Not Found";
      break;
  }
  res.status(status).json({
    message: message,
  });
};
