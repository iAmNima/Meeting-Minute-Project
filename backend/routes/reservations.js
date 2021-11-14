const router = require("express").Router();
const axios = require('axios');
let Reservation = require("../models/reservation.model");

router.route("/").get((req, res) => {
    Reservation.find()
        .then((reservations) => res.json(reservations))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const timeSlot = req.body.timeSlot;
    const day = req.body.day;
    const roomNr = req.body.roomNr;

    const newPerson = new Reservation({
        email,
        name,
        timeSlot,
        day,
        roomNr,
    });

    newPerson
        .save()
        .then(() => {
            // send reservation update to door bell BE
            emitReservationUpdate(newPerson, 'add');
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
        .then(() => {
            // send reservation delete to door bell BE
            emitReservationUpdate({_id: req.params.id}, 'delete');
            res.json("Reservation deleted.");
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

function emitReservationUpdate(reservation, type) {
    reservation.type = type;
    axios.post('http://localhost:5001/reservations/emit', reservation)
      .then(res => {
          console.log(`statusCode: ${res.status}`);
      })
      .catch(error => {
          console.error(error);
      });
}

module.exports = router;
