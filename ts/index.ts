import express, { Express, Request, Response } from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import config from "./config";
import router from "./routes/router"; 

const app: Express = express();

app.use(morgan("dev")); 
app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({ createParentPath: true }));

app.disable("x-powered-by");

app.set("views", "pages");
app.set("view engine", "ejs");

app.use("/api/content/raw", express.static("uploads"));
app.use("/", router); // Use the imported router module

app.listen(config.port, () => {
  console.log(`[~~Daddy~~] Listening for fat cocks on port ${config.port}`);
});
