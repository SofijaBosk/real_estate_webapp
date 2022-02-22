"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const multer = require("multer");
// "devDependencies": {
//   "@types/multer": "^1.4.5",
//   "nodemon": "^1.18.3",
//   "tslint": "^5.11.0",
//   "typescript": "^3.0.1"
// },
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const storage_1 = require("./storage");
const nekretnine_routes_1 = __importDefault(require("./routes/nekretnine.routes"));
mongoose_1.default.set('useNewUrlParser', true);
mongoose_1.default.set('useFindAndModify', false);
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use("/images", express_1.default.static(path_1.default.join(__dirname, "../images")));
mongoose_1.default.connect('mongodb://localhost:27017/mydb');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('mongo ok');
});
const router = express_1.default.Router();
router.route("/uploadFile").post(storage_1.upload_file.single("image"), (req, res) => {
    const url = req.protocol + '://' + req.get("host");
    res.send({
        imagePath: url + "/images/" + req.file.filename
    });
});
router.use('/users', user_routes_1.default);
router.use('/nekretnine', nekretnine_routes_1.default);
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map