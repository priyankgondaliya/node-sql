const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");

app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
