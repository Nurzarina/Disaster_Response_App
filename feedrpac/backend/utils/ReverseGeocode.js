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
        return { city: 'Unknown', state: 'Unknown' };
      }
  
      console.log('Address Data:', data.address);
  
      const city = data.address.city || data.address.town || data.address.village || 'Unknown';
      const state = data.address.state || data.address.region || 'Unknown';
  
      return { city, state };
    } catch (error) {
      console.error('Error fetching geocode data:', error);
      return { city: 'Unknown', state: 'Unknown' };
    }
  };
