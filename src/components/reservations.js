import React, {useContext, useEffect, useState} from "react";
import profile_pic from "../assets/default_profile.png";
import {motion} from "framer-motion";
import UserContext from "../Context/UserContext";
import axios from "axios";
/* eslint-disable */


const Reservations = ({day}) => {
    let noReservation = true;

    //Hooks
    const {userData, setUserData} = useContext(UserContext);
    const [roomNr, setRoomNr] = useState(0);
    const [reservations, setReservation] = useState([]);
    const [showAvailability, setShowAvailability] = useState(false);

    //useEffects:
    useEffect(() => {
        console.log("useEffect used.");
        //------getting data from database when the component renders:
        axios
            .get("http://localhost:5000/reservations/")
            .then((Response) => {
                setReservation(Response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function deleteHandler(id) {
        console.log("delete button clicked.");
        axios
            .delete("http://localhost:5000/reservations/" + id)
            .then((response) => {
                console.log(response.data);
                //getting the new data after we delete a reservation
                axios
                    .get("http://localhost:5000/reservations/")
                    .then((Response) => {
                        setReservation(Response.data);
                        console.log(Response);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            });
    }

    function CreateICS() {
        console.log(reservations);
    }


    return (
        <div>
            <select
                className="mb-4 room-dropdown"
                onChange={(e) => {
                    setRoomNr(e.target.value);
                    console.log(e.target.value); //test
                }}
                name="rooms"
                id="rooms"
            >
                <option value="0">all rooms</option>
                <option value="510">room 510</option>
                <option value="402">room 402</option>
                <option value="322">room 322</option>
                <option value="305">room 305</option>
            </select>
            <button className="mb-4 availability" variant="primary" onClick={() => {
                setShowAvailability(!showAvailability)
            }}>{showAvailability ? 'Hide Availability' : 'Show Availability'}</button>


            {reservations.map((reservation) => {
                if (!showAvailability &&
                    reservation.day === day &&
                    (reservation.roomNr == roomNr ||
                        (roomNr == 0 && reservation.roomNr !== 1))
                ) {
                    console.log(reservation.roomNr);
                    // only returning resurvations for that day:
                    noReservation = false;
                    return (
                        <motion.div
                            key={reservation._id}
                            className="reservation-card p-3"
                            initial={{x: "100vw"}}
                            animate={{x: 0}}
                            transition={{type: "spring", stiffness: 50}}
                        >
                            {userData.user && reservation.name == userData.user.UserCn && (
                                <div
                                    className="delete-icon-reservation"
                                    onClick={deleteHandler.bind(this, reservation._id)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        fill="currentColor"
                                        class="bi bi-trash"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path
                                            fill-rule="evenodd"
                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                        />
                                    </svg>
                                </div>
                            )}

                            <div className="d-flex m-2">
                                <img className="default_profile_pic" src={profile_pic}/>
                                <h3 className="my-auto ml-2">{reservation.name}</h3>
                            </div>
                            <div className="d-flex m-2">
                                <h4 className="mr-auto">{reservation.timeSlot}</h4>
                                <h4>{`room(${reservation.roomNr})`}</h4>
                            </div>
                        </motion.div>
                    );
                }
                // showing availabilities instead of reservations:
                if (reservation.day === day && reservation.roomNr == 1 && showAvailability) {
                    return (
                        <motion.div
                            key={reservation._id}
                            className="reservation-card p-3"
                            initial={{x: "100vw"}}
                            animate={{x: 0}}
                            transition={{type: "spring", stiffness: 50}}
                        >
                            {userData.user && reservation.name == userData.user.UserCn && (
                                <div
                                    className="delete-icon-reservation"
                                    onClick={deleteHandler.bind(this, reservation._id)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        fill="currentColor"
                                        class="bi bi-trash"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path
                                            fill-rule="evenodd"
                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                        />
                                    </svg>
                                </div>
                            )}

                            <div className="d-flex m-2">
                                <img className="default_profile_pic" src={profile_pic}/>
                                <h3 className="my-auto ml-2">{reservation.name}</h3>
                            </div>
                            <div className="d-flex m-2">
                                <h4 className="mr-auto">{reservation.timeSlot}</h4>
                            </div>
                        </motion.div>
                    );
                }
            })}
            {noReservation == true && <h4>No reservation on this day!</h4>}
        </div>
    );
};

export default Reservations;
