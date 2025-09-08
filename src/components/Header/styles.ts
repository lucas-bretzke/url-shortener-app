import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native'

type Props = {
  disabled?: boolean
}

export const Container = styled.SafeAreaView`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 10px;
`

export const Title = styled.Text`
  font-size: 22px;
`
export const StyledIcon = styled(Icon)<Props>`
  font-size: 30px;
  color: #192436;
`

export const LeftButton = styled.TouchableOpacity`
  position: absolute;
  left: 3%;
  padding: 0;
  margin: 0;
`
export const RightButton = styled.TouchableOpacity`
  position: absolute;
  right: 3%;
  padding: 0;
  margin: 0;
`
