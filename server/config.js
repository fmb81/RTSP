const pg_config = {
  user: process.env.DB_USER || 'docker',
  host: process.env.DB_HOST || '127.0.0.1',
  database: process.env.DB_NAME || 'api',
  password: process.env.DB_PASSWORD || 'docker',
  port: process.env.DB_PORT || 5433,
}

module.exports = {
  pg_config,
  saltRounds: 10,
  tokenKey: 'vision'
}