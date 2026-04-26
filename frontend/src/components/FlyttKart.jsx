import { useMap } from "react-leaflet";
import { useEffect } from "react";

export const FlyttKart = ({ latitude, longitude }) => {
    const map = useMap();

    useEffect(() => {
        map.flyTo([latitude, longitude], 13);
    }, [latitude, longitude]);

    return null;
};