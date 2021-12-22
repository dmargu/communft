import { StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_MESSAGES } from '../graphql/queries';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const { loading, error, data } = useQuery(GET_MESSAGES);
  if (error) {
    console.log(error);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
