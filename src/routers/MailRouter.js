import React, { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Mail from "../components/Mail/Mail";
import Navbar from "../components/Navbar";
import SendMail from "../components/sendMail/SendMail";
import Sidebar from "../components/Sidebar";
import { useForm } from "../hooks/useForm";
import MailScreen from "../pages/MailScreen";

const MailRouter = () => {
  const { sendMessageOpen } = useSelector((state) => state.ui);
  const { mailActive } = useSelector((state) => state.mail);

  const [searchMails, setSearchMails] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const [formValues, handleInputChange] = useForm({ search: "" });
  const { search } = formValues;

  useLayoutEffect(() => {
    const appContainer = document.getElementById("app-container");
    appContainer.style.height = window.innerHeight + "px";
  }, []);

  return (
    <div className="app flex text-gray-700 w-screen" id="app-container">
      <Sidebar></Sidebar>
      <div className="app__body grid grid-rows-1 grid-cols-12 w-full h-full">
        <div
          className={`${
            !!mailActive
              ? "hidden md:block md:col-span-5"
              : "col-span-12 md:col-span-12"
          } p-4 h-full flex flex-col bg-gray-100`}
        >
          <Navbar
            search={search}
            handleInputChange={handleInputChange}
            setSearchMails={setSearchMails}
            setIsSearched={setIsSearched}
          ></Navbar>
          <Switch>
            <Route path="/inbox">
              <MailScreen
                search={search}
                isSearched={isSearched}
                searchMails={searchMails}
              ></MailScreen>
            </Route>
            <Route path="/favourites">
              <MailScreen
                search={search}
                isSearched={isSearched}
                searchMails={searchMails}
              ></MailScreen>
            </Route>
            <Route path="/sent">
              <MailScreen
                search={search}
                isSearched={isSearched}
                searchMails={searchMails}
              ></MailScreen>
            </Route>
            <Route path="/trash">
              <MailScreen
                search={search}
                isSearched={isSearched}
                searchMails={searchMails}
              ></MailScreen>
            </Route>
            <Redirect to="/inbox"></Redirect>
          </Switch>
          {sendMessageOpen && <SendMail></SendMail>}
        </div>
        {mailActive && (
          <div className="col-span-12 h-full md:col-span-7">
            <Mail></Mail>
          </div>
        )}
      </div>
    </div>
  );
};

export default MailRouter;
