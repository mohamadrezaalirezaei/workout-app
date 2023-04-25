const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const workoutRoute = require("./routes/workouts");
const userRoute = require("./routes/user");
const imageRoute = require("./routes/image");

const mongoose = require("mongoose");

//expres app
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set EJS as templating engine
app.set("view engine", "ejs");

app.use(express.json());

let port = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, function (err) {
      if (err) console.log("Error in server setup");
      console.log(
        "Conected to DB & Server is listening on Port".cyan,
        process.env.port.cyan
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use((req, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/workouts", workoutRoute);
app.use("/api/user", userRoute);
app.use("/api/image", imageRoute);
