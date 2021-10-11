import React, { useState, useEffect } from "react";
import DayPicker from "react-day-picker";
import "antd/dist/antd.css";
import "react-day-picker/lib/style.css";
import Form from "./formReservation";
import Modal from "./Modal";

const AddReservation = () => {
  const [day, setDay] = useState("");
  const [selectedDay, setSelectedDay] = useState({});
  const [showModal, setShowModal] = useState(false);

  //useEffects:
  useEffect(() => {
    //------setting selected day as today:
    let time = new Date();
    setSelectedDay(time);
    setDay(time.toLocaleDateString());
  }, []);

  return (
    <div>
      <Modal showModal={showModal} />
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-5 d-flex mx-auto">
            <DayPicker
              onDayClick={(e) => {
                setDay(e.toLocaleDateString());
                setSelectedDay(e);
              }}
              selectedDays={selectedDay}
            />
          </div>
          <div className="col-lg-5 d-flex mx-auto">
            <Form day={day} setShowModal={setShowModal} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReservation;
