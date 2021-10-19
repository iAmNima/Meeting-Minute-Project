const router = require("express").Router();
const axios = require('axios');
let Reservation = require("../models/reservation.model");

router.route("/").get((req, res) => {
  Reservation.find()
    .then((reservations) => res.json(reservations))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const timeSlot = req.body.timeSlot;
  const day = req.body.day;
  const roomNr = req.body.roomNr;

  const newPerson = new Reservation({
    name,
    timeSlot,
    day,
    roomNr,
  });

  newPerson
    .save()
    .then(() => {
      // send reservation update to door bell BE
      axios.post('http://localhost:5001/reservations/emit', newPerson)
          .then(res => {
            console.log(`statusCode: ${res.status}`);
          })
          .catch(error => {
            console.error(error);
          });
      // respond
      res.json("Reservation added!");
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
      console.log(err);
    });
});

router.route("/:id").delete((req, res) => {
  Reservation.findByIdAndDelete(req.params.id)
    .then(() => res.json("Reservation deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
