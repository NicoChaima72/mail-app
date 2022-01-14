import { Avatar } from "@mui/material";
import React from "react";
import Button from "../Button";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";

const Footer = () => {
  const { photoURL } = useSelector((state) => state.auth);

  return (
    <div className="flex space-x-3 w-full">
      <Avatar src={photoURL}></Avatar>
      <textarea
        rows="1"
        className="border w-full rounded p-2 focus:outline-none"
        placeholder="Message here"
      ></textarea>
      <Button
        title="Send"
        Icon={SendIcon}
        styles="bg-sky-500 hover:bg-sky-400 text-white w-24 text-sm"
        isCustomColor={true}
      ></Button>
    </div>
  );
};

export default Footer;
