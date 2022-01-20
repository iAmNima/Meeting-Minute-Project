import React, {useContext, useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import Icon from "../image/OIP.jfif";
import UserContext from "../Context/UserContext";
import {motion} from "framer-motion";
import axios from "axios";
import moment from 'moment';

const ics = require('ics');

const Navbar = () => {
    const {userData, setUserData} = useContext(UserContext);
    const [CalAvailabilities, setCalAvailabilities] = useState([]);
    const [UserCal, setUserCal] = useState([]);
    const history = useHistory();
    const login = () => history.push("/login");
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined,
        });
        localStorage.setItem("auth-token", "");
        console.log(userData.user);
    };

    //useEffects:
    useEffect(() => {
        console.log("useEffect used.");
        //------getting data from database when the component renders:
        axios
            .get("http://localhost:5000/CalAvailabilities/")
            .then((Response) => {
                setCalAvailabilities(Response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function CreateEvent(UserCal) {
        let events = UserCal.map(e => {
            const time = moment(e.day, "DD.MM.YYYY");
            const tempSt = e.timeSlot.split(" - ");
            const st_1 = tempSt[0].split(":");
            const duration = moment.duration(moment(tempSt[1], "hh:mm").diff(moment(tempSt[0], "hh:mm"))).asMinutes();
            return {
                title: 'Availability',
                start: [time.year(), time.month() + 1, time.day(), Number(st_1[0]), Number(st_1[1])],
                duration: {minutes: duration},
            }
        })
        const {error, value} = ics.createEvents(events)

        // create virtual fake link for download
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(value));
        element.setAttribute('download', 'event.ics');
        element.style.display = 'none';
        document.body.appendChild(element);
        // click virtual link for download and destroy
        element.click();
        document.body.removeChild(element);
    }


    function DownloadCal() {
        setUserCal(CalAvailabilities.filter((CalAvailabilities) => CalAvailabilities.name === userData.user.UserCn));
        CreateEvent(UserCal);
    }

    return (
        <div>
            <nav className="navbar d-flex ">
                <div className="ml-5 mr-auto p-3">
                    <ul className="navbar-list my-auto">
                        <li>
                            <h4 className="navbar-op">Welcome</h4>
                        </li>
                        <li>
                            {userData.user !== undefined
                                ? <h4 className="user-name">{userData.user.UserCn}</h4>
                                : ""
                            }
                        </li>
                    </ul>
                </div>

                <div className="p-1 mr-5">
                    <ul className="navbar-list my-auto">
                        <Link to="/" style={{textDecoration: "none"}}>
                            <li className="navbar-list-item px-3 py-2 mx-1">
                                <h4 className="my-auto navbar-op">Home</h4>
                            </li>
                        </Link>

                        {userData.user !== undefined ? (
                            <>
                                <Link to="/add-reservation" style={{textDecoration: "none"}}>
                                    <motion.li
                                        className="navbar-list-item px-3 py-2 mx-1"
                                        initial={{opacity: 0, scale: 1.3}}
                                        animate={{opacity: 1, scale: 1}}
                                        transition={{duration: 0.5}}
                                    >
                                        <h4 className="my-auto navbar-op">Add reservation</h4>
                                    </motion.li>
                                </Link>
                                <Link to="/" style={{textDecoration: "none"}}>
                                    <li
                                        onClick={DownloadCal}
                                        className="navbar-list-item px-3 py-2 mx-1">
                                        <h4 className="my-auto navbar-op">Export Calendar</h4>
                                    </li>
                                </Link>
                                <Link to="/" style={{textDecoration: "none"}}>
                                    <li
                                        onClick={logout}
                                        className="navbar-list-item px-3 py-2 mx-1"
                                    >
                                        <h4 className="my-auto navbar-op">logout</h4>
                                    </li>
                                </Link>
                            </>
                        ) : (
                            <Link to="/login" style={{textDecoration: "none"}}>
                                <li className="navbar-list-item px-3 py-2 mx-1">
                                    <h4 className="my-auto navbar-op">login</h4>
                                </li>
                            </Link>
                        )}

                        <li>
                            <div className="image">
                                <img src={Icon} alt="" width="50px"/>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
