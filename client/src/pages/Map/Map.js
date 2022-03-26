import { React } from "react";
import { useParams } from "react-router-dom";

const Map = () => {
    const { restaurant_id } = useParams();

    return (
        <div>
            {`Mapa do restaurante ${restaurant_id}`}
        </div>
    );
}

export default Map;