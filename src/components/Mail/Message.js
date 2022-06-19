import { Avatar } from "@mui/material";
import React from "react";
import moment from "moment";

const Message = ({ mail, user }) => {
  return (
    <div className="flex space-x-3 py-4">
      <Avatar src={user.photoURL} sx={{ width: 48, height: 48 }}></Avatar>
      <div className="text-sm w-full mt-1">
        <div className="flex justify-between">
          <h5 className="font-semibold leading-4">
            {`${user.name} `}
            <span className="font-light text-xs">&lt;{user.email}&gt;</span>
          </h5>
          <span className="text-gray-400 text-xs">
            {mail.date instanceof Date
              ? moment(mail.date).format("DD/MM/YY HH:mm")
              : moment(mail.date.toDate()).format("DD/MM/YY HH:mm")}
          </span>
        </div>
        {mail.subject && (
          <div className="">
            <p className="text-xs text-gray-400">To: {mail.to}</p>
            <h2 className="font-bold text-xl md:text-2xl mt-2">
              {mail.subject}
            </h2>
          </div>
        )}
        <p className="mt-2">{mail.message}</p>
      </div>
    </div>
  );
};

export default Message;
