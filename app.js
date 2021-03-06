//load in dependencies
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cons = require('consolidate')
const dust = require('dustjs-helpers')
// const pg = require('pg')
const app = express()
const { Pool, Client } = require('pg')

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

// DB connect
const client = new Client({
  user: "victory",
  host: "localhost",
  database: "recipebookdb",
  password: "2020ada",
  port: 5432
});

client.connect();

//get request to render all rows in the db
app.get('/', (req, res) => {
  client
    .query("select * from recipes")
    .then(result => res.render("index", { recipes: result.rows }))
    .catch(err => console.error(err));
})

//post request to insert into the db
app.post('/add', (req, res) => {
  client
    .query(
      "INSERT INTO recipes(name, ingredients, directions) VALUES($1, $2, $3)",
      [req.body.name, req.body.ingredients, req.body.directions]
    )
    .then(res.redirect("/"))
    .catch(err => console.error(err));
})

//deleting a recipe from the db
app.delete('/delete/:id', (req, res) => {
  client
    .query(
      "DELETE FROM recipes WHERE id = $1",
      [req.params.id])
    .then(res.sendStatus(200))
    .catch(err => console.error(err))
})

app.post('/edit', (req, res) => {
  client
    .query(
      "UPDATE recipes SET name = $1, ingredients = $2, directions = $3 WHERE id = $4",
      [req.body.name, req.body.ingredients, req.body.directions, req.body.id])
    .then(res.redirect("/"))
    .catch(err => console.error(err))
})
//server 
app.listen(3000, () => {
  console.log('Server Started On Port 3000')
})