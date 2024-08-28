import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import pinUserIcon from '../../assets/map-pin.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DisasterIcons } from '../others/EmergencyIcons';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import './EventsMap.css';


// Custom icon creation function
const createCustomIcon = () => {
    const iconDiv = document.createElement('div');
    iconDiv.className = 'bouncing-marker'; // Apply the bouncing class

    const iconImage = document.createElement('img');
    iconImage.src = pinUserIcon;
    iconImage.style.width = '30px';
    iconImage.style.height = '30px';

    iconDiv.appendChild(iconImage);
    return L.divIcon({ className: '', html: iconDiv.outerHTML });
};

// Use custom icon in Leaflet
const eventIcon = createCustomIcon();

const EventsMap = ({ events }) => {
    // Define the bounds of Malaysia
    const malaysiaBounds = [
        [7.5, 99.0],  // Northwest corner
        [1.0, 119.5]  // Southeast corner
    ];

    // Prepare markers for the map
    const markers = events
        .filter(event => event.latitude && event.longitude)
        .map((event, index) => {
            // Find the disaster object that matches the event's disaster type
            const disaster = DisasterIcons.find(d => d.type === event.disastertype) || {};
            const { icon, color } = disaster;

            // Log to help with debugging
            console.log(event.disastertype, icon, color);

            return (
                <Marker
                    key={index}
                    position={[event.latitude, event.longitude]}
                    icon={eventIcon}
                >
                    <Popup>
                        {icon && (
                            <div>
                                <FontAwesomeIcon icon={icon} color={color} size="2x" style={{ marginRight: '10px' }} />
                                <strong>{event.disastertype}</strong>
                            </div>
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