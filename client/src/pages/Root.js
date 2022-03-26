import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ReviewForm from "./Reviews/ReviewForm.js";
import Reviews from "./Reviews/Reviews.js";
import Login from "./Login/Login.js";
import RestaurantsList from "./Restaurants/RestaurantsList.js";



const Root = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/:id/reviews/create" element={<ReviewForm />} />
                <Route path="/:id/reviews/:revid/edit" element={<ReviewForm />} />
                <Route path="/:id/reviews" element={<Reviews />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<RestaurantsList />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Root;