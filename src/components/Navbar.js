import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../actions/ui";
import { Avatar } from "@mui/material";
import { useHistory } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

const Navbar = ({
  search,
  handleInputChange,
  setSearchMails,
  setIsSearched,
}) => {
  const dispatch = useDispatch();
  const { photoURL } = useSelector((state) => state.auth.user);
  const { mails } = useSelector((state) => state.mail);
  const history = useHistory();

  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(window.location.pathname.replace("/", ""));
  }, []);

  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      setPathname(location.pathname.replace("/", ""));
    });

    return () => {
      unlisten();
    };
  }, [history]);

  useEffect(() => {
    if (search.length > 2) {
      const newMails = mails.filter(
        (mail) =>
          mail.mail.to.toLowerCase().includes(search.toLowerCase()) ||
          mail.mail.subject.toLowerCase().includes(search.toLowerCase())
      );

      setSearchMails(newMails);
      setIsSearched(true);
    } else {
      setSearchMails([]);
      setIsSearched(false);
    }
  }, [search, mails, setIsSearched, setSearchMails]);

  const handleLogout = () => {
    if (window.confirm("Logout?")) dispatch(logout());
  };

  return (
    <div className="border border-gray-400 text-gray-700 rounded flex items-center space-x-2 px-2 mb-3">
      <div className="flex items-center space-x-2 w-full">
        <div
          className="block lg:hidden cursor-pointer"
          onClick={() => dispatch(toggleSidebar())}
        >
          <MenuIcon></MenuIcon>
        </div>
        <form className="w-full">
          <input
            type="search"
            className="bg-transparent focus:outline-none placeholder:text-gray-700 w-full py-2"
            placeholder={`Search in ${pathname}`}
            value={search}
            onChange={handleInputChange}
            name="search"
          />
        </form>
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
