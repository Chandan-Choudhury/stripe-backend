const express = require("express");
const bodyParser = require("body-parser");

const paymentRoutes = require("./routes/payment");

const app = express();

app.use(bodyParser.json());

app.use("/payment-sheet", paymentRoutes);

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
