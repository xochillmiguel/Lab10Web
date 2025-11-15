import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./router/router.js";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use("/", router);

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
