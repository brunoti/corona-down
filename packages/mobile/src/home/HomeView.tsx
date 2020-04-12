import React, {useState, useEffect} from 'react';
import {PermissionsAndroid, Text} from 'react-native';
import {useAsyncStorage} from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';

const HomeView = () => {
  const [permission, setPermission] = useState<boolean>(false);
  const {getItem, mergeItem} = useAsyncStorage('location');

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

  const writeItemToStorage = async (newValue: any) => {
    let currentValue: string = await getItem();
    currentValue = JSON.parse(currentValue);
    console.log('currentValue', currentValue);
    newValue = [...currentValue, ...newValue];
    console.log('newValue', JSON.stringify(newValue));
    await mergeItem(JSON.stringify(newValue));
  };

  useEffect(() => {
    Geolocation.watchPosition(
      ({coords, timestamp}) => {
        writeItemToStorage([
          {
            lat: coords.latitude,
            lng: coords.longitude,
            timestamp,
          },
        ]);
      },
      (error) => {
        console.log('error', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 1500,
        maximumAge: 0,
      },
    );
  }, []);

  return <Text>Teste</Text>;
};

export default HomeView;
