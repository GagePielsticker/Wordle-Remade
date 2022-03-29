/* Dependencies */
const express = require('express')
const app = express()
const helmet = require('helmet')
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const ejs = require('ejs')

/* Configure our rest client */
const client = {
  settings: require('./settings/settings.json'),
  appid: process.env.APPID || 1,
  server: require('http').createServer(app)
}


app.use(helmet())
app.use(morgan('common'))
app.set('trust proxy', 1)
app.use(bodyParser.urlencoded({ extended: true }))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public'))) // Serve our static files
app.use(bodyParser.json())

/* Routing */

// Public endpoints
app.use('/', require('./routes/index.js')(client))

/* catchall for authenticated but not found error handling */
app.get('*', (req, res) => {
  res.status(404).send('Endpoint does not exist.')
})

/* Listen on http */
client.server.listen(client.settings.port, () => {
  console.log(`API instance :: ${client.appid} :: port :: ${client.settings.port}!`)
})
