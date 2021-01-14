module.exports = (db) => {
  const createDishOrder = function (quantity, order_id, dish_id) {
    console.log(typeof quantity, typeof order_id, typeof dish_id);
    return db.query(`INSERT INTO dish_orders (quantity, order_id, dish_id)
                    VALUES($1, $2, $3)
                    RETURNING *
                    ;`, [quantity, order_id, dish_id])
  }

  return { createDishOrder };
};


// const addUser =  function(user) {
//   return pool.query(`
//   INSERT INTO users (name, email, password)
//   VALUES ($1, $2, $3)
//   RETURNING *;
//   `, [user.name, user.email, user.password])
//   .then(res => res.rows[0]);
// }
