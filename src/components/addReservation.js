import React, { useState, useEffect } from "react";
import DayPicker from "react-day-picker";
import "antd/dist/antd.css";
import "react-day-picker/lib/style.css";
import Form from "./formReservation";
import Modal from "./Modal";
import moment from "moment";

const AddReservation = () => {
  const [day, setDay] = useState(moment());
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <Modal showModal={showModal} />
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-5 d-flex mx-auto">
            <DayPicker
              onDayClick={(e) => {
                setDay(moment(e));
              }}
              selectedDays={day.toDate()}
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
