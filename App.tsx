import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import TabNavigator from './navigation/TabNavigator';


const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#c0c0c0',
  },
};

const App = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default App;
