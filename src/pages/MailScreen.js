import React from "react";
import { useSelector } from "react-redux";
import MailCard from "../components/MailCard";

const MailScreen = ({ search, isSearched, searchMails }) => {
  const { mails } = useSelector((state) => state.mail);
  const auth = useSelector((state) => state.auth);

  return (
    <div className="overflow-y-auto flex flex-col grow space-y-3 pb-36 h-full pr-1">
      {isSearched
        ? searchMails.map((mail) => (
            <MailCard mail={mail} key={mail.id} user={auth}></MailCard>
          ))
        : mails.map((mail) => (
            <MailCard mail={mail} key={mail.id} user={auth}></MailCard>
          ))}
    </div>
  );
};

export default MailScreen;
