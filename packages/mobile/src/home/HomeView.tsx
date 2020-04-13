import React, {useState, useEffect} from 'react';
import {PermissionsAndroid, Text} from 'react-native';
import {useAsyncStorage} from '@react-native-community/async-storage';

import useGeolocation from './containers/Geolocation';

const HomeView = () => {
  const [permission, setPermission] = useState<boolean>(false);
  const {getItem, mergeItem} = useAsyncStorage('location');

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
    console.log('error', error);
    writeItemToStorage(location);
  });

  const writeItemToStorage = async (newValue: any) => {
    let currentValue: string = await getItem();
    currentValue = JSON.parse(currentValue);
    console.log('currentValue', currentValue);
    newValue = [...currentValue, ...newValue];
    console.log('newValue', JSON.stringify(newValue));
    await mergeItem(JSON.stringify(newValue));
  };

  return (
    <>
      <Text>Latitude:{location.lat}</Text>
      <Text>Longitude:{location.lng}</Text>
      <Text>Erro:{error}</Text>
    </>
  );
};

export default HomeView;
