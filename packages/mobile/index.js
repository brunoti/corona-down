import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import Master from './src/Master';
import {name as appName} from './app.json';

import theme from './theme';

const App = () => (
  <NavigationContainer>
    <PaperProvider theme={theme}>
      <Master />
    </PaperProvider>
  </NavigationContainer>
);

AppRegistry.registerComponent(appName, () => App);
