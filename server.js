const express = require("express");
const path = require("path");
const PORT = parseInt(process.env.PORT || "12300");

const app = express();
const buildPath = path.join(__dirname, "build");

app.use(express.static(buildPath));

app.get("*", (_, res) => {
  return res.sendFile(path.join(buildPath, "/index.html"));
});

app.listen(PORT, () => console.log(`This app is running on ${PORT}`));
