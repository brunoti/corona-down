import {useState, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';

interface GeolocationData {
  lat: number;
  lng: number;
  timestamp: number;
}

const useGeolocation = () => {
  const [error, setError] = useState('');
  const [state, setState] = useState<GeolocationData>({
    lat: 0,
    lng: 0,
    timestamp: 0,
  });

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      (pos) => {
        setError('');
        setState({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          timestamp: pos.timestamp,
        });
      },
      (err) => setError(err.message),
      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 0,
      },
    );

    return () => Geolocation.clearWatch(watchId);
  }, []);

  return [error, state];
};

export default useGeolocation;
