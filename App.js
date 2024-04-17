import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for icons
import Settings from './src/screens/settings';
import Home from './src/screens/main';
import Locations from './src/screens/locations';
import AddLocation from './src/screens/add-location';
import { WeatherProvider } from './src/context/weather-context';

const Stack = createNativeStackNavigator();

export default function App() {

  
  return (
    <WeatherProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTransparent: true, // Make the header background transparent
            headerTitleStyle: { 
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerTintColor: '#000', // Set the color of header text and icons
            headerShadowVisible: false, // Disable shadow on iOS
            headerStyle: {
              elevation: 0, 
            },
          }}
        >
          {/* Home screen */}
          <Stack.Screen 
            name="Home" 
            component={Home}
            options={({ navigation }) => ({
              title: 'Nimbus sense',
              headerRight: () => (
                <TouchableOpacity
                  style={{ marginRight: 10 }}
                  onPress={() => navigation.navigate('Settings')}
                >
                  <Ionicons name="settings" size={24} color="#000" />
                </TouchableOpacity>
              ),
              headerLeft: () => (
                <TouchableOpacity
                  style={{ marginLeft: 10 }}
                  onPress={() => navigation.navigate('Locations')}
                >
                  <Ionicons name="menu-outline" size={24} color="#000" />
                </TouchableOpacity>
              ),
            })}
          />

          {/* Settings screen */}
          <Stack.Screen name="Settings" component={Settings}/>


          {/* Locations screen */}

          <Stack.Screen 
            name="Locations" 
            component={Locations}
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity
                    style={{ marginRight: 10 }}
                    onPress={() => {navigation.navigate('Add Location')}}
                >
                    <Ionicons name="add-circle-outline" size={24} color="#000" />
                </TouchableOpacity>
            ),
            })}
          />
          {/* Add Location screen */}
          <Stack.Screen name="Add Location" component={AddLocation}/>
        </Stack.Navigator>
      
      </NavigationContainer>
    </WeatherProvider>
  );
}
