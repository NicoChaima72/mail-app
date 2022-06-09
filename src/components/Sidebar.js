import React, { useEffect } from "react";
import Button from "./Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CachedIcon from "@mui/icons-material/Cached";

import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { closeSidebar, showSendMessage } from "../actions/ui";

import { fetchMails } from "../features/mail/mailSlice";
import SidebarRedirects from "./SidebarRedirects";

const Sidebar = () => {
  const { sidebarOpen } = useSelector((state) => state.ui);
  const { email, uid } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const setCloseSidebar = () => {
      if (window.innerWidth > 1024) dispatch(closeSidebar());
    };
    window.addEventListener("resize", setCloseSidebar);
    return () => {
      window.removeEventListener("resize", setCloseSidebar);
    };
  }, [dispatch]);

  const handleOpenSendMessage = () => {
    dispatch(closeSidebar());
    dispatch(showSendMessage());
  };

  const handleRefresh = () => {
    dispatch(
      fetchMails({
        user: { uid, email },
        path: window.location.pathname,
      })
    );
    dispatch(closeSidebar());
  };

  return (
    <>
      <nav
        className="absolute lg:static w-80 h-screen overflow-y-auto px-4 md:px-8 py-5 ease-in-out duration-75 z-50 bg-white"
        style={{ left: `${sidebarOpen ? "0px" : "-320px"}`, minWidth: "16rem" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl">MailApp</h2>
          <div className="cursor-pointer" onClick={handleRefresh}>
            <CachedIcon></CachedIcon>
          </div>
        </div>
        <Button
          Icon={AddBoxIcon}
          title="New message"
          styles="bg-gradient-to-r from-sky-600 to-sky-400  hover:from-sky-700 hover:to-sky-500 text-white"
          isCustomColor={true}
          onClick={handleOpenSendMessage}
        ></Button>
        <div className="divide-y mt-4">
          <div className="space-y-1 pb-3">
            <SidebarRedirects></SidebarRedirects>
          </div>
          <div className="space-y-1 py-3">
            <h4 className="text-gray-500 text-sm mb-1">MEETS</h4>
            <Button Icon={VideocamOutlinedIcon} title="Create meeting"></Button>
            <Button Icon={ExitToAppOutlinedIcon} title="Join meeting"></Button>
          </div>
          <div className="space-y-1 py-3">
            <h4 className="text-gray-500 text-sm mb-1">TOOLS</h4>
            <Button Icon={ChatBubbleOutlineOutlinedIcon} title="Chat"></Button>
            <Button Icon={DateRangeOutlinedIcon} title="Calendar"></Button>
          </div>
        </div>
      </nav>
      {sidebarOpen && (
        <div
          className="block lg:hidden w-screen h-screen bg-red-500 absolute z-40"
          style={{ backgroundColor: "rgba(0,0,0,.3)" }}
          onClick={() => {
            dispatch(closeSidebar());
          }}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
