const express = require("express");
const connectToDatabase = require("./database/db");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const DATABASE_URL = process.env.MONGODB_URI;
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/admin", require("./routes/adminRoutes"))
app.use("/api/contact", require("./routes/contactRoute"));
app.use("/api/faq", require("./routes/faqRoute"));

app.get("/", async (req, res) => {
  return res.redirect(302, 'https://zotetech.com');

});

connectToDatabase(DATABASE_URL)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
