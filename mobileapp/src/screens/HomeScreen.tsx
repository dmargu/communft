import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import { useQuery } from '@apollo/client';
import * as Location from 'expo-location';

import ChatPreview from '../components/ChatPreview'
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

//dummy data that follows ChatPreviewProps
const dummyData = [
  {
    readMessage: false,
    imgSource: '../../assets/images/punk6529.png',
    username: 'gigachad',
    time: '12:05 PM',
    message: 'wow I really committed that absolutely heinous comment to git. hopefully no one goes back and reads it.'
  },
  {
    readMessage: true,
    imgSource: '../../assets/images/punk6529.png',
    username: 'misterJawn',
    time: 'Yesterday',
    message: 'yea that would be pretty embarassing. Especially if they see these comments too and instead of coming to me put this on a presentation or something.'
  },
  {
    readMessage: false,
    imgSource: '../../assets/images/punk6529.png',
    username: 'marvin',
    time: '7:32 PM',
    message: 'just kidding. whoever we hire hopefully isnt crazy enough to go this far back and read the commits. That would be fucking psycho.'
  },
  {
    readMessage: true,
    imgSource: '../../assets/images/punk6529.png',
    username: 'whodoutinkuriam',
    time: 'Dec 31st',
    message: 'lol'
  }
]

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  const [location, setLocation] = useState<Location>();
  const [errorMsg, setErrorMsg] = useState('');

  console.log(dimensions);

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
      <FlatList 
        data={dummyData}
        renderItem={({ item }) => 
          <ChatPreview 
            readMessage={item.readMessage} 
            imgSource={item.imgSource} 
            username={item.username} 
            time={item.time} 
            message={item.message} 
          />
        }
        keyExtractor={(item, index) => item.username + index}
      />
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
    backgroundColor: colors.neutralOne,
    flex: 1,
    paddingTop: scaledSize(10)
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
