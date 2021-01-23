import React from 'react';
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import Quiz from './screens/Quiz';

enableScreens();
const Stack = createNativeStackNavigator();

export function MyStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Quiz} />
    </Stack.Navigator>
  );
}
