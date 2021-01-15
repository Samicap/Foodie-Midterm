module.exports = (db) => {
  const createOrderId = function (number) {
    return db.query(`INSERT INTO orders (user_phone_number)
                    VALUES($1)
                    RETURNING *
                    ;`, [number])
  }

  return { createOrderId };
};


// what params should this function take in in order to insert those values into the query?

// what to put into VALUES??? Accepts array arguments?  [$1, $2]


// example:
// return pool.query(`
// INSERT INTO users (name, email, password)
// VALUES ($1, $2, $3)
// RETURNING *;
// `, [user.name, user.email, user.password])
// .then(res => res.rows[0]);
// }
