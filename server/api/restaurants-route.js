import express from "express";
import restaurantsController from "./restaurants-controller.js";
import reviewsController from "./reviews-controller.js";

const router = express.Router();

router.route("/").get(restaurantsController.apiGetRestaurants);
router.route("/id/:id").get(restaurantsController.apiGetRestaurantById);
router.route("/cuisines").get(restaurantsController.apiGetRestaurantCuisines);

router
    .route("/review")
    .post(reviewsController.apiPostReview)
    .put(reviewsController.apiUpdateReview)
    .delete(reviewsController.apiDeleteReview);

export default router;