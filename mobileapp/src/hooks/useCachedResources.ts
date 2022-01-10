import { FontAwesome } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { DMSans_400Regular, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import { Poppins_400Regular, Poppins_600SemiBold, Poppins_500Medium , Poppins_700Bold} from '@expo-google-fonts/poppins';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

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
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
