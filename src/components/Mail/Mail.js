import React from "react";
import Nav from "./Nav";

import Footer from "./Footer";
import Message from "./Message";
import { useSelector } from "react-redux";

const Mail = () => {
  const { mailActive } = useSelector((state) => state.mail);

  return (
    <div className="h-screen flex flex-col p-4">
      <Nav></Nav>
      <div className="overflow-y-auto flex flex-col grow my-4 space-y-3 divide-y pr-2 pb-14">
        <Message mail={mailActive.mail} user={mailActive.user}></Message>
        {/* <Message></Message>
        <Message></Message>
        <Message></Message> */}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Mail;
