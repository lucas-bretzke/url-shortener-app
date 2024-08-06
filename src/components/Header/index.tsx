import InputText from '../Form/InputText'
import { TextInput } from 'react-native'
import React, { useRef, useState } from 'react'

/**
 * Styles.
 */
import { Container, LeftButtom, RightButtom, StyledIcon, Title } from './styles'

/**
 * Types.
 */
type IHeader = {
  title: string
  leftIcon?: string
  rightIcon?: string
  inputValue?: string
  leftButtom?: () => void
  rightButtom?: () => void
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
  inputValue,
  leftButtom,
  placeholder,
  rightButtom,
  onInputChange,
  canChangeTheInputState
}: IHeader) {
  const [isInputVisible, setIsInputVisible] = useState(false)
  const [isTitleVisible, setIsTitleVisible] = useState(true)

  const inputRef = useRef<TextInput | null>(null)

  function setInputVisibility() {
    onInputChange('')

    if (canChangeTheInputState) {
      setIsTitleVisible(!isTitleVisible)
      setIsInputVisible(!isInputVisible)
    }

    setTimeout(() => {
      if (inputRef.current) {
        if (isInputVisible) {
          inputRef.current.blur()
        } else {
          inputRef.current.focus()
        }
      }
    }, 100)
  }

  return (
    <Container>
      {leftIcon && (
        <LeftButtom onPress={leftButtom}>
          <StyledIcon name={leftIcon} />
        </LeftButtom>
      )}
      {title && isTitleVisible && <Title>{title}</Title>}

      {isInputVisible && (
        <InputText
          inputRef={inputRef}
          value={inputValue}
          onChangeText={text => onInputChange(text)}
          leftIcon='magnify'
          style={{ width: 300, borderWidth: 0 }}
          placeholder={placeholder}
        />
      )}

      {rightIcon && (
        <RightButtom onPress={rightButtom || setInputVisibility}>
          <StyledIcon name={isInputVisible ? 'close' : rightIcon} />
        </RightButtom>
      )}
    </Container>
  )
}
