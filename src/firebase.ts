import dotenv from "dotenv";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, Filter, FieldPath } from "firebase-admin/firestore";
dotenv.config();

const serviceAccount = require("../boardgame-b52eb-firebase-adminsdk-oxx1b-7d3753e9c5.json");

initializeApp({
  credential: cert(serviceAccount),
  databaseURL: process.env.databaseURL,
});
const db = getFirestore();

export const gamesRef = db.collection("games");
