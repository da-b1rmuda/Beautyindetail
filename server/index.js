import *  as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import errorMiddleware from './middleware/error.middleware.js';
import userRouter from "./routers/user.router.js";
import masterRouter from"./routers/master.router.js";
import hairdresserRouter from "./routers/hairdresser.router.js";
import makeupRouter from "./routers/makeup.router.js"
import nailbarRouter from "./routers/nailbar.router.js";
import depRouter from "./routers/dep.routers.js";
import recordRouter from "./routers/record.router.js";
import visitorRouter from "./routers/visitor.router.js";
import categoryRouter from "./routers/categorey.routers.js";
import servicesRouter from "./routers/services.router.js";

dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();


//#region Cors
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    optionSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(function (req, res, next) {
  // HOST
  // res.setHeader('Access-Control-Allow-Origin', 'https://jlk0wqq0-3000.euw.devtunnels.ms');
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  } else {
    next();
  }
});
//#endregion

//#region routes
app.use('/users', userRouter);
app.use('/masters', masterRouter);
app.use('/hairdreser', hairdresserRouter);
app.use('/makeup', makeupRouter);
app.use('/nailbar', nailbarRouter);
app.use('/dep', depRouter);
app.use('/record', recordRouter);
app.use('/visitor', visitorRouter);
app.use('/category', categoryRouter);
app.use('/services', servicesRouter);
//#endregion

app.use(errorMiddleware);

const start = () => {
  try {
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
