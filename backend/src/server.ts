import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from "path";
const multer = require("multer");
// "devDependencies": {
//   "@types/multer": "^1.4.5",
//   "nodemon": "^1.18.3",
//   "tslint": "^5.11.0",
//   "typescript": "^3.0.1"
// },

import userRouter from './routes/user.routes';
import { upload_file } from "./storage";
import nekretnineRouter from './routes/nekretnine.routes';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "../images")));


mongoose.connect('mongodb://localhost:27017/mydb');
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('mongo ok')
});

const router = express.Router();

router.route("/uploadFile").post(upload_file.single("image"),(req, res)=>{
    const url = req.protocol + '://' + req.get("host");
    res.send({
      imagePath: url + "/images/" + req.file.filename
  });
});

 router.use('/users', userRouter);
 router.use('/nekretnine', nekretnineRouter)

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));