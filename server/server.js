const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const fs = require('fs')
const path = require('path')
const db = require('./db')
const { mustBeAuth } = require('./middleware')
const app = express()
const port = 3000



app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.post('/signin', db.authenticationUser)
app.post('/signup', db.createUser)
app.get('/urls', mustBeAuth, db.getUrls)
app.post('/urls', mustBeAuth, db.addUrl)
app.get('/streaming/:recordId', mustBeAuth, db.streamingUrl)
app.use('*', (req, res) => {
  const file = path.resolve(__dirname + '/../dist' + req.baseUrl) // @todo unsafe
  fs.access(file, fs.constants.F_OK, (err) => {
    if (err || file === path.resolve(__dirname + '/../dist')) { // error or no path provided - send index.html
      res.sendFile(path.resolve(__dirname + '/../dist/index.html'))
    } else {
      res.sendFile(file)
    }
  });
})
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})