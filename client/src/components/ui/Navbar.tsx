import { Button } from "./button";

export const Navbar = () => {
  return (
    <>
        <div className="flex justify-between bg-black w-screen p-5">
          <div className="flex gap-5 mt-2">
            <div className="text-white font-semibold text-xl">LOGO</div>
            <div className="text-white">Home</div>
            <div className="text-white">Employee List</div>
          </div>
          <div className="flex gap-5">
            <div className="text-white mt-2">Username</div>
            <Button className="bg-white text-black hover:border hover:border-white hover:text-white">
              Logout
            </Button>
          </div>
        </div>
    </>
  );
};
