import { db } from "../firebase/firebaseConfig";
import {} from "../reducers/mailReducer";
import { types } from "../types/types";
import { loadMails } from "../utils/loadMails";

export const startSaveMail = (mail) => {
  return async (dispatch, getState) => {
    const doc = await db.collection("mails").add(mail);
    dispatch(activeMail(doc.id, mail));
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

export const startLoadingMails = (email) => {
  return async (dispatch) => {
    const mails = await loadMails(email);
    dispatch(setMails(mails));
  };
};

export const setMails = (mails) => ({
  type: types.mailLoad,
  payload: mails,
});

export const mailLogout = () => ({
  type: types.mailLogoutCleaning,
});
