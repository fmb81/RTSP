const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });

const userSchema = {
  "properties": {
    "firstName": { "type": "string" },
    "lastName": { "type": "string" },
    "email": { "type": "string", "format": "email" },
    "password": { "type": "string", "maxLength": 20, "minLength": 6 },
  },
  "required": ["firstName", "lastName", "email", "password"]
};
const validateUser = ajv.compile(userSchema);

const loginRequestSchema = {
  "properties": {
    "email": { "type": "string", "format": "email" },
    "password": { "type": "string" },
  },
  "required": ["email", "password"]
};
const validateLoginRequest = ajv.compile(loginRequestSchema);

const urlRequestSchema = {
  "properties": {
    "url": {
      "type": "string",
      "pattern": "(https?|rtsp|qvmc|rtmp):\/\/(?:([^\s@\/]+?)[@])?([^\s\/:]+)(?:[:]([0-9]+))?(?:(\/[^\s?#]+)([?][^\s#]+)?)?([#]\S*)?",
    },
  },
  "required": ["url"]
}
const validateUrlRequest = ajv.compile(urlRequestSchema);

module.exports = {
  validateUser,
  validateLoginRequest,
  validateUrlRequest,
}