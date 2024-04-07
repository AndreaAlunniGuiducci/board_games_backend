import dotenv from "dotenv";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, Filter, FieldPath } from "firebase-admin/firestore";
dotenv.config();

// const serviceAccount = require("../boardgame-b52eb-firebase-adminsdk-oxx1b-7d3753e9c5.json");
const serviceAccount = JSON.stringify({
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERTURL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
});
initializeApp({
  credential: cert(serviceAccount),
  databaseURL: process.env.databaseURL,
});
const db = getFirestore();

export const gamesRef = db.collection("games");
