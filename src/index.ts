import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { gamesRef } from "./firebase";
import { Filter } from "firebase-admin/firestore";
dotenv.config();

export const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

app.get("/getgames", (req: any, res: any) => {
  gamesRef
    .orderBy("name")
    .get()
    .then((data: any) => {
      const rawData = data.docs.map((e: any) => e.data());
      res.status(200).send(rawData);
    });
});

app.post("/addgame", (req: any, res: any) => {
  gamesRef.doc(req.body.id).set(req.body);
  res.status(200).send(req.body);
});

app.post("/searchgames", (req: any, res: any) => {
  const gameFilter = req.body;

  gamesRef
    .where(
      Filter.and(
        Filter.where(
          "playerAge",
          "<=",
          gameFilter.age ? parseInt(gameFilter.age) : 99
        ),
        Filter.where(
          "minPlayer",
          "<=",
          gameFilter.numberPlayer ? parseInt(gameFilter.numberPlayer) : 99
        ),
        Filter.where(
          "maxPlayer",
          ">=",
          gameFilter.numberPlayer ? parseInt(gameFilter.numberPlayer) : 0
        ),
        Filter.where(
          "playTime",
          "<=",
          gameFilter.gameTime ? parseInt(gameFilter.gameTime) : 999
        )
      )
    )
    .orderBy("name")
    .get()
    .then((data) => {
      const filteredGames = data.docs.map((e: any) => e.data());
      if (gameFilter.name && gameFilter.name.trim() !== "") {
        const fiteredByName = filteredGames.filter((g) =>
          g.name.toLowerCase().includes(gameFilter.name.toLowerCase())
        );
        res.status(200).send(fiteredByName);
        return;
      }
      res.status(200).send(filteredGames);
    });
});

app.listen(port, () => {
  console.log("COLLEGATO");
});
