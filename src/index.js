const express = require("express");
const { default: rateLimit } = require("express-rate-limit");
const { default: helmet } = require("helmet");

const app = express();

app.use(helmet());
app.use(cors());
app.use(rateLimit());

app.get("/", (req, res) => {
  res.send("API Running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
