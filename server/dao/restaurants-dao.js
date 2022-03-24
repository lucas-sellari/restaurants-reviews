let restaurants;  //referencia ao DB de restaurantes

export default class restaurantsDAO {
    //método que chamamos ao conectar com a DB pela primeira vez
    static async injectDB(conn) {
        if (restaurants) {
            return;
        }
        try {
            restaurants = await conn.db(process.env.APP_NS).collection("restaurants");
        } catch (e) {
            console.error(`Unable to establish a collection handle in restaurantsDAO: ${e}.`);
        }
    }
    //lista todos os restaurantes na DB, podendo ser de acordo com algumas opções de filtro
    static async getRestaurants({
        filters = null,
        page = 0,
        restaurantsPerPage = 15
    } = {}) {
        let query;

        if (filters) {
            if ("name" in filters) {
                query = { "name": { $eq: filters["name"] } };
            } else if ("cuisine" in filters) {
                query = { "cuisine": { $eq: filters["cuisine"] } };
            } else if ("zipcode" in filters) {
                query = { "address.zipcode": { $eq: filters["zipcode"] } };
            }
        }

        let cursor;

        try {
            cursor = await restaurants.find(query);
        } catch (e) {
            console.error(`Unable to find command; ${e}.`);
            return { restaurantsList: [], numRestaurants: 0 };
        }

        const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page);

        try {
            const restaurantsList = await displayCursor.toArray();
            const numRestaurants = await restaurants.countDocuments(query);

            return { restaurantsList, numRestaurants };
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem when counting documents: ${e}`);
            return { restaurantsList: [], numRestaurants: 0 };
        }
    }
}