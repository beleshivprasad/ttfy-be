const successResponse = (res, message, data, status = 200) => {
  res
    .json({
      success: true,
      message,
      data,
    })
    .status(status);
};
const errorResponse = (res, message, errors, status = 422) => {
  res
    .json({
      success: false,
      message,
      errors,
    })
    .status(status);
};

module.exports = {
  successResponse,
  errorResponse,
};
