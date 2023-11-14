const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM orders LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function create(orders) {
  const result = await db.query(
    `INSERT INTO orders 
    (product_id, count, cost) 
    VALUES 
    ('${orders.product_id}', ${orders.count}, ${orders.cost})`
  );

  let message = "Error in creating order";

  if (result.affectedRows) {
    message = "Order added succesfully";
  }
  return { message };
}

module.exports = {
  getMultiple,
  create,
};
