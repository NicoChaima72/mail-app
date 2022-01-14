import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Mail from "../components/Mail/Mail";
import Navbar from "../components/Navbar";
import SendMail from "../components/sendMail/SendMail";
import Sidebar from "../components/Sidebar";
import MailScreen from "../pages/MailScreen";

const MailRouter = () => {
  const { sendMessageOpen } = useSelector((state) => state.ui);
  const { mailActive } = useSelector((state) => state.mail);

  return (
    <div className="app flex text-gray-700">
      <Sidebar></Sidebar>
      <div className="app__body grid grid-cols-12 w-full">
        <div
          className={`${
            !!mailActive
              ? "hidden md:block md:col-span-5"
              : "col-span-12 md:col-span-12"
          } p-4 h-screen flex flex-col bg-gray-100`}
        >
          <Navbar></Navbar>
          <Switch>
            <Route path="/" component={MailScreen}></Route>
          </Switch>
          {sendMessageOpen && <SendMail></SendMail>}
        </div>
        {mailActive && (
          <div className="col-span-12 md:col-span-7">
            <Mail></Mail>
          </div>
        )}
      </div>
    </div>
  );
};

export default MailRouter;
