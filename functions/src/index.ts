import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

//boots the app on the server
admin.initializeApp();
//database instance
const db = admin.firestore();

//function
export const createUserDocument = functions.auth
  .user()
  .onCreate(async (user) => {
    db.collection("users")
      .doc(user.uid)
      .set(JSON.parse(JSON.stringify(user)));
  });
