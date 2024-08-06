import { Feather } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'
import React, { useContext, useState } from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native'

/**
 * Contexts.
 */
import { AuthContext } from '.././../contexts/auth'

/**
 * Helpers.
 */
import { validateTheEmail } from '../../utils/form'

/**
 * Styles.
 */
import styles, {
  Title,
  Spinner,
  Container,
  ButtonText,
  CheckboxLabel,
  KeepMeMonnected,
  ButtonContainer,
  CreateAccountButton,
  ForgotPasswordButton
} from './styles'

/**
 * Components.
 */
import Buttom from '../../components/Form/Buttom'
import InputText from '../../components/Form/InputText'
import InputPassword from '../../components/Form/InputPassword'
import { TouchableOpacity } from 'react-native'

/**
 * Component.
 */
export default function Login() {
  const navigation = useNavigation<NavigationProp<any>>()
  const { singIn }: any = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [checked, setChecked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [msgError, setMsgError] = useState('')

  const toggleCheckbox = () => setChecked(!checked)

  async function login() {
    setLoading(true)

    try {
      const { user } = await singIn(email, password)

      if (user) clearState()
    } catch (error) {
      setMsgError('E-mail e/ou senha inválidos')
    } finally {
      setLoading(false)
    }
  }

  function clearState() {
    setEmail('')
    setChecked(false)
    setPassword('')
    setMsgError('')
  }

  const buttonEnabled = validateTheEmail(email) && password.length >= 6

  return (
    <>
      <Container>
        <Animatable.View
          delay={1000}
          animation='fadeInLeft'
          style={styles.containerHeader}
        >
          <Title>LOGIN</Title>
        </Animatable.View>

        <Animatable.View
          delay={1500}
          animation='fadeInUp'
          style={styles.containerForm}
        >
          <InputText
            label='E-mail'
            placeholder='example@gmail.comn'
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <InputPassword
            value={password}
            msgError={msgError}
            onChangeText={text => setPassword(text)}
          />

          <KeepMeMonnected>
            <TouchableOpacity onPress={toggleCheckbox}>
              <Feather
                name={checked ? 'check-square' : 'square'}
                size={24}
                color={checked ? 'green' : 'gray'}
              />
            </TouchableOpacity>
            <CheckboxLabel>Manter-me conectado!</CheckboxLabel>
          </KeepMeMonnected>

          <Buttom
            title={'Acessar'}
            onPress={login}
            disabled={!buttonEnabled}
            bgColor={'#192436'}
          />

          <ButtonContainer>
            <CreateAccountButton
              onPress={() => navigation.navigate('CreateAccount')}
            >
              <ButtonText>Criar conta</ButtonText>
            </CreateAccountButton>

            <ForgotPasswordButton onPress={() => console.log('click')}>
              <ButtonText>Esquceu a senha?</ButtonText>
            </ForgotPasswordButton>
          </ButtonContainer>
        </Animatable.View>
      </Container>
      {loading && <Spinner size='large' color='black' />}
    </>
  )
}
