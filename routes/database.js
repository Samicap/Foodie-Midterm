
// const { Pool } = require('pg');


// const pool = new Pool({
//   user: 'vagrant',
//   password: '123',
//   host: 'localhost',
//   database: 'midterm' // do we all need to have the psql database have the same name?
// });

// pool.connect()
// .then (console.log("connected"))
// .catch (error => console.log("error", error));

// const getDishes = function(dish) {
//   return pool.query(`
//   SELECT *
//   FROM dishes
//   `, [dish])
//   .then(res => {
//     const dish = res.rows[0];
//     return dish;
//   });
// };
// exports.getDishes = getDishes;
