import { Alert, Keyboard, View } from 'react-native'
import { BackHandler } from 'react-native'
import * as Animatable from 'react-native-animatable'
import React, { useContext, useEffect, useState, useCallback } from 'react'

/**
 * Services.
 */
import api from '../../services/api'

/**
 * Utils.
 */
import { validatePassword, validateTheEmail } from '../../utils/form'

/**
 * Components.
 */
import Button from '../../components/Form/Buttom'
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
  const { singIn }: any = useContext(AuthContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [msgError, setMsgError] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const validateForm = useCallback(async () => {
    if (!name) {
      setMsgError('Preencha o nome')
      return false
    }

    if (!validateTheEmail(email)) {
      setMsgError('Email inválido')
      return false
    }

    if (password.length < 6) {
      setMsgError('A senha deve conter no mínimo 6 caracteres')
      return false
    }

    if (!validatePassword(password)) {
      setMsgError(
        'A senha deve conter no mínimo um caractere especial, um número e uma letra maiúscula.'
      )
      return false
    }

    if (password !== confirmPassword) {
      setMsgError('Os campos de senha devem ser iguais')
      return false
    }

    try {
      const emailExists = await api.checkIfTheEmailIsAlreadyRegistered(email)
      if (emailExists?.status === 200) {
        setMsgError('Este email já está cadastrado')
        return false
      }
    } catch (error) {
      setMsgError('Erro interno')
      return false
    }

    setMsgError('')
    return true
  }, [name, email, password, confirmPassword])

  const login = useCallback(async () => {
    try {
      await singIn(email, password)
      clearState()
    } catch (error) {
      setMsgError('Erro, feche o app e abra novamente')
    }
  }, [email, password, singIn])

  const createAccount = useCallback(async () => {
    setLoading(true)
    Keyboard.dismiss()

    try {
      if (await validateForm()) {
        await api.createUser(name, email, password)
        await login()
      }
    } catch (error) {
      setMsgError('Erro, tente novamente mais tarde')
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
      () => {
        return loading ? true : false
      }
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
