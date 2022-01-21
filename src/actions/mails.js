import { db } from "../firebase/firebaseConfig";
import { types } from "../types/types";
import { loadMails } from "../utils/loadMails";

export const startSaveMail = (mail) => {
  return async (dispatch, getState) => {
    const doc = await db.collection("mails").add(mail);
    dispatch(activeMail({ id: doc.id, ...mail }));
    if (
      window.location.pathname === "/inbox" &&
      mail.mail.to === mail.user.email
    )
      dispatch(addNewMail(doc.id, mail));

    if (window.location.pathname === "/sent")
      dispatch(addNewMail(doc.id, mail));
  };
};

export const activeMail = (mail) => ({
  type: types.mailActive,
  payload: mail,
});

export const addNewMail = (id, mail) => ({
  type: types.mailAddNew,
  payload: { id, ...mail },
});

export const startLoadingMails = (idUser, userMail, path) => {
  return async (dispatch) => {
    const mails = await loadMails(idUser, userMail, path);
    dispatch(setMails(mails));
  };
};

export const setMails = (mails) => ({
  type: types.mailLoad,
  payload: mails,
});

export const startFavouriteMail = (mail, idUser, path, isFavourite = true) => {
  return async (dispatch) => {
    const newMail = {
      ...mail,
      options: { favourite: { [idUser]: isFavourite } },
    };

    await db
      .collection("/mails")
      .doc(mail.id)
      .update({ [`options.favourite.${idUser}`]: isFavourite });

    if (path === "/favourites" && !isFavourite) dispatch(deleteMail(mail.id));

    dispatch(mailFavourite(newMail, idUser, isFavourite));
  };
};

const mailFavourite = (mail, idUser, isFavourite = true) => ({
  type: types.mailFavourite,
  payload: { isFavourite, mail, idUser },
});

export const startUpdateWasSeenMail = (user, mail) => {
  return async (dispatch) => {
    const wasSeen = `mail.options.wasSeen.${
      mail.user.email === user.email ? "sender" : "receiver"
    }`;

    const update = { [wasSeen]: true };

    await db.collection(`/mails`).doc(mail.id).update(update);
    mail.mail.options.wasSeen[
      mail.user.email === user.email ? "sender" : "receiver"
    ] = true;

    dispatch(wasSeenMail(mail));
  };
};

const wasSeenMail = (mail) => ({
  type: types.mailWasSeen,
  payload: mail,
});

export const startDeleteMail = (idUser, idMail, isDeleted = true) => {
  return async (dispatch) => {
    await db
      .collection("/mails")
      .doc(idMail)
      .update({ [`erased.${idUser}`]: isDeleted });

    dispatch(deleteMail(idMail));

    // TODO: Add quitar favourite
  };
};

const deleteMail = (idMail) => ({
  type: types.mailDelete,
  payload: idMail,
});

export const mailLogout = () => ({
  type: types.mailLogoutCleaning,
});
