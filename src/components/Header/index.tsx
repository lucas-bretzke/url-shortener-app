import InputText from '../Form/InputText'
import { TextInput } from 'react-native'
import React, { useRef, useState } from 'react'

/**
 * Styles.
 */
import { Container, LeftButton, RightButton, StyledIcon, Title } from './styles'

/**
 * Types.
 */
type IHeader = {
  title: string
  leftIcon?: string
  rightIcon?: string
  inputValue?: string
  leftButton?: () => void
  rightButton?: () => void
  placeholder?: string
  onInputChange: any
  canChangeTheInputState?: boolean
}

/**
 * Component.
 */
export default function Header({
  title,
  leftIcon,
  rightIcon,
  inputValue = '',
  leftButton,
  placeholder,
  rightButton,
  onInputChange,
  canChangeTheInputState = false
}: IHeader) {
  const [isInputVisible, setIsInputVisible] = useState(false)
  const inputRef = useRef<TextInput | null>(null)

  const toggleInputVisibility = () => {
    onInputChange('')

    if (canChangeTheInputState) {
      setIsInputVisible(prev => !prev)
    }

    setTimeout(() => {
      if (inputRef.current) {
        isInputVisible ? inputRef.current.blur() : inputRef.current.focus()
      }
    }, 100)
  }

  return (
    <Container>
      {leftIcon && (
        <LeftButton onPress={leftButton}>
          <StyledIcon name={leftIcon} />
        </LeftButton>
      )}

      {title && !isInputVisible && <Title>{title}</Title>}

      {isInputVisible && (
        <InputText
          inputRef={inputRef}
          value={inputValue}
          onChangeText={onInputChange}
          leftIcon='magnify'
          style={{ width: 300, borderWidth: 0 }}
          placeholder={placeholder}
        />
      )}

      {rightIcon && (
        <RightButton onPress={rightButton || toggleInputVisibility}>
          <StyledIcon name={isInputVisible ? 'close' : rightIcon} />
        </RightButton>
      )}
    </Container>
  )
}
