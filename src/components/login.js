import React, { useContext, useState } from "react";
import Image from "../image/login.jpg";
import { useHistory } from "react-router-dom";
import UserContext from "../Context/UserContext";
import axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import { motion } from "framer-motion";
// const ldap = require("../../backend/middleware/ldap-server");

// const { authenticate } = require("ldap-authentication");

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const SubmitData = async (e) => {
    let UserCn = "";
    let UserEmail = "";
    e.preventDefault();
    try {
      const loginUser = { username, password, UserCn , UserEmail };
      axios
        .post("http://localhost:5000/users/auth", loginUser)
        .then((Response) => {
          console.log(Response.data.cn);
          loginUser.UserCn = Response.data.cn;
          loginUser.UserEmail = Response.data.mail;
          setUserData({
            user: loginUser,
          });
          history.push("/");
        })
        .catch((error) => {
          console.log("returned error in login.js");
          console.log(error.response.data);
          setError("Invalid username or password");
        });
    } catch (err) {
      // err.response.data.msg && setError(err.response.data.msg);
    }
    //console.log(data);
  };

  return (
    <motion.div
      initial={{ y: "-100vh" }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 70 }}
    >
      <div className="container mt-5 mb-2">
        <div className="row">
          <div className="col-lg-m-5 d-flex mx-auto">
            {error && (
              <ErrorNotice
                message={error}
                clearError={() => setError(undefined)}
              />
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-lg-m-5 d-flex mx-auto">
            <form
              className="form-Login"
              onSubmit={SubmitData} //onSubmit{auth}
            >
              <div className="image">
                <img src={Image} alt="" width="200px" />
              </div>
              <h1>LOGIN</h1>
              <div className="form-group">
                <input
                  type="username"
                  name="username"
                  className="name-form-login"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  //{...useFormReservation}
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  className="name-form-login"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  //{...useFormReservation}
                />
              </div>

              <div className="d-flex justify-content-center">
                <input
                  type="submit"
                  value="Log in"
                  className="btn-form-login"
                  //onClick={()=> SubmitData()}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
