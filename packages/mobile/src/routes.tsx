import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {withTheme} from 'react-native-paper';

//Import Views
import {HomeView} from './home';

const Stack = createStackNavigator();

const StackRoutes = (props: any) => {
  const {colors}: any = props.theme;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeView}
        options={{
          title: 'Home',
          headerStyle: {backgroundColor: colors.primary},
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default withTheme(StackRoutes);
