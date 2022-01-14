import { db } from "../firebase/firebaseConfig";

export const loadMails = async (email) => {
  const authorSnap = await db
    .collection(`/mails`)
    .where("user.email", "==", email)
    .get();

  const receiverSnap = await db
    .collection(`/mails`)
    .where("mail.to", "==", email)
    .get();

  const mails = [];

  authorSnap.forEach((snap) => {
    mails.push({ id: snap.id, ...snap.data() });
  });
  receiverSnap.forEach((snap) => {
    mails.push({ id: snap.id, ...snap.data() });
  });

  return mails;
};
