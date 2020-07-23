const asyncHandler = (callback) => {
  return async (req, res, next) => {
    try {
      return await callback(req, res, next);
    } catch(err) {
      console.error(err);
      res.render("./error_handlers/error");
    }
  }
}

module.exports = asyncHandler;