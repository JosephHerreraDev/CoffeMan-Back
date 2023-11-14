const express = require("express");
const app = express();
const port = 3000;
const productsRouter = require("./routes/products");
const ordersRouter = require("./routes/orders");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/products", productsRouter);
app.use("/orders", ordersRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
