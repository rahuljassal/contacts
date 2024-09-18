const dotenv = require("dotenv").config();
const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const connectDb = require("./config/dbConnection");
connectDb();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);
// assinging port to the app
app.listen(port, () => {
  console.log("server on ", port);
});
