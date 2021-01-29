import React,{ useContext, useState }from 'react';
import Image from '../image/login.jpg';
import { useHistory } from "react-router-dom";
import UserContext from "../Context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import { motion } from 'framer-motion';

export default function Login() {
    
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const SubmitData = async(e) =>{
        e.preventDefault();
        try {
        const loginUser = { email, password };
        const loginRes = await Axios.post("http://localhost:5000/users/login", loginUser);

        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user,
        });
        localStorage.setItem("auth-token", loginRes.data.token);
        history.push("/");
        } catch (err) {
        err.response.data.msg && setError(err.response.data.msg);
        }
        //console.log(data);
    };

    return ( 
        <motion.div
          initial={{ y: '-100vh' }}
          animate={{ y:0 }}
          transition={{ type: 'spring', stiffness: 70 }}
        >
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-m-5 d-flex mx-auto">
                        {error && (
                            <ErrorNotice message={error} clearError={() => setError(undefined)} />
                        )}
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-lg-m-5 d-flex mx-auto">
                    <form className="form-Login" onSubmit={SubmitData}
                    >
                    <div className="image">
                        <img src={Image} alt="" width="200px" />
                    </div>
                    <h1>LOGIN</h1>
                        <div className="form-group">
                            <input 
                                type="email" 
                                Name="email"
                                className="name-form-login"  
                                placeholder="Enter your username" 
                                value={ email }
                                onChange={(e)=> setEmail(e.target.value)}
                                //{...useFormReservation}
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="password" 
                                Name="password"
                                className="name-form-login"  
                                placeholder="Enter your password" 
                                value={ password }
                                onChange={(e)=> setPassword(e.target.value)}
                                //{...useFormReservation}
                            />
                        </div>
                        
                        <div class="d-flex justify-content-center">
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
