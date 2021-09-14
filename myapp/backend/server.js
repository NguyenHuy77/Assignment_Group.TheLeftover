const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role;

const url =
  "mongodb+srv://khoanguyenkne:Kn03122000@cluster0.wixqi.mongodb.net/api_covid?retryWrites=true&w=majority";
db.mongoose
  .connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// routes for auth, user and users' info
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/info.routes")(app);

//const userRoute = require("./user/userRoute");

//app.use("/users", userRoute);

// routes for managing rooms patients and events
const roomRoute = require("./room/roomRoute");
const patientRoute = require("./patient/patientRoute");
const eventRoute = require("./event/eventRoute");
const userRoute = require("./user/userRoute");

app.use("/rooms", roomRoute);
app.use("/patients", patientRoute);
app.use("/events", eventRoute);
app.use("/users", userRoute);
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../build")));
// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../build", "index.html"));
});
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
