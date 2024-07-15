const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const app = express();

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const reviewRoutes = require("./routes/review");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Multer setup for file uploads
const upload = multer({ dest: "uploads/" }); // Destination folder for file uploads

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.use("/", reviewRoutes);

// Create a migration
// npx sequelize-cli migration:generate --name add-indexes-to-review(file name)
// npx sequelize-cli db:migrate --migrate 20240715172923-add-indexes-to-reviews(filename)

// Run single seeder file
// npx sequelize-cli seed:generate --name demo-review
// npx sequelize-cli db:seed --seed <filename>
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
