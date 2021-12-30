const router = require("express").Router();
let Reservation = require("../models/reservation.model");

router.route("/").get((req, res) => {
    Reservation.find()
        .then((reservations) => res.json(reservations.filter((it)=>it.roomNr === 1)))
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;