import React from 'react';

import { Provider } from 'react-redux';

import Toast from 'react-native-toast-message';

import {
  PersistGate,
} from 'redux-persist/integration/react';
import { StatusBar } from 'expo-status-bar';

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import {
  store,
  persistor,
} from './src/store';

import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
      >
        <SafeAreaProvider>
          <StatusBar style="dark" />
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>

          <Toast />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}