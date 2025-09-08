import * as Animatable from 'react-native-animatable'
import { Keyboard, View, BackHandler } from 'react-native'
import React, { useContext, useEffect, useState, useCallback } from 'react'

/**
 * Services.
 */
import api from '../../services/api'

/**
 * Utils.
 */
import { validatePassword, validateEmail } from '../../utils/form'

/**
 * Components.
 */
import Button from '../../components/Form/Button'
import InputText from '../../components/Form/InputText'
import InputPassword from '../../components/Form/InputPassword'

/**
 * Styles.
 */
import styles, { Container, Spinner, Title } from './styles'

/**
 * Contexts.
 */
import { AuthContext } from '../../contexts/auth'

/**
 * Component.
 */
export default function CreateAccount() {
  const { signIn } = useContext(AuthContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [msgError, setMsgError] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const validateForm = useCallback(async () => {
    if (!name) return showError('Preencha o nome')

    if (!validateEmail(email)) return showError('Email inválido')

    if (password.length < 6)
      return showError('A senha deve conter no mínimo 6 caracteres')

    if (!validatePassword(password))
      return showError(
        'A senha deve conter um caractere especial, um número e uma letra maiúscula.'
      )

    if (password !== confirmPassword)
      return showError('Os campos de senha devem ser iguais')

    const emailExists = await checkEmailExists(email)

    if (emailExists) return showError('Este email já está cadastrado')

    setMsgError('')
    return true
  }, [name, email, password, confirmPassword])

  const showError = (message: string) => {
    setMsgError(message)
    return false
  }

  const checkEmailExists = async (email: string) => {
    try {
      const response = await api.checkIfEmailExists(email)
      return response?.status === 200
    } catch {
      showError('Erro interno')
      return true
    }
  }

  const login = useCallback(async () => {
    try {
      await signIn(email, password)
      clearState()
    } catch {
      showError('Erro, feche o app e abra novamente')
    }
  }, [email, password, signIn])

  const createAccount = useCallback(async () => {
    setLoading(true)
    Keyboard.dismiss()

    try {
      const isValid = await validateForm()
      if (!isValid) return

      await api.createUser(name, email, password)
      await login()
    } catch {
      showError('Erro, tente novamente mais tarde')
    } finally {
      setLoading(false)
    }
  }, [validateForm, login, name, email, password])

  const clearState = useCallback(() => {
    setName('')
    setEmail('')
    setMsgError('')
    setPassword('')
    setConfirmPassword('')
  }, [])

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => loading
    )
    return () => backHandler.remove()
  }, [loading])

  return (
    <>
      <Container>
        <Animatable.View delay={1000} animation='fadeInUp'>
          <Title style={styles.containerHeader}>Crie sua conta</Title>
          <View style={styles.containerForm}>
            <InputText
              value={name}
              label='Nome'
              icon='account'
              placeholder='Nome'
              onChangeText={setName}
            />
            <InputText
              value={email}
              label='E-mail'
              icon='email'
              placeholder='example@gmail.com'
              onChangeText={setEmail}
            />
            <InputPassword
              label='Senha'
              value={password}
              onChangeText={setPassword}
            />
            <InputPassword
              label='Confirmar Senha'
              placeholder='Confirmar senha'
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              msgError={msgError}
            />
            <Button
              title='Confirmar'
              onPress={createAccount}
              disabled={loading}
              style={{ marginTop: 20 }}
            />
          </View>
        </Animatable.View>
      </Container>
      {loading && <Spinner size='large' color='black' />}
    </>
  )
}