//load in dependencies
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cons = require('consolidate')
const dust = require('dustjs-helpers')
// const pg = require('pg')
const app = express()
const { Pool, Client } = require('pg')

//db connect string
const connectionString = "postgres://victory:2020ada@localhost/recipebookdb"

//create pool for client
const pool = new Pool({ connectionString })

//assign dust engine to .dust files
app.engine('dust', cons.dust)

//set default  Ext .dust
app.set('view engine', 'dust')
app.set('views', __dirname + '/views')

//set public folder(middleware)
app.use(express.static(path.join(__dirname, 'public')))

//body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  //connect postgress
  pool.connect((err, client, done) => {
    if (err) {
      return console.error('Error fetching client from pool', err)
    }
    client.query('SELECT * FROM recipes', (err, result) => {
      if (err) {
        console.error('Error running query', err)
      }
      res.render('index', { recipes: result.rows })
      done()
    })
  })
})

//server 
app.listen(3000, () => {
  console.log('Server Started On Port 3000')
})