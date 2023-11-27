import React, {useState} from 'react';
import background from "../assets/background.jpg"
import {Link, useNavigate} from "react-router-dom";
import {UserAuth} from "../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const {user, logIn} = UserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        try {
            await logIn(email, password)
            navigate('/')
        } catch (error) {
            console.log(error);
            setError(error.message)
        }
    };

    return (
        <div className={`h-screen w-full relative`}>
            <img className="h-full w-full object-cover" src={background} alt=""/>
            <div className="bg-black/50 absolute top-0 left-0 w-full h-screen"></div>
            <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/75 max-x-1/2 min-[600px]:w-[60%] lg:w-[24%] w-[80%] h-[50%]">
                <div className="w-[80%] mx-auto px-3 py-5">
                    <h1 className="text-2xl font-bold text-white">Sign In</h1>
                    {error ? <p className='p-3 bg-red-400 my-2'>{error}</p> : null}
                    <form
                        onSubmit={handleSubmit}
                        className="w-full flex flex-col py-4 gap-5">
                        <label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                className="text-sm rounded-sm px-3 py-[10px] bg-slate-700 focus:outline-none w-full py-1"
                                type="email"
                                placeholder="E-mail or phone number"
                            />
                        </label>
                        <label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                className="text-sm rounded-sm px-3 py-[10px] bg-slate-700 focus:outline-none w-full py-1"
                                type="password"
                                placeholder="Password"
                                autoComplete='current-password'/>
                        </label>
                        <button type="submit" className="rounded-sm font-semibold bg-red-700 w-full py-2">Login
                        </button>
                    </form>
                    <div className="flex justify-between mb-5">
                        <label className="text-sm text-gray-700 whitespace-nowrap">
                            <input className="mr-1 checked:text-grey checked:bg-grey-300" type="checkbox"/>Remember me
                        </label>
                        <a href="/" className="text-sm whitespace-nowrap text-gray-700">Need Help?</a>
                    </div>
                    <p className="text-xs text-gray-700 whitespace-nowrap">New to Netflix? <Link
                        to="/signup" className="text-white pl-1 text-xs font-bold mb-10">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;