import { Router } from "express";

import { registerOrLogin } from "./../controllers/auth";
import { validate } from "./../middlewares";
import { joinSchema } from "../schema-validations";

const router = Router();

router.post("/join", validate(joinSchema), registerOrLogin);

export { router };
