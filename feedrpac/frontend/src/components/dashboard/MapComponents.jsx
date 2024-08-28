import { useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import pinUserIcon from '../../assets/user-pin.png';

const MapComponent = ({ location, onLocationChange }) => {
    const markerRef = useRef(null);

    // Define the bounds of Malaysia
    const malaysiaBounds = [
        [7.5, 99.0],  // Northwest corner
        [1.0, 119.5]  // Southeast corner
    ];

    // Update location when the map is clicked
    const MapClickHandler = () => {
        useMapEvents({
            click: (event) => {
                const lat = event.latlng.lat;
                const lng = event.latlng.lng;
                onLocationChange(lat, lng, `${lat}, ${lng}`);
                if (markerRef.current) {
                    markerRef.current.setLatLng([lat, lng]);
                }
            }
        });
        return null;
    };

    // Custom icon (optional)
    const customIcon = new L.Icon({
        iconUrl: pinUserIcon,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        shadowSize: [30, 30],
    });

    return (
        <MapContainer
            center={location}
            zoom={5}
            style={{ height: '300px', width: '100%', borderRadius: '10px' }}
            maxBounds={malaysiaBounds}  // Restrict panning within Malaysia
            maxBoundsViscosity={1.0}  // Prevent panning outside the bounds
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
                position={location}
                icon={customIcon}
                draggable={true}
                eventHandlers={{
                    dragend: (event) => {
                        const latLng = event.target.getLatLng();
                        onLocationChange(latLng.lat, latLng.lng, `${latLng.lat}, ${latLng.lng}`);
                    }
                }}
                ref={markerRef}
            />
            <MapClickHandler />
        </MapContainer>
    );
};

export default MapComponent;