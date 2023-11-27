import {Link, useNavigate} from "react-router-dom";
import {UserAuth} from '../context/AuthContext';

export default function Navbar() {
    const {user, logOut} = UserAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logOut();
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="flex items-center justify-between p-5 absolute z-[100] w-full">
            <Link to="/">
                <h1 className="text-red-600 text-4xl font-bold cursor-pointer">NETFLIX</h1>
            </Link>
            {user?.email ? (
                <div>
                    <Link to="/account">
                        <button className="mr-5">Account</button>
                    </Link>
                    <Link to="/">
                        <button
                            className="bg-red-600 rounded-[5px] py-2 px-6"
                            onClick={handleLogout}>
                            LogOut
                        </button>
                    </Link>
                </div>
            ) : (
                <div>
                    <Link to="/login">
                        <button className="mr-5">Sign In</button>
                    </Link>
                    <Link to="/signup">
                        <button className="bg-red-600 rounded-[5px] py-2 px-6">Sign Up</button>
                    </Link>
                </div>
            )}
        </div>
    );
}
