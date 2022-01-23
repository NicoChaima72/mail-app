import { db } from "../firebase/firebaseConfig";
import { types } from "../types/types";
import { loadAnswers } from "../utils/loadAnswers";

export const startAddAnswer = (user, mail, answer) => {
  return async (dispatch) => {
    let currentDate = await fetch("http://worldclockapi.com/api/json/utc/now");
    currentDate = await currentDate.json();

    const wasSeen = `mail.options.wasSeen.${
      mail.user.email === answer.user.email ? "receiver" : "sender"
    }`;

    const update = {};
    update[wasSeen] = false;
    update["mail.options.lastUpdated"] = new Date(currentDate.currentDateTime);
    update["mail.options.lastAnswer.user.uid"] = user.uid;
    update["mail.options.lastAnswer.user.name"] = user.displayName;
    update["mail.options.lastAnswer.answer"] = answer.answer.message;
    update["mail.options.thereAreAnswers"] = true;

    await db.collection(`/mails`).doc(mail.id).update(update);

    const doc = await db.collection(`mails/${mail.id}/answers`).add(answer);
    dispatch(addNewAnswer(doc.id, answer));
  };
};

const addNewAnswer = (id, answer) => ({
  type: types.answerAddNew,
  payload: { ...answer, id },
});

export const startLoadingAnswers = (idMail) => {
  return async (dispatch) => {
    const answers = await loadAnswers(idMail);
    dispatch(setAnswers(answers));
  };
};

const setAnswers = (answers) => ({
  type: types.answerLoad,
  payload: answers,
});

export const cleanAnswers = () => ({
  type: types.answerClean,
});
