import { format } from 'date-fns'
import * as Clipboard from 'expo-clipboard'
import { FontAwesome } from '@expo/vector-icons'
import { FlatList, Text } from 'react-native'
import { MaterialIcons, Feather } from '@expo/vector-icons'
import React, { useContext, useState } from 'react'
import {
  useNavigation,
  DrawerActions,
  NavigationProp,
  useFocusEffect
} from '@react-navigation/native'

/**
 * Styles.
 */
import {
  Link,
  Spinner,
  Section,
  Filters,
  Dropdown,
  Container,
  AccessCount,
  DateCreated,
  Description,
  TextButtons,
  FloatButton,
  ModalButtons,
  ModalContent,
  NoLinksSaved,
  NumberOfLinks,
  ContainerIcons,
  DropdownButton,
  ContainerShortenedUrl
} from './styles'

/**
 * Contexts.
 */
import { AuthContext } from '../../contexts/auth'

/**
 * Services.
 */
import api from '../../services/api'

/**
 * Components.
 */
import Header from '../../components/Header'
import BaseModal from '../../components/Modal'
import AsyncStorage from '@react-native-async-storage/async-storage'

/**
 * Types.
 */
type ITypeLink = {
  user_id: number
  link_id: number
  short_url: string
  created_at: Date
  description: string
  is_favorite: boolean
  original_url: string
  access_count: number
}

/**
 * Component.
 */
export default function SavedLinksScreen() {
  const navigation = useNavigation<NavigationProp<any>>()
  const { user }: any = useContext(AuthContext)

  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ITypeLink>()
  const [shortenedUrls, setShortenedUrls] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const [favoritosAtivados, setFavoritosAtivados] = useState(false)

  const handleFavoritosPress = () => {
    setFavoritosAtivados(true)
    setIsDropdownVisible(false)
  }

  const handleTodosPress = () => {
    setSearch('')
    setFavoritosAtivados(false)
    setIsDropdownVisible(false)
  }

  const DropdownButtons = [
    {
      text: 'Favoritos',
      onPress: handleFavoritosPress
    },
    {
      text: 'Todos',
      onPress: handleTodosPress
    }
  ]

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer())
  }

  async function getUrls() {
    setIsLoading(true)

    try {
      const response = await api.userShortenedUrls(user.id)

      setShortenedUrls(response)
      AsyncStorage.setItem('shortenedUrls', JSON.stringify(response))
    } catch (error) {
      console.error('Erro ao buscar URLs encurtadas:', error)

      // Tenta recuperar URLs encurtadas do AsyncStorage como fallback
      try {
        const storedUrls = await AsyncStorage.getItem('shortenedUrls')
        console.log('storedUrls', storedUrls)
        if (storedUrls) setShortenedUrls(JSON.parse(storedUrls))
      } catch (storageError) {
        console.error('Erro ao acessar AsyncStorage:', storageError)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const sortLinksByDate = (links: ITypeLink[]) => {
    return links.sort(
      (a, b) => +new Date(b.created_at) - +new Date(a.created_at)
    )
  }

  const filterLinks = () => {
    let filteredLinks = shortenedUrls

    if (favoritosAtivados) {
      filteredLinks = filteredLinks.filter(
        (item: ITypeLink) => item.is_favorite === true
      )
    }

    if (search !== '') {
      filteredLinks = filteredLinks.filter((item: ITypeLink) => {
        return item.description.toUpperCase().includes(search.toUpperCase())
      })
    }

    // Sort links by creation date
    return sortLinksByDate(filteredLinks)
  }

  function closeModal() {
    setIsModalVisible(false)
  }

  function copyLink() {
    if (!selectedItem) return

    Clipboard.setString(selectedItem?.short_url), closeModal()
  }

  async function toggleFavorite() {
    try {
      closeModal()
      setIsLoading(true)

      if (!selectedItem?.link_id) {
        throw new Error('Invalid link ID.')
      }

      const updatedLink = {
        ...selectedItem,
        is_favorite: !selectedItem.is_favorite
      }

      await api.editShortenedUrl(updatedLink)
    } catch (error) {
      console.error('Failed to toggle favorite status:', error)
    } finally {
      await getUrls()
      setIsLoading(false)
    }
  }

  async function deleteLink() {
    try {
      setIsLoading(true)
      closeModal()

      if (!selectedItem) return

      await api.deleteShortUrl(selectedItem.link_id)
    } catch (error) {
      console.log(error)
    } finally {
      getUrls()
      setIsLoading(false)
    }
  }

  function ContentModal() {
    const buttons = [
      { text: 'Copiar', onPress: copyLink },
      { text: 'Excluir', onPress: deleteLink },
      {
        text: selectedItem?.is_favorite ? 'Desfavoritar' : 'Favoritar',
        onPress: toggleFavorite
      }
    ]

    return (
      <ModalContent>
        {buttons.map((button, index) => (
          <ModalButtons key={index} onPress={button.onPress}>
            <TextButtons>{button.text}</TextButtons>
          </ModalButtons>
        ))}
      </ModalContent>
    )
  }

  function renderShortenedUrl(item: ITypeLink) {
    const date = format(new Date(item.created_at), 'dd/MM/yy')

    return (
      <ContainerShortenedUrl
        onPress={() => {
          setSelectedItem(item)
          setIsModalVisible(true)
        }}
      >
        <DateCreated>{date}</DateCreated>
        <Description>{item.description}</Description>
        <Link>{item.short_url}</Link>

        <ContainerIcons>
          {item.is_favorite && (
            <MaterialIcons name='bookmark' size={14} color='#444444' />
          )}

          <AccessCount>{item.access_count}</AccessCount>

          <FontAwesome name='bar-chart' size={14} color='black' />
        </ContainerIcons>
      </ContainerShortenedUrl>
    )
  }

  const handleSearchInputChange = (text: string) => {
    setSearch(text)
  }

  useFocusEffect(
    React.useCallback(() => {
      getUrls()
    }, [])
  )

  return (
    <Container>
      <Header
        title='Links'
        leftIcon='menu'
        rightIcon='magnify'
        inputValue={search}
        leftButton={openDrawer}
        onInputChange={handleSearchInputChange}
        canChangeTheInputState
      />

      <Section>
        <NumberOfLinks>
          {favoritosAtivados ? 'Favoritos' : 'Todos'}
          <Text style={{ color: '#b3b1b1' }}> {filterLinks()?.length}</Text>
        </NumberOfLinks>

        <Filters onPress={() => setIsDropdownVisible(!isDropdownVisible)}>
          <Feather
            name='filter'
            size={22}
            color={isDropdownVisible ? '#b3b1b1' : 'white'}
          />
        </Filters>
      </Section>

      {isDropdownVisible && (
        <Dropdown>
          {DropdownButtons.map((button, index) => (
            <DropdownButton key={index} onPress={button.onPress}>
              <Text>{button.text}</Text>
            </DropdownButton>
          ))}
        </Dropdown>
      )}

      <FlatList
        style={{ opacity: isDropdownVisible ? 0.7 : 1 }}
        data={filterLinks()}
        renderItem={({ item }) => renderShortenedUrl(item)}
      />

      <BaseModal
        visible={isModalVisible}
        onClose={closeModal}
        container={ContentModal()}
      />

      <FloatButton onPress={() => navigation.navigate('CreateNewLinkScreen')}>
        <Feather name='plus-circle' size={42} color='#023696' />
      </FloatButton>

      {!shortenedUrls?.length && !favoritosAtivados && (
        <NoLinksSaved>Não há links salvos</NoLinksSaved>
      )}

      {favoritosAtivados && !filterLinks()?.length && (
        <NoLinksSaved>Não há favoritos salvos</NoLinksSaved>
      )}

      {isLoading && <Spinner size='large' color='black' />}
    </Container>
  )
}
