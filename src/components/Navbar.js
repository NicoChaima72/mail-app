import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../actions/ui";
import { Avatar } from "@mui/material";
import { startLogout } from "../actions/auth";

const Navbar = () => {
  const dispatch = useDispatch();
  const { photoURL } = useSelector((state) => state.auth);

  const handleLogout = () => {
    if (window.confirm("Logout?")) dispatch(startLogout());
  };

  return (
    <div className="border border-gray-400 text-gray-700 rounded flex items-center px-2 mb-3">
      <div className="flex items-center space-x-2 w-full">
        <div
          className="block lg:hidden cursor-pointer"
          onClick={() => dispatch(toggleSidebar())}
        >
          <MenuIcon></MenuIcon>
        </div>
        <input
          type="search"
          className="bg-transparent focus:outline-none placeholder:text-gray-700 w-full py-2"
          placeholder="Search here..."
        />
      </div>
      <div className="ml-auto cursor-pointer" onClick={handleLogout}>
        <Avatar
          src={photoURL}
          sx={{ width: 32, height: 32, border: 1 }}
        ></Avatar>
      </div>
    </div>
  );
};

export default Navbar;
