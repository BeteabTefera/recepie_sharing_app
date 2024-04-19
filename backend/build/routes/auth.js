"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const schema_validations_1 = require("../schema-validations");
const auth_1 = require("./../controllers/auth");
const router = express_1.default.Router();
exports.router = router;
router.post("/join", (0, middlewares_1.validate)(schema_validations_1.joinSchema), auth_1.registerOrLogin);
