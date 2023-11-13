const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM products LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function create(products) {
  const result = await db.query(
    `INSERT INTO products 
    (category_id, name, price) 
    VALUES 
    ('${products.category_id}', ${products.name}, ${products.price})`
  );

  let message = "Error in creating product";

  if (result.affectedRows) {
    message = "Product added succesfully";
  }

  return { message };
}

async function update(id, products) {
  const result = await db.query(
    `UPDATE products 
    SET category_id=${products.category_id},  name="${products.name}", price=${products.price} 
    WHERE id=${id}`
  );

  let message = "Error in updating product";

  if (result.affectedRows) {
    message = "Product updated successfully";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(`DELETE FROM products WHERE id=${id}`);

  let message = "Error in deleting product";

  if (result.affectedRows) {
    message = "Product deleted successfully";
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
};
