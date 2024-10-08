import styled from 'styled-components/native'

export const ModalStyled = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: 'rgba(0, 0, 0, 0.5)';
`

export const Title = styled.Text`
  font-size: 16px;
  margin: 0 auto;
`

export const Container = styled.SafeAreaView`
  background-color: white;
  padding: 20px;
  border-radius: 4px;
`

export const CloseModal = styled.TouchableOpacity`
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: #eee;
  padding: 8px;
  border: 1px solid #4444;
  border-radius: 3px;
`
