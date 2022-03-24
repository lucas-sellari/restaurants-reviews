import restaurantsDAO from "./restaurants-dao.js";

export default class restaurantsController {
    static async apiGetRestaurants(req, res, next) {
        const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 15;
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;

        let filters = {};

        if (req.query.name) {
            filters.name = req.query.name;
        } else if (req.query.cuisine) {
            filters.cuisine = req.query.cuisine;
        } else if (req.zipcode) {
            filters.zipcode = req.query.zipcode;
        }

        const { restaurantsList, numRestaurants } = await restaurantsDAO.getRestaurants({
            filters,
            page,
            restaurantsPerPage
        });

        let response = {
            restaurants: restaurantsList,
            page: page,
            filters: filters,
            entries_per_page: restaurantsPerPage,
            numRestaurants: numRestaurants
        };

        res.json(response);
    }
}