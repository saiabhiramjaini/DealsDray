import axios from "axios";
import { Button } from "./button";
import { backendURL } from "@/config";
import { toast } from "react-toastify";

export const Navbar = () => {
  const username = localStorage.getItem("username");

  const handleLogout = async() => {
    try{
      const response = await axios.get(`${backendURL}/api/v1/auth/logout`);
      if(response.data.message === "Logout successful"){
        localStorage.removeItem("username");
        window.location.href = "/";
      }
      else{
        toast.error(response.data.message);
      }
    }
    catch(error){
      console.error("Error occured", error)
    }
  }
  return (
    <>
        <div className="flex justify-between bg-black w-screen p-5">
          <div className="flex gap-5 mt-2">
            <div className="text-white font-semibold text-xl">LOGO</div>
            <div className="text-white"> <a href="/home">Home</a></div>
            <div className="text-white"> <a href="/employeelist">Employee List</a></div>
          </div>
          <div className="flex gap-5">
            <div className="text-white mt-2">{username}</div>
            <Button 
            onClick={handleLogout}
            className="bg-white text-black hover:border hover:border-white hover:text-white">
              Logout
            </Button>
          </div>
        </div>
    </>
  );
};
