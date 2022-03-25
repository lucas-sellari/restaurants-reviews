import reviewsDAO from "../dao/reviews-dao.js";

export default class reviewsController {
    static async apiPostReview(req, res, next) {
        try {
            const restaurantId = req.body.restaurant_id;
            const review = req.body.text;
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            };
            const date = new Date();

            const reviewResponse = await reviewsDAO.addReview(
                restaurantId,
                userInfo,
                review,
                date
            );
            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiUpdateReview(req, res, next) {
        try {
            const reviewId = req.body.review_id;
            const text = req.body.text;
            const date = new Date();

            const reviewResponse = await reviewsDAO.updateReview(
                reviewId,
                req.body.user_id,
                text,
                date
            );

            let { error } = reviewResponse;
            if (error) {
                res.status(400).json({ error });
            }

            if (reviewResponse.modifiedCount === 0) {
                throw new Error("Unable to update the review - user may not be the original poster");
            }

            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiDeleteReview(req, res, next) {
        try {
            const reviewId = req.query.id;
            const userId = req.body.user_id; //não deveria ter nada no body para ações de delete :P NÃO USAR EM PRODUÇÃO
            
            const reviewResponse = await reviewsDAO.deleteReview(
                reviewId,
                userId
            );

            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}