import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Announcements from './Announcements';
import Newsletter from './Newsletter';
import * as Font from 'expo-font';
import Notification from './Notification';

const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

function LogoTitle() {
  return (
    <Image
      style={{ width: 65, height: 35 }}
      source={require('./assets/logo.png')}
    />
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  async function loadFonts() {
    await Font.loadAsync({
      'thin': require('./assets/fonts/Montserrat-Thin.ttf'),
      'light': require('./assets/fonts/Montserrat-Light.ttf'),
      'regular': require('./assets/fonts/Montserrat-Regular.ttf'),
      'medium': require('./assets/fonts/Montserrat-Medium.ttf'),
      'bold': require('./assets/fonts/Montserrat-Bold.ttf'),
      'italic': require('./assets/fonts/Montserrat-Italic.ttf'),
    });

    setFontsLoaded(true);
  }

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <View />; // Render a blank view while fonts are loading
  }

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>

        <Stack.Screen 
        name="Notification" 
        component={Notification} 
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerTitleAlign:'center',
          headerStyle: {
            backgroundColor: '#002d74',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />

        <Stack.Screen 
        name="Newsletter" 
        component={Newsletter} 
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerTitleAlign:'center',
          headerStyle: {
            backgroundColor: '#002d74',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <Stack.Screen 
        name="Announcement" 
        component={Announcements} 
        initialParams={{slug: 'default-slug'}} 
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerTitleAlign:'center',
          headerStyle: {
            backgroundColor: '#002d74',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});
