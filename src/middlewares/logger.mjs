const logger = (req, res, next) => {
  console.log('logger', req.path, req.method);
  next();
};
export default logger;
