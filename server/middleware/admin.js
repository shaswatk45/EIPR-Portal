// Admin middleware: always passes through (no role check needed for demo)
const admin = (req, res, next) => {
  next();
};

module.exports = { admin };
