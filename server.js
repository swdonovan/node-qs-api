const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)
const path = require("path");
const foodRoutes = require('./routes/food-routes')
const mealRoutes = require('./routes/meal-routes')
const Foods = require('./models/foods')

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Quantified Self API'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname+'/welcome.html'))
})

app.get('/api/v1/foods', function(request, response){
  Foods.allFoods().then((data) => {
    if (data.rowCount == 0) { return response.sendStatus(404) }

    response.json(data.rows)
  })
})
app.get('/api/v1/foods/:id', function(request, response){
  var id = request.params.id

  Foods.findFood(id).then((data) => {
    if (data.rowCount == 0) { return response.sendStatus(404) }

    response.json({id: data.rows[0].id,
                 name: data.rows[0].name,
             calories: data.rows[0].calories,
           created_at: data.rows[0].created_at,
           updated_at: data.rows[0].updated_at
    })
  })
})

app.post('/api/v1/foods', function(request, response){
  const food  = request.body;

  if (food.name == '' || food.calories == '') {
    return response.status(422).send({ error: "Make sure all properties are provided!"})
  }

  Foods.addFood(food).then((data) => {
    food.id = data.rows[0].id
    response.status(201).json(food)
  })
})

app.patch('/api/v1/foods/:id', function(request, response){
  const id = request.params.id
  const food  = request.body
  if (food.name == '' || food.calories == '') {
    return response.status(422).send({ error: "Make sure all properties are provided!"})
  }

  Foods.updateFood(food, id).then((data) => {
    response.status(201).json(data.rows[0])
  })
})

app.delete('/api/v1/foods/:id', function(request, response){
  const id = request.params.id
  
  Foods.deleteFood(id).then((data) => {
    response.status(201).json(id)
  })
})

if(!module.parent) {
  app.listen(app.get('port'), function() {
    console.log(app.locals.title + " is running on " + app.get('port') + ".")
  })
}
// app.use("/api/v1/foods", foodRoutes)
// app.use("/api/v1/meals", mealRoutes)

module.exports = app
