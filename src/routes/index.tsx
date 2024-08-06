import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Screens.
import Login from '../pages/Login'
import Welcome from '../pages/Welcome'
import AuthWrapper from './AuthWrapper'
import CreateAccount from '../pages/CreateAccount'
import SavedLinksScreen from '../pages/SavedLinksScreen'
import CreateNewLinkScreen from '../pages/CreateNewLinkScreen'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

function LogoutScreen() {
  const navigation = useNavigation()

  useEffect(() => {
    const logout = async () => {
      try {
        await AsyncStorage.removeItem('userData')
        navigation.navigate('Welcome' as keyof typeof StackNavigation)
      } catch (error) {
        console.log('Erro ao remover os dados do usuário: ', error)
      }
    }
    logout()
  }, [])

  return null
}

function DrawerNavigation() {
  return (
    <Drawer.Navigator initialRouteName='DrawerSavedLinksScreen'>
      <Drawer.Screen
        name='Meus links'
        component={SavedLinksScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name='Sair'
        component={LogoutScreen}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  )
}

function StackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='AuthWrapper'
        component={AuthWrapper}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Welcome'
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='CreateNewLinkScreen'
        component={CreateNewLinkScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Login'
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='CreateAccount'
        component={CreateAccount}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='SavedLinksScreen'
        component={DrawerNavigation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default function Routes() {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  )
}
