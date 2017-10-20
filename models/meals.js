const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class Meal {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.foods = []
  }
}

const allMeals = () => {
  return database.raw('SELECT * FROM meals')
  .then(data => data.rows)
}

const findMeal = (id) => {
  return database.raw('SELECT * FROM meals WHERE id =' + id)
  .then(data => data.rows)
}

const mealsFoods = (mealID) => {
  return database.raw(
    'SELECT foods.name, foods.calories, food_id AS id FROM foods' +
    ' INNER JOIN meal_foods ON foods.id = meal_foods.food_id' +
    ' WHERE meal_foods.meal_id = ?', mealID
  ).then(data => data.rows)
}

const addFoodToMealDB = (meal_id, food_id) => {
  return database.raw("INSERT INTO meal_foods (food_id, meal_id, created_at, updated_at) VALUES (?, ?, ?, ?)",
  [food_id, meal_id, new Date, new Date])
};

const deleteFoodFromMealDB = (meal_id, food_id) => {
  return database.raw("DELETE FROM meal_foods WHERE meal_foods.food_id = ? AND meal_foods.meal_id = ?",
    [food_id, meal_id]
  )
};


const addFoodsToMealObject = (meals, foods) =>{
  let index = 0;
  return meals.map((meal) => {
    console.log(foods)
    let mealObject = new Meal(meal);
    mealObject.foods = foods[index];
    index++;
    return mealObject;
  });
};

module.exports = {
  allMeals,
  findMeal,
  mealsFoods,
  addFoodsToMealObject,
  addFoodToMealDB,
  deleteFoodFromMealDB
}
