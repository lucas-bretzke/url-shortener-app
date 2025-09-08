import React from 'react'
import { ViewStyle } from 'react-native'
import { StyledButton, Text } from './styles'

/**
 * Types.
 */
type TypeProps = {
  title: string
  width?: number | string
  color?: string
  style?: ViewStyle
  onPress: () => void
  bgColor?: string
  disabled?: boolean
}


/**
 * Component.
 */
export default function Button({
  title,
  style,
  onPress,
  color = '#fff',
  width = '100%',
  bgColor = '#192436',
  disabled = false
}: TypeProps) {
  return (
    <StyledButton
      disabled={disabled}
      style={{ backgroundColor: bgColor, width: width, ...style }}
      onPress={onPress}
    >
      <Text style={{ color: color }}>{title}</Text>
    </StyledButton>
  )
}
