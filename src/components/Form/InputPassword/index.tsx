import { Feather } from '@expo/vector-icons'
import React, { useState } from 'react'
import { SafeAreaView, ViewStyle } from 'react-native'

/**
 * Styles.
 */
import {
  Input,
  Error,
  Label,
  EyeButton,
  ContainerInputPassword
} from './styles'

/**
 * Types.
 */
type PasswordProps = {
  value: string
  label?: string
  style?: ViewStyle
  msgError?: string
  placeholder?: string
  onChangeText: (text: string) => void
  onSubmitEditing?: () => void
}

/**
 * Component.
 */
const InputPassword: React.FC<PasswordProps> = ({
  style,
  label = 'Senha',
  value,
  msgError = '',
  placeholder = '******',
  onChangeText,
  onSubmitEditing
}) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false)

  const togglePasswordVisibility = () => setPasswordVisibility(prev => !prev)

  return (
    <SafeAreaView>
      <Label>{label}</Label>

      <ContainerInputPassword>
        <Input
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          secureTextEntry={!passwordVisibility}
          placeholder={placeholder}
          placeholderTextColor={'#ccc'}
          style={style}
          accessible
          accessibilityLabel={`${label} input`} // Melhora a acessibilidade
        />
        <EyeButton
          active={passwordVisibility}
          onPress={togglePasswordVisibility}
        >
          <Feather name={passwordVisibility ? 'eye' : 'eye-off'} size={24} />
        </EyeButton>
      </ContainerInputPassword>

      {msgError && <Error>{msgError}</Error>}
    </SafeAreaView>
  )
}

export default InputPassword
