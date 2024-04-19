"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const passport_1 = __importDefault(require("passport"));
const express_1 = require("express");
const validate_1 = require("./../middlewares/validate");
const schema_validations_1 = require("../schema-validations");
const recipe_1 = require("./../controllers/recipe");
const router = (0, express_1.Router)();
exports.router = router;
//get routes for recipe 
router.get("/find", passport_1.default.authenticate("jwt", { session: false }), (0, validate_1.validate)(schema_validations_1.searchRecipeSchema), recipe_1.searchRecipe);
router.get("/", passport_1.default.authenticate("jwt", { session: false }), recipe_1.getAllRecipes);
router.post("/create", passport_1.default.authenticate("jwt", { session: false }), (0, validate_1.validate)(schema_validations_1.createRecipeSchema), recipe_1.createRecipe);
router.get("/user/:userId", passport_1.default.authenticate("jwt", { session: false }), (0, validate_1.validate)(schema_validations_1.getUserRecipesSchema), recipe_1.getUserRecipes);
router.get("/:id", passport_1.default.authenticate("jwt", { session: false }), (0, validate_1.validate)(schema_validations_1.getRecipeSchema), recipe_1.getRecipe);
