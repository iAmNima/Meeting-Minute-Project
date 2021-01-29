import React, { useState, useEffect } from 'react';
import 'react-day-picker/lib/style.css';
import Navbar from './components/navbar';
import Res from './components/Res';
import Axios from 'axios';
import UserContext from './Context/UserContext';
import './index.css';
import AddReservation from './components/addReservation';
import Login from './components/login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function App(){

  const[userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  //useEffects:
  useEffect(() => {
    const checkLoggedIn = async () =>{
      let token = localStorage.getItem("auth-token");
      if(token === null){
        localStorage.setItem("auth-token","");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:5000/users/tokenIsValid/",
        null,
        { headers: { "x-auth-token": token}}
      );
      if(tokenRes.data){
        const userRes = await Axios.get("http://localhost:5000/users/",{
          header: {"x-auth-token":token },
      });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    }
    checkLoggedIn();
  }, []);

  //functions:
  return (
    <div>
    <UserContext.Provider value={{ userData, setUserData }}>
    <Router>
      <Navbar />
       <React.StrictMode>
        <Switch>
          <Route path="/" exact component={Res} />
          <Route path="/add-reservation" component={AddReservation} />
          <Route path="/login" component={Login} />
        </Switch>
      </React.StrictMode>,
      </Router>
      </UserContext.Provider>
    </div>
  );
}

