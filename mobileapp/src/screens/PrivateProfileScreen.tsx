import React, { useContext } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { AuthContext } from '../Context';


export default function PrivateProfileScreen() {
  const context = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} />
      <Text>This is the private profile screen</Text>
      <Button title="Log out" onPress={() => context.logout()} />
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
