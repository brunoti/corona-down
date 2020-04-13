import React, {useState, useEffect} from 'react';
import {PermissionsAndroid, Text, ScrollView} from 'react-native';
import {useAsyncStorage} from '@react-native-community/async-storage';

import useGeolocation from './containers/Geolocation';

interface GeolocationData {
  lat: number;
  lng: number;
  timestamp: number;
}

const HomeView = () => {
  const [permission, setPermission] = useState<boolean>(false);
  const {getItem, setItem} = useAsyncStorage('location');

  const [error, location] = useGeolocation();

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Precisamos da sua localização',
          message:
            'Precisamos da sua localização para melhor identificar os riscos na sua região.',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setPermission(true);
      } else {
        setPermission(false);
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, [permission]);

  useEffect(() => {
    console.log('location', location);

    if (location.timestamp !== 0) {
      writeItemToStorage(location);
    }
  });

  const writeItemToStorage = async (newValue: any) => {
    // await removeItem();
    let currentValue: string | null = await getItem();
    // setLocationLog(currentValue);
    console.log('currentValue', currentValue);
    if (currentValue) {
      let locationArray = JSON.parse(currentValue);
      locationArray.push(newValue);
      await setItem(JSON.stringify(locationArray));
    } else {
      await setItem(JSON.stringify([newValue]));
    }
  };

  return (
    <ScrollView>
      <Text>Latitude:{location.lat}</Text>
      <Text>Longitude:{location.lng}</Text>
      <Text>Erro:{error}</Text>
      <Text>Log:</Text>
    </ScrollView>
  );
};

export default HomeView;
