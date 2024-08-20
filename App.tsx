import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TabNavigation, { StackNavigation } from './navigation';
import { NavigationContainer } from '@react-navigation/native';
import HandicapContextProvider, { HandicapContext } from './pages/HandicapContext';


export default function App() {
  return (
    <>
    <HandicapContextProvider>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </HandicapContextProvider>
      
    </>
    
  );
}


