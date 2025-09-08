import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`

export const Section = styled.View`
  padding: 10px 15px;
  background-color: #192436;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const NumberOfLinks = styled.Text`
  color: white;
`
export const Filters = styled.TouchableOpacity``

export const Dropdown = styled.TouchableOpacity`
  width: 140px;
  height: auto;
  position: absolute;
  right: 3%;
  top: 100px;
  background-color: white;
  elevation: 10;
  z-index: 2;
  elevation: 25;
`

export const DropdownButton = styled.TouchableOpacity`
  padding: 7px 0px;
  align-items: center;
  justify-content: center;
  border-bottom-width: 1px;
  border-color: #d6d6d6;
`

export const ContainerShortenedUrl = styled.TouchableOpacity`
  padding: 15px;
  border-bottom-width: 1px;
  border-color: #d6d6d6;
`

export const DateCreated = styled.Text`
  font-size: 12px;
  color: #526281;
`

export const Description = styled.Text`
  font-size: 14px;
`
export const Link = styled.Text`
  font-size: 13px;
  color: #2a5bd7;
`

export const ContainerIcons = styled.View`
  position: absolute;
  right: 4%;
  bottom: 30%;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const AccessCount = styled.Text`
  margin: 0 5px;
  color: #526281;
`

export const DeleteButton = styled.TouchableOpacity`
  color: white;
  background-color: red;
  padding: 10px;
  font-size: 18px;
`

export const ModalContent = styled.SafeAreaView`
  align-items: center;
  justify-content: center;
`

export const ModalButtons = styled.TouchableOpacity`
  border-bottom-width: 1px;
  border-color: #d6d6d6;
  padding: 15px 10px;
  margin: 5px 0px;
  width: 240px;
  justify-content: center;
  border-radius: 5px;
`
export const FloatButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 3%;
  right: 5%;
  border-radius: 50px;
  elevation: 7;
  background-color: white;
`

export const TextButtons = styled.Text`
  font-size: 15px;
`
export const NoLinksSaved = styled.Text`
  margin: 0px auto;
  margin-bottom: 450px;
  font-size: 15px;
`

export const Spinner = styled.ActivityIndicator`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: white;
  opacity: 0.2;
  flex: 1;
  justify-content: center;
  align-items: center;
`
