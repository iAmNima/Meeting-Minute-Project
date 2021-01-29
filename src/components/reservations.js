import React, { useState } from 'react';
import profile_pic from '../assets/default_profile.png';
import { motion } from 'framer-motion';

const Reservations = ({reservations, day}) => {

  let noReservation = true;

  //Hooks
  const [roomNr, setRoomNr] = useState(0);

  return ( 
    <div>

      <select className="mb-4 room-dropdown" onChange={(e) => { 
        setRoomNr(e.target.value);
        console.log(e.target.value);//test
       } } name="rooms" id="rooms">
        <option value="0">all rooms</option>
        <option value="510">room 510</option>
        <option value="402">room 402</option>
        <option value="322">room 322</option>
        <option value="305">room 305</option>
      </select>

      {reservations.map(reservation => {
        if(reservation.day === day && (reservation.roomNr == roomNr || roomNr == 0)){ // only returning resurvations for that day:
          noReservation = false;
          return(
            <motion.div key={reservation._id} className="reservation-card p-3"
              initial={{ x: '100vw' }}
              animate={{ x:0 }}
              transition={{ type: 'spring', stiffness: 50 }}
            >
              <div className="d-flex m-2">
                <img className="default_profile_pic" src={profile_pic}/>
                <h3 className="my-auto ml-2" >{reservation.name}</h3>
              </div>
              <div className="d-flex m-2">
                <h4 className="mr-auto">{reservation.timeSlot}</h4>
                <h4>{`room(${reservation.roomNr})`}</h4>
              </div>
            </motion.div>
            )
        }
      })} 
      { noReservation == true ? <h4>No reservation on this day!</h4> : null } 
    </div>
   );
}
 
export default Reservations;