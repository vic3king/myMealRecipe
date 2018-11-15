//load in dependencies
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cons = require('consolidate')
const dust = require('dustjs-helpers')
const pg = require('pg')
const app = express()

//db connect string
const connect = "postgres://victory:2020ada@localhost/recipebookdb"

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
  res.render('index')
})

//server 
app.listen(3000, () => {
  console.log('Server Started On Port 3000')
})