const isAuthenticated = (req, res, next) => {
    const {token} = req.headers; // Obtener el token del encabezado "Authorization"
  
    if (req.session.user && req.session.user.token === token) {
      next();
    } else {
      res.status(401).json({ message: 'Debe iniciar sesión' });
    }
  };
  
  module.exports = isAuthenticated;