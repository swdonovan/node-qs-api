const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

const createFood = (food) => {
  return database.raw(
    'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
    food
  )
};

const allFoods = () => {
  return database.raw("SELECT * FROM foods")
};

const findFood = (id) => {
  return database.raw("SELECT * FROM foods WHERE id =" + id)
};
const destroyAll = () => {
  return database.raw('TRUNCATE foods RESTART IDENTITY')
};
const addFood = (food) => {
  console.log(food)
  return database.raw("INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?) RETURNING id",
  [food.name, food.calories, new Date, new Date])
};
const updateFood = (food, id) => {
  const attrs = [food.name, food.calories, new Date, id]
  return database.raw("UPDATE foods SET name = ?, calories = ?, updated_at = ? WHERE id = ? RETURNING id, name, calories",
  attrs)
};
const deleteFood = (id) => {
  return database.raw('DELETE FROM foods WHERE id = ?', [id])
};

module.exports = {
  createFood,
  allFoods,
  destroyAll,
  findFood,
  addFood,
  updateFood,
  deleteFood
}
