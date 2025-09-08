import React from 'react'
import { SafeAreaView, ViewStyle } from 'react-native'

/**
 * styles.
 */
import {
  Input,
  Label,
  Error,
  LeftIcon,
  ButtonIcon,
  RightIcon,
  ContainerInputPassword
} from './styles'

/**
 * Types.
 */
type TextInputProps = {
  value?: string 
  icon?: string
  label?: string
  style?: ViewStyle
  onPress?: () => void
  inputRef?: React.Ref<any>
  leftIcon?: string
  msgError?: string
  placeholder?: string
  onChangeText: (text: string) => void
  secureTextEntry?: boolean
}

/**
 * Component.
 */
const TextInput: React.FC<TextInputProps> = ({
  icon,
  style,
  value = '',
  label,
  leftIcon,
  inputRef,
  onPress,
  msgError,
  placeholder,
  onChangeText,
  secureTextEntry = false
}) => {
  return (
    <SafeAreaView>
      {label && <Label>{label}</Label>}

      <ContainerInputPassword>
        {leftIcon && !value && <LeftIcon name={leftIcon} />}

        <Input
          ref={inputRef}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          style={style}
          accessible
          accessibilityLabel={placeholder || label} // Melhorar a acessibilidade
        />

        {icon && (
          <ButtonIcon
            onPress={onPress}
            accessible
            accessibilityLabel='Show or hide input'
          >
            <RightIcon name={icon} style={!value ? { opacity: 0.5 } : {}} />
          </ButtonIcon>
        )}
      </ContainerInputPassword>

      {msgError && <Error>{msgError}</Error>}
    </SafeAreaView>
  )
}

export default TextInput
