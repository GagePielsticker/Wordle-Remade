'use strict'

/* Dependencies */
const express = require('express')
const router = express.Router()
const axios = require('axios')

module.exports = client => {
  /* Our main index endpoint */
  router.get('/', (req, res) => {
    res.status(200).render('index')
  })

  /* Calls our api with user submitted word */
  router.post('/check', (req, res) => {
    axios.post(`http://${client.settings.api_ip}:${client.settings.api_port}/check`, {
      attempt: req.body.attempt
    }, {
      timeout: 2000
    })
    .then(r => res.json(r.data))
    .catch(e => console.log(e))
  })

  return router
}
