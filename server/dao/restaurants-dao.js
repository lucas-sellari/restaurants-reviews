import mongodb from "mongodb";

const objectId = mongodb.ObjectId;

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
                query = { $text: { $search: filters["name"] } };
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

    static async getRestaurantById(id) {
        try {
            const pipeline = [
                {
                    $match: {
                        _id: new objectId(id)
                    }
                },
                {
                    $lookup: {
                        from: "reviews",
                        let: {
                            id: "$_id"
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$restaurant_id", "$$id"]
                                    }
                                }
                            },
                            {
                                $sort: {
                                    date: -1
                                }
                            }
                        ],
                        as: "reviews"
                    }
                },
                {
                    $addFields: {
                        reviews: "$reviews"
                    }
                }
            ];

            return await restaurants.aggregate(pipeline).next();
        } catch (e) {
            console.error(`Something went wrong in getRestaurantById: ${e}`);
            throw e;
        }
    }

    static async getCuisines() {
        let cuisines = [];
        
        try {
            cuisines = await restaurants.distinct("cuisine");
            return cuisines;
        } catch (e) {
            console.error(`Unable to get cuisines: ${e}`);
            return { error: e };
        }
    }
}