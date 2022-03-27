
'use strict'

/* Dependencies */
const express = require('express')
const router = express.Router()

module.exports = client => {
  /* Our main index endpoint */
  router.get('/', (req, res) => {
    res.status(200).send('Welcome to the api.')
  })

  /* Our healthcheck endpoint */
  router.get('/healthcheck', (req, res) => {
    res.status(200)
  })

  /* Generates Random Word */
  router.get('/generate', (req, res) => {
    client.generateWord()
      .then(word => res.status(200).json({ word }))
      .catch(() => res.status(500))
  })

  /* Checks word and returns 0, 1, or 2 for each letter */
  router.post('/check', (req, res) => {
    client.checkWord(req.body.attempt.toLowerCase())
      .then(e => res.status(200).json({ attempt: e }))
      .catch(() => res.status(500))
  })

  return router
}
