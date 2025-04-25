// middleware/authorizeRole.js

const authorizeRole = (...roles) => {
    return (req, res, next) => {
      const user = req.session.user;
      if (!user || !roles.includes(user.role)) {
        return res.status(403).json({ message: "Accès interdit : rôle insuffisant" });
      }
      next();
    };
  };
  
  module.exports = { authorizeRole };
  