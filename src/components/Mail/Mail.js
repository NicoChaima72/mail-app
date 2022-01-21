import React, { useEffect, useState } from "react";
import Nav from "./Nav";

import Footer from "./Footer";
import Message from "./Message";
import { useSelector } from "react-redux";

const Mail = () => {
  const { mailActive } = useSelector((state) => state.mail);
  const { uid } = useSelector((state) => state.auth);
  const { answers } = useSelector((state) => state.answer);

  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    setIsDeleted(mailActive.erased?.[uid] || false);
  }, [mailActive.erased, uid]);

  return (
    <div className="h-screen flex flex-col p-4">
      <Nav isDeleted={isDeleted}></Nav>
      <div className="overflow-y-auto flex flex-col grow my-4 space-y-3 divide-y pr-2 pb-14">
        {answers.map((answer) => (
          <Message
            key={answer.id}
            mail={answer.answer}
            user={answer.user}
          ></Message>
        ))}
        <Message mail={mailActive.mail} user={mailActive.user}></Message>
      </div>
      {!isDeleted && <Footer></Footer>}
    </div>
  );
};

export default Mail;
