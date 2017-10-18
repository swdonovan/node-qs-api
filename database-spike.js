const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

database.raw(
  'SELECT * FROM foods' +
  ' INNER JOIN meal_foods ON foods.id = meal_foods.food_id' +
  ' WHERE meal_foods.meal_id = 2'
)
  .then((data) => {
    console.log(data.rows)
    process.exit()
  })
