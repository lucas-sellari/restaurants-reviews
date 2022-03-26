import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ReviewForm from "./Reviews/ReviewForm.js";
import Reviews from "./Reviews/Reviews.js";
import Map from "./Map/Map.js";
import Login from "./Login/Login.js";
import RestaurantsList from "./Restaurants/RestaurantsList.js";

const Root = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/:restaurant_id/reviews/create" element={<ReviewForm />} />
                <Route path="/:restaurant_id/reviews/:review_id/edit" element={<ReviewForm />} />
                <Route path="/:restaurant_id/reviews" element={<Reviews />} />
                <Route path="/:restaurant_id/map" element={<Map />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<RestaurantsList />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Root;