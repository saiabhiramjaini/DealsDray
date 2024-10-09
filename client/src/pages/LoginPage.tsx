import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AuthNavbar } from "@/components/ui/AuthNavbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendURL } from "@/config";
import { Login } from "@abhiram2k03/dealsdray-common";
import { toast } from "react-toastify";


export const LoginPage = () => {
  const [loginData, setLoginData] = useState<Login>({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(`${backendURL}/api/v1/auth/login`,loginData);
      if (response.data.message === "Login successful") {
        const username = response.data.user.username;
        localStorage.setItem("username", username);
        navigate("/home");
      } else {
        toast.error(response.data.message);
      }
    }  catch (error: any) {
      if(error.response.data.message === "Validation failed"){
        toast.error(error.response.data.errors[0].message);
      }
      else{
        toast.error(error.response.data.message);
      }
      console.error("Error occured", error);
      setErrorMessage("Signup failed. Please try again.");
    }  finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <AuthNavbar />
      <div className="flex flex-1 flex-col justify-center items-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                value={loginData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="mt-1"
                required
              />
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
            <div className="flex justify-end items-center">
              <p className="text-sm hover:underline cursor-pointer">
              <a href="/signup">Don't have an account? Signup</a>
              </p>
            </div>
            <Button className="w-full mt-4" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
