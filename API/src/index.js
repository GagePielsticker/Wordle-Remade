/* Dependencies */
const express = require('express')
const app = express()
const helmet = require('helmet')
const bodyParser = require('body-parser')
const morgan = require('morgan')

/* Configure our rest client */
const client = {
  apiSettings: require('./settings/settings.json'),
  appid: process.env.APPID || 1,
  server: require('http').createServer(app)
}

app.use(helmet())
app.use(morgan('common'))
app.set('trust proxy', 1)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/* Require our custom libs and pass our client */
require('./library/database.js')(client)
require('./library/lib.js')(client) // Auto Routines and functions (cronjobs etc)
require('./library/cronjobs.js')(client)

/* Routing */

// Public endpoints
app.use('/', require('./routes/public/index.js')(client))

/* catchall for authenticated but not found error handling */
app.get('*', (req, res) => {
  res.status(404).send('Endpoint does not exist.')
})

/* Listen on http */
client.server.listen(client.apiSettings.api.port, () => {
  console.log(`API instance :: ${client.appid} :: port :: ${client.apiSettings.api.port}!`)

  // Connection to mongodb
  console.log('Attempting to connect to database')
  client.connectDatabase()
  .then(() => console.log('Connected database.'))
  .catch(e => {
    console.log(`Failed to connect to database :: ${e}`)
    process.exit(1)
  })
})
