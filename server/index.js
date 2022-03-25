import app from "./server.js";
import restaurantsDAO from "./dao/restaurants-dao.js";
import reviewsDAO from "./dao/reviews-dao.js";
import mongodb from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = mongodb.MongoClient;
const port = process.env.PORT || 8000;

mongoClient.connect(
    process.env.APP_DB_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 3000,
        useNewUrlParser: true
    }
).catch(err => {
    console.error(err.stack);
    process.exit(1);
}).then(async client => {
    await restaurantsDAO.injectDB(client);
    await reviewsDAO.injectDB(client);
    app.listen(port, () => {
        console.log(`Our server is connected to the DB and is listening on port ${port} ^-^ `);
    });
});