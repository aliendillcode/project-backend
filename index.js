const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.API_PORT || 5000;

app.use(express.json());
app.use(express.static("public"));

//Routes
const UserRoutes = require("./routes/UserRoutes");

app.use("/api", UserRoutes);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
