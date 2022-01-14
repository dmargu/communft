import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useQuery } from '@apollo/client';
import * as Location from 'expo-location';

import ChatPreview from '../components/ChatPreview';
import { messagePreviewData } from '../dummyData';
import { GET_MESSAGES } from '../graphql/queries';
import { RootTabScreenProps } from '../types';
import { colors, fonts, dimensions, scaledSize } from '../constants';

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

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
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
  console.log(loading, error, data);

  return (
    <View style={styles.container}>
      <FlatList 
        data={messagePreviewData}
        renderItem={({ item }) => 
          <ChatPreview 
            readMessage={item.readMessage} 
            imgUri={item.imgUri} 
            chatPreviewTitle={item.chatPreviewTitle} 
            time={item.time} 
            message={item.message} 
            id={item.groupID}
          />
        }
        keyExtractor={(item, index) => item.chatPreviewTitle + index}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutralOne,
    flex: 1,
  }
});
