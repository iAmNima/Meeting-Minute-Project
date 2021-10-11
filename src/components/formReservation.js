import React, { useState, useContext } from "react";
//import DayPicker from 'react-day-picker';
import "react-day-picker/lib/style.css";
import axios from "axios";
import "antd/dist/antd.css";
import { setDay } from "date-fns";
import UserContext from "../Context/UserContext";
import { motion } from "framer-motion";

function useFormReservation() {
  const [value, setInput] = useState("");

  function onChange(event) {
    setInput(event.target.value);
  }

  return [value, onChange];
}

function FormReservation({ day, setShowModal }) {
  const { userData, setUserData } = useContext(UserContext);

  const [name, setName] = useState("");
  const [roomNr, setRoomNr] = useState();
  const [startTime, setStartTime] = useState("");
  const [stopTime, setStopTime] = useState("");

  function mySubmitHandler(event) {
    event.preventDefault();
    const reservation = {
      name: userData.user.UserCn,
      roomNr: roomNr,
      timeSlot: startTime + " - " + stopTime,
      day: day,
    };
    console.log(reservation);
    axios
      .post("http://localhost:5000/reservations/add", reservation)
      //should be "http://localhost:5000/reservations/add"
      //and the payload should have 1.name 2.timeSlot 3.day 4.roomNr
      .then((res) => {
        console.log(res);
        console.log("data has been sent to the server");
        setShowModal(true);
      })
      .catch(() => {
        console.log("server error");
      });
  }

  return (
    <motion.form
      className="form"
      onSubmit={mySubmitHandler}
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
    >
      <div>
        <h1>Add your Reservation</h1>
      </div>

      <div className="form-group">
        <select
          class="form-control"
          className="room-form"
          Name="roomNr"
          onChange={(e) => {
            console.log(e.target.value);
            setRoomNr(e.target.value);
          }}
          {...useFormReservation}
        >
          <option value="">select room</option>
          <option value="1">Availability</option>
          <option value="510">room 510</option>
          <option value="402">room 402</option>
          <option value="322">room 322</option>
          <option value="305">room 305</option>
        </select>
      </div>

      <div className="form-group">
        <input
          type="time"
          Name="startTime"
          className="startTime-form"
          value={startTime}
          onChange={(e) => {
            console.log(e.target.value);

            // Add 1 hour to end time
            let endTime = e.target.value.split(":");
            if (endTime[0] == "23") {
              endTime[0] = "00";
            } else {
              let endTimeInt = parseInt(endTime[0]);
              endTimeInt++;
              endTimeInt < 10
                ? (endTime[0] = "0" + endTimeInt.toString())
                : (endTime[0] = endTimeInt.toString());
            }

            setStartTime(e.target.value);
            console.log(endTime.join(":"));
            setStopTime(endTime.join(":"));
          }}
          //{...useFormReservation}
        />
        <input
          type="time"
          Name="stopTime"
          className="stopTime-form"
          value={stopTime}
          onChange={(e) => {
            console.log(e.target.value);
            setStopTime(e.target.value);
          }}
          //{...useFormReservation}
        />
      </div>

      <div className="pre-information">
        <pre>
          Name: {userData.user.UserCn}
          <br />
          Room Number: {roomNr}
          <br />
          Start Time: {startTime}
          <br />
          Stop Time: {stopTime}
          <br />
          Day: {day}
        </pre>
      </div>

      <div>
        <button
          type="submit"
          className="btn-submit-form"
          onChange={mySubmitHandler}
        >
          Submit
        </button>
      </div>
    </motion.form>
  );
}
export default FormReservation;
