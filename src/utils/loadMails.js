import { db } from "../firebase/firebaseConfig";

const cleanDeleted = (snapshots, uid) => {
  return snapshots.docs.filter((mail) => {
    return (mail.data().erased?.[uid] || false) !== true;
  });
};

const removeDuplicates = (arr) => {
  return Object.values(
    arr.reduce((acc, cur) => Object.assign(acc, { [cur.id]: cur }), {})
  );
};

export const loadMails = async (uid, email, path) => {
  let mailSnap = null;
  let mails = [];

  // ////////////////////////////////////////////////////////////////////////
  if (path === "/inbox" || path === "/login" || path === "/") {
    let mailReceivedSnap = await db
      .collection(`/mails`)
      .where("mail.to", "==", email)
      .get();

    let answersReceivedSnap = await db
      .collection(`/mails`)
      .where("user.email", "==", email)
      .where("mail.options.thereAreAnswers", "==", true)
      .get();

    mailReceivedSnap = cleanDeleted(mailReceivedSnap, uid);
    answersReceivedSnap = cleanDeleted(answersReceivedSnap, uid);

    mailReceivedSnap.forEach((snap) => {
      mails.push({ id: snap.id, ...snap.data() });
    });
    answersReceivedSnap.forEach((snap) => {
      mails.push({ id: snap.id, ...snap.data() });
    });

    // ////////////////////////////////////////////////////////////////////////
  } else if (path === "/favourites") {
    mailSnap = await db
      .collection(`/mails`)
      .where(`options.favourite.${uid}`, "==", true)
      .get();
    mailSnap = cleanDeleted(mailSnap, uid);

    mailSnap.forEach((snap) => {
      mails.push({ id: snap.id, ...snap.data() });
    });
    // ////////////////////////////////////////////////////////////////////////
  } else if (path === "/sent") {
    mailSnap = await db
      .collection(`/mails`)
      .where(`user.email`, "==", email)
      .get();
    mailSnap = cleanDeleted(mailSnap, uid);

    mailSnap.forEach((snap) => {
      mails.push({ id: snap.id, ...snap.data() });
    });
    // ////////////////////////////////////////////////////////////////////////
  } else if (path === "/trash") {
    mailSnap = await db
      .collection(`/mails`)
      .where(`erased.${uid}`, "==", true)
      .get();

    mailSnap.forEach((snap) => {
      mails.push({ id: snap.id, ...snap.data() });
    });
    // ////////////////////////////////////////////////////////////////////////
  } else mailSnap = [];

  mails = removeDuplicates(mails);
  mails = mails.sort((a, b) => {
    if (path === "/inbox")
      return (
        b.mail.options.lastUpdated.seconds - a.mail.options.lastUpdated.seconds
      );
    else return b.mail.date.seconds - a.mail.date.seconds;
  });

  return mails;
};
