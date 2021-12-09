const asyncHandler = (callback) => {
  return async (req, res, next) => {
    try {
      return await callback(req, res, next);
    } catch(err) {
      res.status(404).render('./error_handlers/404');
    }
  }
}
export default asyncHandler;
