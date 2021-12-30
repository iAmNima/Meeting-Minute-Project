//adding express and cors modules:
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

// var ldap = require("ldapjs");

//creating express server:
const app = express();
const port = process.env.PORT || 5000;

//const uri = process.env.ATLAS_URI;
const uri =
  "mongodb+srv://nima_bayat:213213213@cluster0.skwrb.mongodb.net/myapp?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully!");
});

//setting up our middlewares:
app.use(cors());
app.use(express.json());

const reservationsRouter = require("./routes/reservations");
const usersRouter = require("./routes/users");
const calAvailabilitiesRouter = require("./routes/CalAvailabilities")

app.use("/reservations", reservationsRouter);
app.use("/users", usersRouter);
app.use("/CalAvailabilities", calAvailabilitiesRouter);

//listening on the port:
app.listen(port, () => {
  console.log(`Server is running on the port: ${port}`);
});

//#######################################################################################################
// stablishing ldap connection:

// async function auth() {
//   console.log("function started.");
//   let options = {
//     ldapOpts: {
//       url: "ldap://ldap.technikum-wien.at", //url is currect!
//       //tlsOptions: { rejectUnauthorized: false },
//     },
//     userDn: "uid=if18b016,ou=people,dc=technikum-wien,dc=at",
//     userPassword: "nB213213213",
//     userSearchBase: "ou=people,dc=technikum-wien,dc=at",
//     usernameAttribute: "uid",
//     username: "if18b016",
//     // starttls: false,
//   };

//   let user = await authenticate(options);
//   console.log(user);
// }
