import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { useQuery } from '@apollo/client';
import * as Location from 'expo-location';

import { GET_MESSAGES } from '../graphql/queries';
import EditScreenInfo from '../components/EditScreenInfo';
import { RootTabScreenProps } from '../types';
import { colors, fonts } from '../constants';

//make a type interface for location object
interface Location {
  coords: {
    accuracy: number | null,
    altitude: number | null,
    altitudeAccuracy: number | null,
    heading: number | null,
    latitude: number,
    longitude: number,
    speed: number | null,
  },
  timestamp: number | null
}

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [location, setLocation] = useState<Location>();
  const [errorMsg, setErrorMsg] = useState('');

  const { loading, error, data } = useQuery(GET_MESSAGES);
  if (error) {
    console.log(error);
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      //this doesn't seem to be returning a location with accuracy of 1 it's all over the place
      let location = await Location.getCurrentPositionAsync({ accuracy: 1 });
      //turn location latitude and longitude into human readable address
      let address = await Location.reverseGeocodeAsync(location.coords);
      console.log(address[0].city);
      setLocation(location);
    })();
  }, []);

  console.log(location);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} />
      {loading && <Text>Loading</Text>}
      {error && <Text>Error</Text>}
      {data &&
        <Text>{JSON.stringify(data)}</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.neutralOne,
  },
  title: {
    fontSize: fonts.bodyOneBold.fontSize,
    fontFamily: fonts.bodyOneBold.fontFamily,
    lineHeight: fonts.bodyOneBold.lineHeight
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
