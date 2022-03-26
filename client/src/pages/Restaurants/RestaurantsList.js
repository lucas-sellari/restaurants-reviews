import { React } from "react";
import RestaurantCard from "../../components/Restaurant/Card.js";

const restaurant = {
    _id: "5eb3d668b31de5d588f4292a",
    address: {
      building: "2780",
      coord: [-73.98241999999999, 40.579505],
      street: "Stillwell Avenue",
      zipcode: "11224",
    },
    borough: "Brooklyn",
    cuisine: "American",
    grades: [
      { date: "2014-06-10T00:00:00.000Z", grade: "A", score: 5 },
      { date: "2013-06-05T00:00:00.000Z", grade: "A", score: 7 },
      { date: "2012-04-13T00:00:00.000Z", grade: "A", score: 12 },
      { date: "2011-10-12T00:00:00.000Z", grade: "A", score: 12 },
    ],
    name: "Riviera Caterer",
    restaurant_id: "40356018",
  };

const RestaurantsList = () => {
    return (
        <div style={{
            maxWidth: 300,
            margin: "30px auto"
        }}>
            <RestaurantCard restaurant={restaurant}/>
        </div>
    );
}

export default RestaurantsList;