import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {withTheme} from 'react-native-paper';

//Import Views
import {HomeView} from './home';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

let TabRoutes = (props: any) => {
  const {colors}: any = props.theme;

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.primary,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeView}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

TabRoutes = withTheme(TabRoutes);

const StackRoutes = (props: any) => {
  const {colors}: any = props.theme;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={TabRoutes}
        options={{
          headerStyle: {backgroundColor: colors.primary},
          headerTintColor: '#fff',
          headerLeft: null,
        }}
      />
    </Stack.Navigator>
  );
};

export default withTheme(StackRoutes);
