function permitirRoles(...roles) {
  return (req, res, next) => {
    const role = req.usuario?.role;
    if (!role || !roles.includes(role)) {
      return res.status(403).json({ error: 'Acceso denegado' });
    }
    return next();
  };
}

module.exports = { permitirRoles };
