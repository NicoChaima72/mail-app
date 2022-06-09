import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { activeMail } from "../features/mail/mailSlice";
import { getTimeString } from "../utils/getTimeString";

const MailCard = ({ mail, user }) => {
  const dispatch = useDispatch();
  const [wasSeen, setWasSeen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (
      (user.email === mail.user.email && !mail.mail.options.wasSeen.sender) ||
      (user.email !== mail.user.email && !mail.mail.options.wasSeen.receiver)
    ) {
      setWasSeen(false);
    } else setWasSeen(true);

    setLoading(false);
  }, [mail, user, dispatch]);

  const setMailActive = (mail) => {
    dispatch(activeMail(mail));

    if (!wasSeen) {
      setWasSeen(true);
    }
  };

  const shorten = (text, max) => {
    return text && text.length > max
      ? text.slice(0, max).split(" ").slice(0, -1).join(" ") + "..."
      : text;
  };

  return (
    <div className="">
      {!loading && (
        <div
          className={`${
            !wasSeen ? "bg-white border-l-white" : "bg-gray-50 border-l-gray-50"
          } border flex w-full items-start space-x-2 rounded p-3 pl-2 text-sm cursor-pointer border-l-4 border-l-white  hover:border-l-sky-500 duration-100 ease-in`}
          onClick={() => setMailActive(mail)}
        >
          <Avatar src={mail.user.photoURL}></Avatar>
          <div className="w-full">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">
                {window.location.pathname === "/sent"
                  ? `To: ${mail.mail.to}`
                  : shorten(mail.user.name, 30)}
              </h3>
              <p
                className={`${
                  !wasSeen ? "text-blue-500" : "text-gray-400"
                } text-sm`}
              >
                {getTimeString(
                  mail.mail.date instanceof Date
                    ? mail.mail.date
                    : mail.mail.date.toDate()
                )}
              </p>
            </div>
            <h5 className="font-medium mb-1">
              {shorten(mail.mail.subject, 50)}
            </h5>

            {window.location.pathname === "/inbox" ? (
              mail.mail.options.thereAreAnswers ? (
                mail.mail.options.lastAnswer.user.uid === user.uid ? (
                  <p>
                    <span className="font-semibold">I Re: </span>
                    {shorten(mail.mail.options.lastAnswer.answer, 110)}
                  </p>
                ) : (
                  <p className="text-gray-500">
                    <span className="font-semibold">
                      {shorten(mail.mail.options.lastAnswer.user.name, 10)} Re:{" "}
                    </span>
                    {shorten(mail.mail.options.lastAnswer.answer, 100)}
                  </p>
                )
              ) : (
                <p className="text-gray-500">
                  {shorten(mail.mail.message, 120)}
                </p>
              )
            ) : (
              <p className="text-gray-500">{shorten(mail.mail.message, 50)}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MailCard;
