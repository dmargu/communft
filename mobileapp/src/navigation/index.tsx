import { MaterialCommunityIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Pressable } from 'react-native';

//import useColorScheme from '../hooks/useColorScheme';
import { colors, scaledSize, fonts } from '../constants';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import HomeScreen from '../screens/HomeScreen';
import PrivateProfileScreen from '../screens/PrivateProfileScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import GoBackCircle from '../components/common/GoBackCircle';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import { AuthContext } from '../Context';
import useCachedResources from '../hooks/useCachedResources';


export default function Navigation() {
  useCachedResources();
  const context = React.useContext(AuthContext);
  console.log(context);
  if (context.isAppLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      {context.authToken ? <RootNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen 
        name="ChatRoomScreen" 
        component={ChatRoomScreen} 
        options={({ route, navigation }) => ({ 
          title: route.params.chatTitle,
          headerStyle: {
            backgroundColor: colors.neutralOne,
            borderBottomWidth: 0, // this is not working for some reason
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            fontFamily: fonts.bodyOneBold.fontFamily,
            fontSize: fonts.bodyOneBold.fontSize,
            lineHeight: fonts.bodyOneBold.lineHeight,
            color: colors.neutralEight
          },
          headerLeft: () => (<GoBackCircle />),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <Ionicons
                name="people"
                size={scaledSize(30)}
                color={colors.neutralEight}
              />
            </Pressable>
          ) 
        })} 
      />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}/>
      <Stack.Screen name="LoginScreen" component={LoginScreen}/>
    </Stack.Navigator>
  );
}



const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  //const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: colors.primaryBlue,
        tabBarInactiveTintColor: colors.neutralEight,
        tabBarStyle: {
          backgroundColor: colors.neutralOne,
          borderTopWidth: 0
        },
        tabBarLabelStyle: {
          fontFamily: fonts.buttonOne.fontFamily,
          fontSize: fonts.buttonOne.fontSize,
          lineHeight: fonts.buttonOne.lineHeight
        },
        headerStyle: {
          backgroundColor: colors.neutralOne,
          borderBottomWidth: 0,
          elevation: 0,
          shadowOpacity: 0
        },
        headerTitleStyle: {
          fontFamily: fonts.bodyOneBold.fontFamily,
          fontSize: fonts.bodyOneBold.fontSize,
          lineHeight: fonts.bodyOneBold.lineHeight,
          color: colors.neutralEight
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({ //should eventually make opacity 0.5 on press
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="message-text" size={scaledSize(30)} color={color} />,
          tabBarLabel: () => false,
          headerTitle: 'Chats',
          headerTitleAlign: 'left',
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="pencil-square-o"
                size={scaledSize(30)}
                color={colors.neutralEight}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="PrivateProfile"
        component={PrivateProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="person" size={scaledSize(30)} color={color} />,
          tabBarLabel: () => false,
          headerTitle: 'Profile'      
        }}
      />
    </BottomTab.Navigator>
  );
}
