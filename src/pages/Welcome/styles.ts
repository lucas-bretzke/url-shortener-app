import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #192436;
`
export const Image = styled.Image`
  width: 140px;
  height: 140px;
  border-radius: 100px;
`

export const ContainerText = styled.View`
  padding: 0 3%;
  font-size: 17px;
  background-color: #192436;
`

export const Description = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: white;
`

export const SubDescription = styled.Text`
  font-size: 17px;
  color: white;
  margin: 18px 0;
`

export const ContainerButtons = styled.View`
  padding: 0 3%;
  width: 100%;
  height: 160px;
  align-items: center;
  justify-content: center;
  background-color: white;
`

export default StyleSheet.create({
  containerLogo: {
    flex: 2.5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#192436'
  }
})
