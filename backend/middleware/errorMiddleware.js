const notFound = (req, res, next) => {
  res.status(404).json({
    message: `Route not found: ${req.originalUrl}`
  });
};

const errorHandler = (err, req, res, next) => {
  console.log(err);

  res.status(500).json({
    message: err.message || "Server Error"
  });
};

module.exports = {
  notFound,
  errorHandler
};