const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("I'm here :)");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
