import { React } from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="restaurant-card">
      <h1 className="restaurant-card__name">{restaurant.name}</h1>
      <h2 className="restaurant-card__simple-text">
        Cuisine: {restaurant.cuisine}
      </h2>
      <h2 className="restaurant-card__simple-text">
        Address:{" "}
        {`${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`}
      </h2>

      <footer className="restaurant-card__footer">
        <Link to={`/${restaurant._id}/reviews`} className="restaurant-card__button">View reviews</Link>
        <Link to={`/${restaurant._id}/map`} className="restaurant-card__button">View in map</Link>
      </footer>
    </div>
  );
};

export default RestaurantCard;
