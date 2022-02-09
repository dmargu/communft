import { useContext } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { DMSans_400Regular, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import { Poppins_400Regular, Poppins_600SemiBold, Poppins_500Medium , Poppins_700Bold} from '@expo-google-fonts/poppins';
import * as SecureStore from 'expo-secure-store';
import jwtDecode  from 'jwt-decode';

import { AuthContext } from '../Context';


export default function useCachedResources() {
  const context = useContext(AuthContext);


  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          DMSans_400Regular,
          DMSans_700Bold,
          Poppins_400Regular,
          Poppins_600SemiBold,
          Poppins_500Medium,
          Poppins_700Bold
        });

        await SecureStore.getItemAsync('jwtToken').then(token => {
          if(token) {
            const decodedToken = jwtDecode(token);
            //@ts-ignore
            if(decodedToken.exp * 1000 < Date.now()) {
              SecureStore.deleteItemAsync('jwtToken');
            } else {
              //login the user
              context.restoreLogin(token);
            }
          }
        }, err => {
          console.log(err);
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        context.appLoaded();
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);
}
