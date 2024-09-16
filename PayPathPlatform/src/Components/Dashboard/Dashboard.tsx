import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <div>
      <div className="p-10">
        <h1>Hello Check...</h1>
        <p>Welcome, {user?.emailAddress}!</p>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  )
}
