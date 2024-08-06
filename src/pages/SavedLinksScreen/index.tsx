import { format } from 'date-fns'
import * as Clipboard from 'expo-clipboard'
import { FontAwesome } from '@expo/vector-icons'
import { FlatList, Text } from 'react-native'
import { MaterialIcons, Feather } from '@expo/vector-icons'
import React, { useContext, useEffect, useState } from 'react'
import {
  useNavigation,
  NavigationProp,
  useFocusEffect,
  DrawerActions
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
import BaseModal from '../../components/Modal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Header from '../../components/Header'
import InputText from '../../components/Form/InputText'

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
  const { getUserShortenedUrls }: any = useContext(AuthContext)

  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedItem, setSelectedItem] = useState<ITypeLink>()
  const [shortenedUrls, setShortenedUrls] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const [favoritosAtivados, setFavoritosAtivados] = useState(false)

  const DropdownButtons = [
    {
      text: 'Favoritos',
      onPress: () => (setFavoritosAtivados(true), setIsDropdownVisible(false))
    },
    {
      text: 'Todos',
      onPress: () => (
        setSearch(''), setFavoritosAtivados(false), setIsDropdownVisible(false)
      )
    }
  ]

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer())
  }

  async function getUrls() {
    try {
      if ((shortenedUrls.length = 0)) setIsLoading(true)

      const response = await getUserShortenedUrls()

      setShortenedUrls(response)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
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

    return filteredLinks
  }

  function closeModal() {
    setIsModalVisible(false)
  }

  function copyLink() {
    if (!selectedItem) return

    Clipboard.setString(selectedItem?.short_url),
      alert(`URL Copiada!\n ${selectedItem?.short_url}`)
  }

  async function toggleFavorite() {
    if (!selectedItem) return

    closeModal()
    setIsLoading(true)

    const updatedLink = {
      id: selectedItem.link_id,
      description: selectedItem?.description,
      is_favorite: !selectedItem.is_favorite
    }

    try {
      await api.editShortenedUrl(updatedLink)
    } catch (error) {
      console.log(error)
    } finally {
      getUrls()
      setIsLoading(false)
    }
  }

  async function deleteLink() {
    try {
      setIsLoading(true)
      closeModal()

      if (!selectedItem) return

      await api.deleteShorUrl(selectedItem.link_id)
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
            <MaterialIcons name='favorite' size={14} color='#444444' />
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
        leftButtom={openDrawer}
        onInputChange={handleSearchInputChange}
        canChangeTheInputState
      />

      <Section>
        <NumberOfLinks>Links: {filterLinks()?.length}</NumberOfLinks>
        <Filters onPress={() => setIsDropdownVisible(!isDropdownVisible)}>
          <Feather name='filter' size={22} color='white' />
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
        data={filterLinks()}
        renderItem={({ item }) => renderShortenedUrl(item)}
      />

      <BaseModal
        visible={isModalVisible}
        onClose={closeModal}
        container={ContentModal()}
      />

      <FloatButton onPress={() => navigation.navigate('CreateNewLinkScreen')}>
        <Feather name='plus-circle' size={42} />
      </FloatButton>

      {!shortenedUrls?.length && (
        <NoLinksSaved>Não há links salvos</NoLinksSaved>
      )}

      {isLoading && <Spinner size='large' color='black' />}
    </Container>
  )
}
