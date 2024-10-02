import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MoviesScreen from '../screens/MoviesScreen';
import TVShowsScreen from '../screens/TVShowScreen';
import SearchScreen from '../screens/SearchScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';
import TVShowDetailsScreen from '../screens/TVShowDetailsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MoviesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Movies" 
        component={MoviesScreen} 
        options={{ 
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="MovieDetails" 
        component={(props: any) => <MovieDetailsScreen {...props} />} 
        options={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
};

const TVShowsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="TV Shows" 
        component={TVShowsScreen} 
        options={{ 
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="TVShowDetails" 
        component={(props: any) => <TVShowDetailsScreen {...props} />} 
        options={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIcon: () => null,
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          justifyContent: 'center',
          alignContent: 'center',
          marginBottom: 30,
        },
        tabBarStyle: {
          backgroundColor: 'black',
          paddingBottom: 5,
          height: 80,
        },
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen 
        name="Movies" 
        component={MoviesStack} 
        options={{ title: 'Movies' }} 
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{ title: 'Search' }} 
      />
      <Tab.Screen 
        name="TV Shows" 
        component={TVShowsStack} 
        options={{ title: 'TV Shows' }} 
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
