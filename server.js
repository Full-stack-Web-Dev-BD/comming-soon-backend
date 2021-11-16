const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");

const app = express();

// Bodyparser middleware
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(morgan('dev'))
app.use(bodyParser.json());

const dbURL = "mongodb+srv://admin:admin@cluster0.hbf5v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const dbURL = "mongodb+srv://user:user@mern.a77ou.mongodb.net/akh-kpi?retryWrites=true&w=majority"

//connect to MongoDB
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, success) {
  if (err) {
    return console.log('Error:', err)
  }
  return console.log('Database connected !!! ')
})
// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

if (process.env.NODE_ENV === 'production') {

  app.use(express.static(path.join(__dirname, "client", "build")))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port}`));