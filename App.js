import React from 'react';
import {Button, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import BooksScreen from './screens/BooksScreen';
import BookDetailsScreen from './screens/BookDetailsScreen';
import LoginScreen from './screens/LoginScreen'
import DummyScreen from './screens/DummyScreen'

const Stack = createStackNavigator();





export default function App() {




  return (<>
        <View style={{display:"flex",justifyContent:"center", alignContent:"center"}}>
        <Button title="Presssss">
        </Button>
        </View>
      </>
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Home">
    //     <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'KitapPaylaş' }} />
    //     {/*<Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Giriş Yap' }} />*/}
    //     {/*<Stack.Screen name="Books" component={BooksScreen} options={{ title: 'Kitap Listesi' }} />*/}
    //     {/*<Stack.Screen name="BookDetails" component={BookDetailsScreen} options={{ title: 'Kitap Detayları' }} />*/}
    //     {/*<Stack.Screen name="Dummy" component={DummyScreen} options={{ title: 'Protected Route Test Ekranı' }} />*/}
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}
