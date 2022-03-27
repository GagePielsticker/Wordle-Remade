'use strict'

/* Dependencies */
const express = require('express')
const router = express.Router()

module.exports = client => {
  /* Our main index endpoint */
  router.get('/', (req, res) => {
    res.status(200).render('index')
  })

  return router
}