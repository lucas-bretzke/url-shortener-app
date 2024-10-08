import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const ContainerLogo = styled.View`
  flex: 1;
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`

export const Title = styled.Text`
  font-size: 26px;
  color: #023696;
  font-weight: bold;
  margin-left: 10px;
  padding: 10px;
  border-bottom-width: 1px;
  border-color: #023696;
  padding-vertical: 12px;
`

export const ContainerForm = styled.View`
  flex: 2.5;
  width: 90%;
  max-width: 500px;
  align-items: center;
`

export const ClearContentButton = styled.TouchableOpacity`
  position: absolute;
  right: 5%;
  bottom: 3%;
  padding: 10px;
  border-radius: 50px;
  border: 1px solid #023696;
  background-color: #ffff;
  elevation: 3;
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
