import { useEffect, useState } from "react";
import Navbar from "../Layout/Navbar";
import Login from "../Layout/Auth/Login";
import Register from "../Layout/Auth/Register";
import { useLocation } from "react-router-dom";

export default function Authantcation() {
    // True = Login, False = Signup
    const [authType, setAuthType] = useState(true);
    const currLoc = useLocation();
    useEffect(() => {
        if (currLoc.pathname.endsWith("login")) {
            setAuthType(true);
        } else if (currLoc.pathname.endsWith("register")) {
            setAuthType(false);
        }
    }, [currLoc]);

    return (
        <>
            <div className="bg-[#18191C] w-screen h-screen overflow-hidden">
                <Navbar setAuthType={setAuthType} />
                {authType ? <Login /> : <Register />}
            </div>
        </>
    );
}
