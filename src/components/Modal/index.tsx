import React from 'react'
import { Feather } from '@expo/vector-icons'
import { Modal, TouchableWithoutFeedback } from 'react-native'
import { CloseModal, Container, ModalStyled, Title } from './styles'

/**
 * Types.
 */
type IPropsType = {
  title?: string
  visible: boolean
  onClose: () => void
  container: React.ReactNode
}

/**
 * Component.
 */
export default function BaseModal({
  title,
  visible,
  onClose,
  container
}: IPropsType) {
  return (
    <Modal visible={visible} transparent={true} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <ModalStyled>
          <Container>
            <CloseModal onPress={onClose} accessibilityLabel='Close modal'>
              <Feather name='x' size={24} />
            </CloseModal>
            {title && <Title>{title}</Title>}
            {container}
          </Container>
        </ModalStyled>
      </TouchableWithoutFeedback>
    </Modal>
  )
}
