import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { CircularProgress } from "@mui/material";

import Footer from "./Footer";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { updateWasSeenMail } from "../../features/mail/mailSlice";
import {
  startFetchAnswers,
  cleanAnswers,
} from "../../features/answer/answerSlice";
// import { cleanAnswers } from "../../actions/answers";

const Mail = () => {
  const dispatch = useDispatch();
  const { mailActive } = useSelector((state) => state.mail);
  const user = useSelector((state) => state.auth.user);
  const answer = useSelector((state) => state.answer);

  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const containerMessages = document.getElementById("container-messages");
    containerMessages.scrollTo({
      top: containerMessages.scrollHeight,
      behavior: "smooth",
    });
  }, [answer.answers]);

  useEffect(() => {
    setIsDeleted(mailActive.erased?.[user.uid] || false);

    if (mailActive.mail.options.thereAreAnswers)
      dispatch(startFetchAnswers(mailActive.id));

    return () => {
      dispatch(cleanAnswers());
    };
  }, [dispatch, mailActive.id, mailActive.erased, mailActive.mail, user]);

  useEffect(() => {
    const senderOrReceiver =
      mailActive.user.email === user.email ? "sender" : "receiver";

    if (!mailActive.mail.options.wasSeen[senderOrReceiver]) {
      dispatch(updateWasSeenMail({ user, mail: mailActive }));
    }
  }, [mailActive, user, dispatch]);

  return (
    <div className="h-full flex flex-col relative">
      <Nav isDeleted={isDeleted}></Nav>
      <div
        id="container-messages"
        className="overflow-y-auto flex flex-col grow my-4 space-y-3 divide-y pb-14 p-4"
      >
        <Message mail={mailActive.mail} user={mailActive.user}></Message>
        {answer.loading ? (
          <div className="text-center pt-10">
            <CircularProgress color="primary" size={20}></CircularProgress>
          </div>
        ) : (
          [...answer.answers]
            .reverse()
            .map((answer) => (
              <Message
                key={answer.id}
                mail={answer.answer}
                user={answer.user}
              ></Message>
            ))
        )}
      </div>
      {!isDeleted && <Footer></Footer>}
    </div>
  );
};

export default Mail;
