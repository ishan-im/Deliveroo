import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreen';
import ResturantScreen from './src/screens/ResturantScreen';

import BasketScreen from './src/screens/BasketScreen';

import PreparingOrderScreen from './src/screens/PreparingOrderScreen';

import OrderScreen from './src/screens/OrderScreen';

import {Provider} from 'react-redux';

import store from './store';

import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}>
        <NavigationContainer theme={theme}>
          <Provider store={store}>
            <Stack.Navigator
              screenOptions={{headerShown: false}}
              initialRouteName="Home">
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Resturant" component={ResturantScreen} />

              <Stack.Screen
                name="BasketScreen"
                options={{presentation: 'modal'}}
                component={BasketScreen}
              />
              <Stack.Screen
                name="PreparingOrderScreen"
                component={PreparingOrderScreen}
                options={{presentation: 'modal'}}
              />

              <Stack.Screen name="OrderScreen" component={OrderScreen} options={{presentation: 'modal'}}/>
            </Stack.Navigator>
          </Provider>
        </NavigationContainer>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
