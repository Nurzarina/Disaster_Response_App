// This function is a utility that takes a set of coordinates (longitude and latitude) 
// and queries the OpenStreetMap Nominatim API to retrieve the corresponding city and state. 
// It includes error handling and default values to ensure the function returns a valid result 
// even if something goes wrong during the API request.

import axios from 'axios';

export const reverseGeocode = async (coordinates) => {
    const [lng, lat] = coordinates;
  
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
        params: {
          lat,
          lon: lng,
          format: 'json',
          addressdetails: 1,
        },
      });
  
      console.log('API Response:', response.data);
  
      const data = response.data;
      if (!data || !data.address) {
        console.log('No address data found for the given coordinates');
        return { city: 'Unknown city', state: 'Unknown state' };
      }
  
      console.log('Address Data:', data.address);
  
      const city = data.address.city || data.address.town || data.address.village || 'Unknown city';
      const state = data.address.state || data.address.region || 'Unknown state';
  
      return { city, state };
    } catch (error) {
      console.error('Error fetching geocode data:', error);
      return { city: 'Unknown city', state: 'Unknown state' };
    }
  };
