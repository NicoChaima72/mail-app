import React from "react";
import InboxIcon from "@mui/icons-material/Inbox";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { closeSidebar } from "../actions/ui";
import { fetchMails } from "../features/mail/mailSlice";

const NavLinkButton = ({ path, Icon, title }) => {
  const dispatch = useDispatch();
  const { email, uid } = useSelector((state) => state.auth.user);

  const handleRedirect = (path) => {
    dispatch(closeSidebar());
    fetchMails({ user: { uid, email }, path });
  };

  return (
    <NavLink
      to={path}
      className="flex justify-start space-x-2 items-center py-2 px-4 w-full text-sm font-medium rounded-md bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-500"
      activeClassName="bg-blue-50 text-blue-500"
      onClick={() => handleRedirect(path)}
    >
      <Icon></Icon>
      <p>{title}</p>
    </NavLink>
  );
};

const SidebarRedirects = () => {
  return (
    <div>
      <NavLinkButton
        path="/inbox"
        Icon={InboxIcon}
        title="Inbox"
      ></NavLinkButton>
      <NavLinkButton
        path="/favourites"
        Icon={StarBorderIcon}
        title="Favourites"
      ></NavLinkButton>
      <NavLinkButton
        path="/sent"
        Icon={SendOutlinedIcon}
        title="Sent"
      ></NavLinkButton>
      <NavLinkButton
        path="/trash"
        Icon={DeleteOutlineIcon}
        title="Trash"
      ></NavLinkButton>
    </div>
  );
};

export default SidebarRedirects;
