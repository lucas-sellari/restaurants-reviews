import express from "express";
import restaurantsController from "../dao/restaurants-controller.js";

const router = express.Router();

router.route("/").get(restaurantsController.apiGetRestaurants);

export default router;