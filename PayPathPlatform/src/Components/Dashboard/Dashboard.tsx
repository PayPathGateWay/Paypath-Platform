import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { testRoute } from "@/Services/AuthServices";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Layout/Dashboard/NavBar";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [data, setData] = useState<string | null>(null); // Initialize with null or a default value
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  const secureCall = async () => {
    try {
      const res = await testRoute();
      console.log("Hello", res);
      if (res != null) {

        setData(res);
      }
    } catch (error) {
      console.error("Error making secure call:", error);
      // Optionally set error state here
    }
  };

  return (
    <>
      <div className="bg-[#F8F8F8] h-screen w-screen flex">
        <NavBar />
      </div>
    </>
  );
}

