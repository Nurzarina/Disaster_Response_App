import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import pinUserIcon from '../../assets/user-pin.png';
import { DisasterIcons } from '../others/EmergencyIcons';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import './EventsMap.css';

// Custom icon for events (optional)
const eventIcon = new L.Icon({
    iconUrl: pinUserIcon,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    shadowUrl: shadowUrl,
    shadowSize: [30, 30],
});

const EventsMap = ({ events }) => {
    // Define the bounds of Malaysia
    const malaysiaBounds = [
        [7.5, 99.0],  // Northwest corner
        [1.0, 119.5]  // Southeast corner
    ];

    // Prepare markers for the map
    const markers = events
    .filter(event => event.latitude && event.longitude)  // Filter out events with missing coordinates
    .map((event, index) => {
        // Get the correct icon and color for the disaster type
        const { icon: DisasterIcon, color } = DisasterIcons[event.disastertype] || {};

        return (
            <Marker
                key={index}
                position={[event.latitude, event.longitude]}
                icon={eventIcon}
            >
                <Popup>
                    {DisasterIcon && (
                        <>
                            <DisasterIcon color={color} size={32} style={{ marginRight: '10px' }} />
                            <strong>{event.disastertype}</strong>
                        </>
                    )}
                    <br />
                    <strong>Severity:</strong> {event.severity}
                </Popup>
            </Marker>
        );
    });

    return (
        <MapContainer
            className='events-map'
            center={[4.2105, 101.9758]} // Center the map over Malaysia
            zoom={5}
            maxBounds={malaysiaBounds}  // Restrict panning within Malaysia
            maxBoundsViscosity={1.0}  // Prevent panning outside the bounds
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
             {markers.length > 0 ? markers : <div>No events to display</div>}
        </MapContainer>
    );
};

export default EventsMap;