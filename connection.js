const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Mongoose connected successfully");
  })
  .catch((error) => {
    console.error("Mongoose connection error:", error);
  });

module.exports = mongoose;
