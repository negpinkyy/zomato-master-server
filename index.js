require("dotenv").config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

//data base connection;
import ConnectDB from "./database/connect";

//google authentication config
import googleAuthConfig from './config/google.config';

//private route authenticate config
import privateRouteConfig from "./config/route.config";


//API 
import Auth from "./API/Auth";
import Restaurant from "./API/Restaurant";
import Food from "./API/Food";
import Menu from "./API/Menu";
import Image from "./API/Image";
import Order from "./API/Order";
import Review from "./API/Review";
import User from "./API/User";

//passport config
googleAuthConfig(passport);
privateRouteConfig(passport)

const zomato = express();
zomato.use(cors());
zomato.use(express.json());
zomato.use(helmet());
zomato.use(passport.initialize());
// zomato.use(passport.session());

//application Routes
zomato.use("/auth", Auth);
zomato.use("/restaurant", Restaurant);
zomato.use("/food",Food);
zomato.use("./menu", Menu);
zomato.use("./image", Image);
zomato.use("./review", Review);
zomato.use("./order", Order);
zomato.use("./user", User);

zomato.listen(4000, () => {
  ConnectDB()
    .then(() => {
      console.log("Server is running !!!");
    })
    .catch((error) => {
      console.log("Server is running, but database connection failed...");
      console.log(error);
    });
})