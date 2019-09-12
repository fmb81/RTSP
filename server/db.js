const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Stream = require('node-rtsp-stream')
const ffmpeg_static = require('ffmpeg-static')
const Pool = require('pg').Pool
const { pg_config, saltRounds, tokenKey } = require('./config.js')
const { validateUser, validateLoginRequest, validateUrlRequest } = require('./schema')

const pool = new Pool(pg_config)

const createUser = async (request, response) => {
  try {
    const valid = validateUser(request.body);
    if (!valid) {
      return response.status(422).json(validateUser.errors)
    }

    const { email, firstName, lastName, password } = request.body
    const users = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    if (users.rows.length) {
      return response.status(422).json({
        "keyword": "unique",
        "params": {
          "uniqueProperty": "email"
        },
        "message": `should unique property email`
      })
    }

    const hash = await bcrypt.hash(password, saltRounds)
    const result = await pool.query(
      'INSERT INTO users (email, first_name, last_name, password) VALUES ($1, $2, $3, $4)',
      [email, firstName, lastName, hash]
    )
    response.status(201).json(result)
  } catch (err) {
    console.error(err)
    response.status(400).send()
  }
}

const authenticationUser = async (request, response) => {
  try {
    const valid = validateLoginRequest(request.body);
    if (!valid) {
      return response.status(422).json(validateLoginRequest.errors)
    }

    const { email, password } = request.body
    const users = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    if (!users.rows.length) {
      return response.status(401).json({})
    }

    const match = await bcrypt.compare(password, users.rows[0].password);
    if (!match) {
      return response.status(401).json({})
    }

    const token = jwt.sign({ id: users.rows[0].id }, tokenKey);
    response.status(200).json({ data: { token, ...users.rows[0] } })
  } catch (err) {
    console.error(err)
    response.status(400).send()
  }
}

const addUrl = async (request, response) => {
  try {
    const { url } = request.body
    const { userId } = request
    const valid = validateUrlRequest(request.body);
    if (!valid) {
      return response.status(422).json(validateUser.errors)
    }
    const result = await pool.query(
      'INSERT INTO urls (user_id, url, created_at) VALUES ($1, $2, $3)',
      [userId, url, new Date().getTime()]
    )
    response.status(200).json({ data: { url } })
  } catch (err) {
    console.error(err)
    response.status(400).send()
  }
}

const getUrls = async (request, response) => {
  try {
    const { userId, query = {} } = request
    const { offset = 0, limit = 10 } = query
    const allRows = await pool.query('SELECT * FROM urls WHERE user_id = $1', [userId])
    const urls = await pool.query('SELECT * FROM urls WHERE user_id = $1 ORDER BY created_at LIMIT $2 OFFSET $3', [userId, limit, offset])
    response.status(200).json({ data: urls.rows, meta: { total: allRows.rows.length } })
  } catch (err) {
    console.error(err)
    response.status(400).send()
  }
}

let stream = null
const streamPort = 7000
const delayBeforConnection = 5000

const streamingUrl = async (request, response) => {
  try {
    const { params } = request
    const { recordId } = params
    const record = await pool.query('SELECT * FROM urls WHERE record_id = $1 ', [recordId])
    if (!record.rows.length) {
      return response.status(404).send()
    }
    const url = record.rows[0].url
    if (stream) {
      stream.stop()
    }
    stream = new Stream({
      name: recordId,
      streamUrl: url,
      wsPort: streamPort,
      ffmpegOptions: {
        '-stats': '',
        '-r': 30
      },
    })
    response.status(200).json({ data: { port: streamPort, delay: delayBeforConnection } })
  } catch (err) {
    console.error(err)
    response.status(400).send()
  }
}

module.exports = {
  createUser,
  authenticationUser,
  addUrl,
  getUrls,
  streamingUrl,
}