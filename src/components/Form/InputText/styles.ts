import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native'

type Props = {
  disabled?: boolean
}

export const ContainerInputPassword = styled.View`
  width: 100%;
  flex-direction: row;
  border-color: red;
`

export const Label = styled.Text`
  color: #646464;
  font-size: 16px;
  margin-left: 5px;
  margin-bottom: -10px;
  z-index: 1;
  height: 20px;
  padding: 0 4px;
  background-color: white;
  align-self: flex-start;
`

export const Input = styled.TextInput`
  width: 100%;
  border: 1px solid #c7c7c7;
  padding: 8px;
  font-size: 16px;
  border-radius: 3px;
  elevation: 2;
  background-color: #fff;
`

export const ButtonIcon = styled.TouchableOpacity`
  top: 8px;
  right: 10px;
  width: 30px;
  height: 30px;
  position: absolute;
  align-items: center;
  border-radius: 50px;
  justify-content: center;
`

export const LeftIcon = styled(Icon)<Props>`
  font-size: 24px;
  color: #4444;
  top: 8px;
  left: 10px;
  position: absolute;
  z-index: 1;
`
export const RightIcon = styled(Icon)<Props>`
  font-size: 24px;
`

export const Error = styled.Text`
  color: red;
`
