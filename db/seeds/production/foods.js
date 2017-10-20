exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY')
  .then(function() {
    return Promise.all([
      knex.raw(
        'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
        ["Ice Cream", 100, new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
        ["Fries", 200, new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
        ["Burgers", 300, new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
        ["Pizza", 175, new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
        ["Cheese", 50, new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
        ["Gum", 10, new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
        ["Cashews", 75, new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
        ["Mt. Dew", 150, new Date, new Date]
      )
    ])
  })
}
