/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import StackRoutes from './routes';

declare var global: {HermesInternal: null | {}};

const Master = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <StackRoutes />
    </>
  );
};

export default Master;
