import React, { useState, useEffect } from "react";
import DayPicker from "react-day-picker";
//import "../../node_modules/react-day-picker/lib/style";
import Reservations from "./reservations";

const Res = () => {
  //Hooks:
  const [day, setDay] = useState("");
  const [selectedDay, setSelectedDay] = useState({});
  // const [reservations, setReservation] = useState([]);

  //useEffects:
  useEffect(() => {
    //------setting selected day as today:
    let time = new Date();
    setSelectedDay(time);
    setDay(time.toLocaleDateString());
    //------getting data from database when the component renders:
    // axios
    //   .get("http://localhost:5000/reservations/")
    //   .then((Response) => {
    //     setReservation(Response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);

  //functions:

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-5 d-flex mx-auto">
            <DayPicker
              onDayClick={(e) => {
                console.log(e);
                setDay(e.toLocaleDateString());
                setSelectedDay(e);
              }}
              selectedDays={selectedDay}
            />
          </div>
          <div className="col-lg-5 d-flex mx-auto">
            <Reservations day={day} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Res;
