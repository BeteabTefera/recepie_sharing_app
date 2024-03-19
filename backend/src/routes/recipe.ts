import passport from "passport";
import { Router } from "express";
import { validate } from "./../middlewares/validate";
import {
    createRecipeSchema,
    getRecipeSchema,
    getUserRecipesSchema,
    searchRecipeSchema,
} from "../schema-validations";
import {
  getAllRecipes,
  getRecipe,
  getUserRecipes,
  searchRecipe,
  createRecipe,
} from "./../controllers/recipe";

  
const router = Router();


//get routes for recipe 

router.get(
  "/find",
  passport.authenticate("jwt", { session: false }),
  validate(searchRecipeSchema),
  searchRecipe
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getAllRecipes
);
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  validate(createRecipeSchema),
  createRecipe
);
router.get(
  "/user/:userId",
  passport.authenticate("jwt", { session: false }),
  validate(getUserRecipesSchema),
  getUserRecipes
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validate(getRecipeSchema),
  getRecipe
);

export { router };