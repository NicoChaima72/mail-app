import { Avatar } from "@mui/material";
import React from "react";

const Message = ({ mail, user }) => {
  return (
    <div className="flex space-x-3 py-4">
      <Avatar src={user.photoURL} sx={{ width: 48, height: 48 }}></Avatar>
      <div className="text-sm w-full">
        <div className="flex justify-between">
          <h5 className="font-semibold">
            {`${user.name} `}
            <span className="font-thin text-xs">&lt;{user.email}&gt;</span>
          </h5>
          <span className="text-gray-400 text-sm">1 hour ago</span>
        </div>
        {mail.subject && (
          <h2 className="font-bold text-3xl mt-3 mb-4">{mail.subject}</h2>
        )}
        <p>{mail.message}</p>
      </div>
    </div>
  );
};

export default Message;
