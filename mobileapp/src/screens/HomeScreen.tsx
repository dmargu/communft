import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useQuery } from '@apollo/client';
import * as Location from 'expo-location';

import ChatPreview from '../components/ChatPreview';
import { messagePreviewData } from '../dummyData';
import { RootTabScreenProps } from '../types';
import { colors, fonts, dimensions, scaledSize } from '../constants';
import { AuthContext } from '../Context';
import { GET_USER_INFO } from '../graphql/Queries';

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

const HomeScreen = () => {
  const context = useContext(AuthContext);
  console.log(context.authenticatedUserId);
  const [location, setLocation] = useState<Location>();
  const [errorMsg, setErrorMsg] = useState('');

  //verify user's location and update the database with region and then update user info here
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

  //get the updated groups of the user from the database and enrich the data
  //if we want to save user data earlier in context then change that
  const { data: userData, loading: userLoading, error: userError } = useQuery(GET_USER_INFO);
  // ran out of time - it makes no sense to do this in two separate queries just in the backend when u get the user info go find all the groups and return it with this user data

  if (userLoading) return <Text>Loading...</Text>;
  if (userError) return <Text>Error: {userError.message}</Text>;
  //get the groups from the ids in the user data
  console.log(userData.getUser.groups);

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

export default HomeScreen;