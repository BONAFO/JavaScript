import express from "express";
import cors from "cors";
import {} from "./db/conexion.js";



//ROUTES
import { login_routes } from "./routes/user/login.js";

//ROUTES

//CORS

const whitelist = [];
const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }

//CORS


const app = express();
const port = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(login_routes);


app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
