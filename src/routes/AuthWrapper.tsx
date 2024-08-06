import React, { useEffect, useContext } from 'react'
import { AuthContext } from '../contexts/auth'
import { NavigationProp, useNavigation } from '@react-navigation/native'

const AuthWrapper = () => {
  const { user }: any = useContext(AuthContext)
  const navigation = useNavigation<NavigationProp<any>>()

  useEffect(() => {
    if (user) {
      navigation.navigate('SavedLinksScreen')
    } else {
      navigation.navigate('Welcome')
    }
  }, [user, navigation])

  return null // Este componente não renderiza nada, ele redireciona com base no estado de autenticação
}

export default AuthWrapper
