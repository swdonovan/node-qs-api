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

const mealWithFoods = (mealID) => {
  return database.raw(
    'SELECT * FROM foods' +
    ' INNER JOIN meal_foods ON foods.id = meal_foods.food_id' +
    ' WHERE meal_foods.meal_id = ?', mealID
  ).then(data => data.rows)
}

const addFoodsToMeals = (meals, foods) =>{
  let index = 0;
  return meals.map((meal) => {
    let mealObj = new Meal(meal);
    mealObj.foods = foods[index];
    index++;
    return mealObj;
  });
};

module.exports = {
  allMeals,
  mealWithFoods,
  addFoodsToMeals
}
