import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import produce from "immer";
import { db } from "../../firebase/firebaseConfig";
import { loadMails } from "../../utils/loadMails";

const initialState = {
  loading: false,
  mails: [],
  mailActive: null,
  error: "",
};

export const fetchMails = createAsyncThunk(
  "mail/fetchMails",
  async ({ user, path }) => {
    const mails = await loadMails(user.uid, user.email, path);
    return mails;
  }
);

export const saveMail = createAsyncThunk(
  "mail/saveMail",
  async ({ mail, path }) => {
    const doc = await db.collection("mails").add(mail);
    return { mail: { ...mail, id: doc.id }, path };
  }
);

export const favouriteMail = createAsyncThunk(
  "mail/favouriteMail",
  async ({ mail, userId, path, isFavourite = true }, thunkAPI) => {
    const newMail = produce(mail, (draft) => {
      draft.options.favourite[userId] = isFavourite;
    });

    if (path === "/favourites" && !isFavourite) {
      thunkAPI.dispatch(activeMail(null));
      thunkAPI.dispatch(deleteMailState(mail.id));
    } else if (path === "/favourites" && isFavourite) {
      thunkAPI.dispatch(activeMail(newMail));
      thunkAPI.dispatch(addNewMail(newMail));
    } else {
      thunkAPI.dispatch(activeMail(newMail));
      thunkAPI.dispatch(updateMail(newMail));
    }

    await db
      .collection("/mails")
      .doc(mail.id)
      .update({ [`options.favourite.${userId}`]: isFavourite });
  }
);

export const updateWasSeenMail = createAsyncThunk(
  "mail/updateWasSeen",
  async ({ user, mail }) => {
    const senderOrReceiver =
      mail.user.email === user.email ? "sender" : "receiver";
    const wasSeen = `mail.options.wasSeen.${senderOrReceiver}`;
    const update = { [wasSeen]: true };

    await db.collection("/mails").doc(mail.id).update(update);
    mail.mail.options.wasSeen[senderOrReceiver] = true;

    return mail;
  }
);

export const deleteMail = createAsyncThunk(
  "mail/deleteMail",
  async ({ userId, mailId, isDeleted = true }, thunkAPI) => {
    thunkAPI.dispatch(deleteMailState(mailId));
    thunkAPI.dispatch(activeMail(null));

    await db
      .collection("/mails")
      .doc(mailId)
      .update({ [`erased.${userId}`]: isDeleted });
  }
);

const mailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    updateMail: (state, action) => {
      state.mails = state.mails.map((mail) =>
        mail.id === action.payload.mail.id ? action.payload.mail : mail
      );
    },
    activeMail: (state, action) => {
      state.mailActive = action.payload;
    },
    mailLogoutClearing: (state) => {
      state.mailActive = null;
      state.mails = [];
    },
    addNewMail: (state, action) => {
      state.mails = [action.payload, ...state.mails];
    },
    deleteMailState: (state, action) => {
      state.mails = state.mails.filter((mail) => {
        return mail.id !== action.payload;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMails.fulfilled, (state, action) => {
      state.loading = false;
      state.mails = [...action.payload];
    });
    builder.addCase(fetchMails.rejected, (state, action) => {
      state.loading = false;
      state.mails = [];
      state.error = action.payload.message;
    });

    builder.addCase(saveMail.fulfilled, (state, action) => {
      const { mail, path } = action.payload;
      if (
        (path === "/inbox" && mail.mail.to === mail.user.email) ||
        path === "/sent"
      )
        state.mails = [mail, ...state.mails];

      state.mailActive = mail;
    });

    builder.addCase(updateWasSeenMail.fulfilled, (state, action) => {
      state.mails = state.mails.map((mail) =>
        mail.id === action.payload.mail.id ? action.payload : mail
      );
    });
  },
});

export default mailSlice.reducer;
export const {
  updateMail,
  activeMail,
  mailLogoutClearing,
  addNewMail,
  deleteMailState,
} = mailSlice.actions;
