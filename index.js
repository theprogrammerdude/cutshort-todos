const express = require("express");
const cors = require("cors");

const initializeDB = require("./mongo");

const auth = require("./routes/auth");
const user = require("./routes/user");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/auth", auth);
app.use("/user", user);

initializeDB();

app.listen(port, () => {
  console.log("listening on port " + port);
});
