import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/Navbar";
import { useNavigate } from "react-router-dom";

export const DashboardPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col justify-center items-center">
        <div className="text-3xl mb-4">Welcome to Admin Panel</div>
        <Button
          onClick={() => {
            navigate("/create");
          }}
        >
          Create Employee
        </Button>
      </div>
    </div>
  );
};
