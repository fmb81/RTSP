const jwt = require('jsonwebtoken');
const { tokenKey } = require('./config.js')

const mustBeAuth = (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    const decoded = jwt.verify(token.split(" ")[1], tokenKey);
    const { id } = decoded
    if (!id) {
      throw Error()
    }
    req.userId = id
    next()
  } catch (err) {
    res.status(403).send();
  }
}

module.exports = {
  mustBeAuth,
}
