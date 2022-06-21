const express = require("express");
const cors = require("cors");
const db = require("./models/db");
const apiRoutes = require("./routes");

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/", apiRoutes);

db.then(() => {
  console.log("Database Connected");
  app.listen(port, () => console.log(`listening on http://localhost:${port}`));
}).catch((err) => {
  console.log("Server down");
});
