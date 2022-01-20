import React, {useState} from "react";
import DayPicker from "react-day-picker";
import Reservations from "./reservations";
import moment from "moment";

const Res = () => {
    //Hooks:
    const [day, setDay] = useState(moment());

    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-5 d-flex mx-auto">
                        <DayPicker
                            onDayClick={(e) => setDay(moment(e))}
                            selectedDays={day.toDate()}
                        />
                    </div>
                    <div className="col-lg-5 d-flex mx-auto">
                        <Reservations day={day}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Res;
