import { Feather } from '@expo/vector-icons'
import { Keyboard } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import React, { useContext, useState } from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native'

/**
 * Services.
 */
import api from '../../services/api'

/**
 * Helpers.
 */
import { urlValidator } from '../../utils/others'

/**
 * Contexts.
 */
import { AuthContext } from '../../contexts/auth'

/**
 * Components.
 */
import Button from '../../components/Form/Button'
import TextInput from '../../components/Form/InputText'

/**
 * Styles.
 */
import {
  Title,
  Spinner,
  Container,
  ContainerForm,
  ContainerLogo,
  ClearContentButton
} from './styles'

/**
 * Component.
 */
export default function CreateNewLinkScreen() {
  const navigation = useNavigation<NavigationProp<any>>()
  const { user }: any = useContext(AuthContext)

  const [customUrl, setCustomUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [description, setDescription] = useState('')
  const [originalURL, setOriginalURL] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  function generateRandomString(length: number) {
    let newChart = ''

    const chart =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

    for (let i = 0; i < length; i++) {
      newChart += chart.charAt(Math.floor(Math.random() * chart.length))
    }

    return newChart
  }

  function customUrlIsValid() {
    const hasSpace = customUrl.includes(' ')
    const isValidLength = customUrl.length >= 6 || customUrl.length === 0

    return !hasSpace && isValidLength
  }

  async function checkFieldsBeforeRequest() {
    Keyboard.dismiss()

    if (!urlValidator(originalURL)) {
      return setErrorMessage('Ops! URL inválida')
    }

    if (!description) {
      return setErrorMessage('Adicione uma descrição')
    }

    if (!customUrlIsValid()) {
      return setErrorMessage(
        'Customizar a URL requer no mínimo 6 letras, sem espaços em branco.'
      )
    }

    await generateShortURL()
  }

  async function generateShortURL() {
    setIsLoading(true)

    try {
      const code = customUrl ? customUrl : generateRandomString(6)

      await api.postShortUrl({
        code: code,
        user_id: user.id,
        description: description,
        original_url: originalURL
      })

      navigation.navigate('SavedLinksScreen')
      clearFields()
    } catch (error) {
      console.log('post error:', error)
      setErrorMessage('Ops! Erro interno, volte mais tarde')
    } finally {
      setIsLoading(false)
    }
  }

  function clearFields() {
    setErrorMessage('')
    setCustomUrl('')
    setOriginalURL('')
    setDescription('')
  }

  return (
    <Container>
      <ContainerLogo>
        <Feather name='link' size={26} color='blue' />
        <Title>Gerar Link</Title>
      </ContainerLogo>

      <ContainerForm>
        <TextInput
          label='*Descrição'
          value={description}
          onChangeText={text => setDescription(text)}
          placeholder='Descrição do link'
        />

        <TextInput
          label='*Insira sua URL de destino'
          value={originalURL}
          onChangeText={text => setOriginalURL(text)}
          placeholder='Link de destino'
        />

        <TextInput
          label='Customizar URL (opicional)'
          value={customUrl}
          onChangeText={text => setCustomUrl(text)}
          placeholder='ex.com/Sua-customização-vai-aqui'
          msgError={errorMessage}
        />

        <Button
          onPress={() => checkFieldsBeforeRequest()}
          title='Criar'
          bgColor='#023696'
          style={{ marginTop: 90 }}
        />
      </ContainerForm>

      <ClearContentButton onPress={clearFields}>
        <MaterialIcons name='refresh' size={24} color='#023696' />
      </ClearContentButton>

      {isLoading && <Spinner size='large' color='blue' />}
    </Container>
  )
}
