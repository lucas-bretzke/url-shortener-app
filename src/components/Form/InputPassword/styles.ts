import styled from 'styled-components/native'

interface EyeButtonProps {
  active: boolean
}

export const ContainerInputPassword = styled.View`
  width: 100%;
  flex-direction: row;
  border: none;
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
export const EyeButton = styled.TouchableOpacity<EyeButtonProps>`
  position: absolute;
  top: 8px;
  right: 10px;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  opacity: ${({ active }) => (!active ? '0.5' : ' 1')};
`

export const Error = styled.Text`
  color: red;
`
