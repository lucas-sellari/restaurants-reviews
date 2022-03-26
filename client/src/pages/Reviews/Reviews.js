import { React } from "react";
import { useParams } from "react-router-dom";

const Reviews = () => {
    const { restaurant_id } = useParams();
    console.log(restaurant_id);

    return (
        <div>
            {`Reviews do restaurante ${restaurant_id}`}
        </div>
    );
}

export default Reviews;