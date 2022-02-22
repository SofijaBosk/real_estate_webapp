//  import { Express } from 'express';
// import { Multer } from 'multer';

 const multer = require("multer");

 import path from "path";


const MIME_TYPE_MAP = new Map([
    ['image/png', 'png'],
    ['image/jpeg', 'jpeg'],
    ['image/jpg', 'jpg'],
]);

const storage = multer.diskStorage({
  destination: function (
    req: Express.Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void
  ) {
    callback(null, path.join(__dirname, '../images'));
  },
  filename: function (
    req: Express.Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void
  ) {
    console.log("storage", file);
    let name = file.originalname.toLowerCase().replace(',','').split(" ").join("-");
    const ext = MIME_TYPE_MAP.get(file.mimetype);
    console.log(name);
    console.log(ext);
    callback(null, name + "-" + Date.now() + "." + ext);
  },
});

export const upload_file = multer({"storage": storage});