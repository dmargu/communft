import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
//import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { AuthProvider } from './Context';

//note: cached resource loading happens in navigation, this way AuthProvider wraps it 
export default function App() {
  //const colorScheme = useColorScheme();
  return (
      <SafeAreaProvider>
        <AuthProvider>
          <Navigation />
          <StatusBar style='light'/>
        </AuthProvider>
      </SafeAreaProvider>
    );
}
