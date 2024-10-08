import React from 'react'
import { Feather } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'

/**
 * Styles.
 */
import styles, {
  Image,
  Container,
  Description,
  ContainerText,
  SubDescription,
  ContainerButtons
} from './styles'

/**
 * Components.
 */
import Button from '../../components/Form/Button'

/**
 * Types.
 */
type WelcomeTypes = {
  navigation: any
}

/**
 * Component.
 */
export default function Welcome({ navigation }: WelcomeTypes) {
  return (
    <Container>
      <Animatable.View animation='flipInY' style={styles.containerLogo}>
        {/* <Feather name='link' size={26} color='blue' /> */}

        <Image source={require('../../../assets/adaptive-icon.png')} />
      </Animatable.View>

      <Animatable.View delay={600} animation='fadeInUp'>
        <ContainerText>
          <Description>
            Transforme URLs longas em curtas com facilidade!
          </Description>
          <SubDescription>Organize seus links com a Bretz.</SubDescription>
        </ContainerText>

        <ContainerButtons>
          <Button
            title='Abra sua conta'
            bgColor='#023696'
            onPress={() => navigation.navigate('CreateAccount')}
          />
          <Button
            title='Login'
            style={{ marginTop: 10 }}
            onPress={() => navigation.navigate('Login')}
          />
        </ContainerButtons>
      </Animatable.View>
    </Container>
  )
}
