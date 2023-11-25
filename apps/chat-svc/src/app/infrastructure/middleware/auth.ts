import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authToken =
    req.body.token || req.query.token || req.headers["authorization"];
  const token = authToken?.split('bearer ')[1]
  console.log('token: ', token, process.env?.JWT_TOKEN)

  if (!token) {
    return res.status(403).send({
      uptime: process.uptime(),
      errors: 'A token is required for authentication',
      date: new Date()
    });
  }
  try {
    const decoded = jwt.verify(token, process.env?.JWT_TOKEN);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({
      uptime: process.uptime(),
      errors: 'Invalid token',
      date: new Date()
    });
  }
  return next();
};

export default verifyToken;
