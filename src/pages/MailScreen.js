import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MailCard from "../components/MailCard";
import { CircularProgress } from "@mui/material";
import { useLocation } from "react-router-dom";
import { fetchMails } from "../features/mail/mailSlice";

const MailScreen = ({ search, isSearched, searchMails }) => {
  const { mails, loading } = useSelector((state) => state.mail);
  const auth = useSelector((state) => state.auth.user);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMails({ user: auth, path: location.pathname }));
  }, [location.pathname, auth, dispatch]);

  if (loading)
    return (
      <div className="text-center mt-10">
        <CircularProgress color="primary" size={20}></CircularProgress>
      </div>
    );

  return (
    <div className="overflow-y-auto flex flex-col grow space-y-3 pb-36 h-full pr-1">
      {isSearched ? (
        searchMails.length > 0 ? (
          searchMails.map((mail) => (
            <MailCard mail={mail} key={mail.id} user={auth}></MailCard>
          ))
        ) : (
          <div className="text-center mt-5 text-gray-400">No hay registros</div>
        )
      ) : mails.length > 0 ? (
        mails.map((mail) => (
          <MailCard mail={mail} key={mail.id} user={auth}></MailCard>
        ))
      ) : (
        <div className="text-center mt-5 text-gray-400">No hay registros</div>
      )}
    </div>
  );
};

export default MailScreen;
