import { db } from "../firebase/firebaseConfig";

export const loadAnswers = async (idMail) => {
  const answerSnap = await db.collection(`/mails/${idMail}/answers`).get();

  const answers = [];

  answerSnap.forEach((snap) => {
    answers.push({ id: snap.id, ...snap.data() });
  });

  answers.sort((a, b) => {
    return b.answer.date - a.answer.date;
  });

  return answers;
};
