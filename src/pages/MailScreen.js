import { Avatar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeMail } from "../actions/mails";

const MailScreen = ({ filter = "" }) => {
  const dispatch = useDispatch();
  const { mails } = useSelector((state) => state.mail);

  const setMailActive = (mail) => {
    dispatch(activeMail(mail));
  };

  return (
    <div className="overflow-y-auto space-y-3 h-full pb-24 pr-1">
      {mails.map((mail) => (
        <div
          key={mail.id}
          className="flex w-full items-start space-x-2 bg-white rounded p-3 pl-2 text-sm cursor-pointer border-l-4 border-l-white  hover:border-l-sky-500 duration-100 ease-in"
          onClick={() => setMailActive(mail)}
        >
          <Avatar src={mail.user.photoURL}></Avatar>
          <div className="w-full">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{mail.user.name}</h3>
              <p className="text-gray-400 text-sm">Just now</p>
            </div>
            <h5 className="font-medium mb-1">{mail.mail.subject}</h5>
            <p className="text-gray-500">{mail.mail.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MailScreen;
