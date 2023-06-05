import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import Announcements from './Announcements';
import Newsletter from './Newsletter';
import AnnouncementDetail from './components/AnnouncementDetail';
import * as Font from 'expo-font';
import messaging from '@react-native-firebase/messaging';

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
const navigationRef = createNavigationContainerRef();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [navReady, setNavReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dataAnnouncementID, setDataAnnouncementID] = useState();
  const [dataCollectionID, setDataCollectionID] = useState();

  useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      setDataAnnouncementID(remoteMessage.data.announcementID)
      setDataCollectionID(remoteMessage.data.collectionID)
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          setDataAnnouncementID(remoteMessage.data.announcementID)
          setDataCollectionID(remoteMessage.data.collectionID)
        }

        setLoading(false);
      });
    }, []);


    useEffect(() => {
      if(navReady && dataAnnouncementID && dataCollectionID){
          navigationRef.navigate('AnnouncementDetail', { annouid: dataAnnouncementID, colid: dataCollectionID, apage: 0});
      }
    }, [navReady, dataAnnouncementID, dataCollectionID]);


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

  if (!fontsLoaded || loading) {
    return <View />; // Render a blank view while fonts are loading
  }

  return (
    <NavigationContainer onReady={() => setNavReady(true)} ref={navigationRef} theme={MyTheme}>
      <Stack.Navigator>
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
        <Stack.Screen 
        name="AnnouncementDetail" 
        component={AnnouncementDetail} 
        initialParams={{colid: 'default-slug', annouid: 'announcement-id'}} 
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

