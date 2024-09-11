import { navbarElements } from "@/types/Constants";
import { logo } from "@/types/Index";
import { useNavigate } from "react-router-dom";

export default function Navbar({ setAuthType }: any) {
    const navigate = useNavigate();

    const handleSignup = () => {
        navigate('/auth/register'); // Programmatically navigate to the register page
        setAuthType(false); // Show Register
    };

    const handleLogin = () => {
        navigate('/auth/login'); // Programmatically navigate to the login page
        setAuthType(true); // Show Register
    };
    
    return (
        <>
            <div
                className="w-full border-b-2 border-[#363F54] relative"
                style={{
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        overflow: 'hidden',
                        position: 'absolute',
                        bottom: 0,
                        paddingTop: 100,
                        left: 0,
                        width: '100%',
                        height: '10px',
                        backgroundColor: 'rgba(54, 63, 84, 0.5)',
                        transformOrigin: 'bottom left',
                        animation: 'glowingBorder 2s forwards',
                    }}
                ></div>

                <div
                    className="element"
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '3px',
                        backgroundColor: 'rgba(54, 63, 84, 0.5)',
                        transformOrigin: 'bottom left',
                        animation: 'glowingBorder 2s linear infinite',
                    }}
                ></div>

                <nav className="p-4">
                    <div className="mx-auto flex items-center justify-around pl-20 pr-20">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <img src={logo} alt="Logo" className="h-10 cursor-pointer" />
                        </div>

                        {/* Items in the middle */}
                        <div className="flex-1 flex items-center justify-center space-x-6">
                            {navbarElements.map((item, index) =>
                                typeof item === "string" ? (
                                    <a
                                        href={`#${item.toLowerCase()}`}
                                        key={index}
                                        className="text-[#93A0B9] text-sm hover:text-blue-500"
                                    >
                                        {item}
                                    </a>
                                ) : (
                                    item // If it's not a string, assume it's a component
                                )
                            )}
                        </div>

                        {/* Call to action buttons */}
                        <div className="flex-shrink-0 flex space-x-6">
                            <button
                                onClick={handleLogin}
                                className="text-white py-2 px-4 rounded hover:text-gray-500 cursor-pointer">
                                Login
                            </button>
                            <button
                                onClick={handleSignup}
                                className="bg-[#1A5CFF] text-white pt-[5px] pb-[5px] px-10 rounded-lg shadow-lg hover:shadow-md hover:bg-[#1A5CFF] focus:outline-none transition-transform transform outer-shadow"
                            >
                                Sign up
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}
