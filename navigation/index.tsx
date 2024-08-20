
import { View, Text, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalculateHandicap from '../pages/CalculateHandicap';
import ViewHandicap from '../pages/ViewHandicap';
import IMAGES from '../images/images';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();


export function StackNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="View" component={TabNavigation} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

export function TabNavigation() {
  return (
    <Tab.Navigator initialRouteName='Calculate'>
    <Tab.Screen 
        name="Calculate" 
        component={CalculateHandicap} 
        options={{
            title: 'Calculate',
            tabBarIcon: ({focused}) => (
                <Image 
                    source={IMAGES.CALCULATOR} 
                    style={{height: 30, width: 30, tintColor: focused ? 'green' : 'black'}} 
                />
            ),
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'lightgray'
        }}
    />
    <Tab.Screen 
        name="View" 
        component={ViewHandicap}
        options={{
            title: 'View',
            tabBarIcon: ({focused}) => (
                <Image 
                    source={IMAGES.BINOCULARS} 
                    style={{height: 30, width: 30, tintColor: focused ? 'green' : 'black'}} 
                />
            ),
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'lightgray'
        }} 
    />
    </Tab.Navigator>
  )
}

export default StackNavigation;
