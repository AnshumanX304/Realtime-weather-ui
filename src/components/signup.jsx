import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from 'react';
import validator from "validator";
import ReqContext from "../shared/authContext";
import Cookies from "js-cookie";

const Signup = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup } = useContext(ReqContext);


    const validateEmail = (inputText) => {
        setEmail(validator.trim(inputText));
    }

    function handleUsername(e) {
        setUsername(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    async function handleSubmits(e) {
        e.preventDefault();
        let payload = {
            username: username,
            useremail: email,
            userpassword: password
        };
        await signup(payload)
            .then((res) => {
                
                Cookies.set("ac_token", res.data.accesstoken);
                localStorage.setItem("isLoggedin", 'true');
                navigate("/");
            })
            .catch((err) => {
                console.log(err.response.data);
                alert(err.response.data.msg);
            });
    }

    return (
        <div className="bg-[#737373] h-screen flex justify-center items-center" >
            <div className="h-fit w-fit bg-white rounded-lg p-5">
                <div className="flex justify-center items-center mb-5">
                    <div><p className="text-3xl text-center font-extrabold ">Sign Up</p></div>
                </div>
                <div className="flex justify-center items-center ">
                    <div><p className="text-slate-500 text-xl text-center mx-3">Enter your information to create an account</p></div>
                </div>
                <div className="flex">
                    <div className="my-3 mx-3 w-full">
                        <form onSubmit={handleSubmits}>
                            <label className="font-semibold my-2 ">Username</label>
                            <br></br>
                            <input className="w-full mb-5 mt-3 border-2 p-2 rounded-lg border-slate-300" 
                                type="text" 
                                placeholder="johndoe"
                                name="username"
                                value={username}
                                required
                                onChange={handleUsername}/>
                            <br></br>
                            <label className="font-semibold my-2 ">Email</label>
                            <br></br>
                            <input className="w-full mb-5 mt-3 border-2 p-2 rounded-lg border-slate-300" 
                                type="email" 
                                placeholder="johndoe@example.com"
                                name="email"
                                value={email}
                                required
                                onChange={(e) => validateEmail(e.target.value)}/>
                            <br></br>
                            <label className="font-semibold my-2">Password</label>
                            <br></br>
                            <input className="w-full mb-5 mt-3 border-2 p-2 rounded-lg border-slate-300" 
                                type="password"
                                placeholder="12345@example"
                                name="password"
                                value={password}
                                required
                                onChange={handlePassword}/>
                            <br></br>
                            <button className="bg-black text-white w-full rounded-lg h-10 my-3">Sign Up</button>
                        </form>
                    </div>
                </div>
                <div className="flex justify-center align-center mb-5">
                    <div>Already have an account? <Link to="/signin"><span className="underline">Sign In</span></Link></div>
                </div>
            </div>
        </div>
    );
}

export default Signup;