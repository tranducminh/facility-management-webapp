import {
  Box,
  Flex,
  Spacer,
  Container,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Icon,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  BellIcon,
  UnlockIcon,
  MoonIcon,
  SunIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons'
import { GoGitPullRequest } from 'react-icons/go'
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import Pusher from 'pusher-js'
import { useEffect, useState } from 'react'
import { useColor } from '../../theme/useColorMode'
import AdminLogo from '../../components/AdminLogo'
import { logout } from '../../redux/actions/auth.action'
import { NOTIFICATION } from '../../types'
import {
  pushNotification,
  resetNotification,
} from '../../redux/actions/notification.action'

function AdminHeader() {
  const auth = useSelector((state: RootStateOrAny) => state.auth)
  const dispatch = useDispatch()
  const { colorMode, toggleColorMode } = useColorMode()
  const { buttonColorMode } = useColor()
  const borderColor = useColorModeValue('gray.100', 'gray.900')
  const [notifications, setNotifications] = useState<NOTIFICATION[]>([])
  const onHandleLogout = () => {
    dispatch(logout())
  }

  const pusher = new Pusher('75ba4bf21a42e1773cf4', {
    cluster: 'ap1',
  })
  useEffect(() => {
    const channel = pusher.subscribe(auth.user.channel)
    channel.bind('common', (data: { notification: NOTIFICATION }) => {
      setNotifications([data.notification, ...notifications])
      dispatch(pushNotification({ title: data.notification.content }))
      dispatch(resetNotification())
      channel.unbind('common')
    })
  }, [notifications])

  return (
    <Container
      maxW='100%'
      centerContent
      borderBottomWidth='1px'
      borderBottomColor={borderColor}>
      <Flex w='90%' align='center'>
        <Box>
          <AdminLogo />
        </Box>
        <Spacer />
        <IconButton
          aria-label='Color mode'
          color={buttonColorMode}
          icon={
            colorMode === 'light' ? (
              <MoonIcon fontSize='1.2em' />
            ) : (
              <SunIcon fontSize='1.2em' />
            )
          }
          variant='ghost'
          onClick={toggleColorMode}
        />
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={
              <IconButton
                aria-label='Color mode'
                size='md'
                color={buttonColorMode}
                icon={<BellIcon fontSize='1.2em' />}
                variant='ghost'
              />
            }
            size='md'
            variant='ghost'
          />
          <MenuList maxH='20rem' overflow='auto'>
            <Text textStyle='bold-md' py='1' px='4'>
              Thông báo
            </Text>
            <MenuGroup title='Mới'>
              <MenuItem
                icon={<Icon as={GoGitPullRequest} w={6} h={6} color='teal' />}
                maxW='18rem'
                h='3.6rem'>
                <Text noOfLines={2} w='100%'>
                  Your request <b>#211196</b> is approved
                </Text>
              </MenuItem>
              <MenuItem
                icon={
                  <Icon as={GoGitPullRequest} w={6} h={6} color='red.500' />
                }
                maxW='18rem'
                h='3.6rem'>
                <Text fontWeight='semibold' noOfLines={2} w='100%'>
                  Your request <b>#211196</b> is rejected
                </Text>
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title='Cũ hơn'>
              <MenuItem
                icon={<Icon as={GoGitPullRequest} w={6} h={6} color='red' />}
                maxW='18rem'
                h='3.6rem'>
                <Text fontWeight='semibold' noOfLines={2} w='100%'>
                  Your request <b>#211196</b> is expired, please return facility
                  facility facility facility facility
                </Text>
              </MenuItem>
              <MenuItem
                icon={<Icon as={GoGitPullRequest} w={6} h={6} color='teal' />}
                maxW='18rem'
                h='3.6rem'>
                <Text fontWeight='semibold' noOfLines={2} w='100%'>
                  Your request <b>#211196</b> is approved
                </Text>
              </MenuItem>
              <MenuItem
                icon={
                  <Icon as={GoGitPullRequest} w={6} h={6} color='red.500' />
                }
                maxW='18rem'
                h='3.6rem'>
                <Text fontWeight='semibold' noOfLines={2} w='100%'>
                  Your request <b>#211196</b> is rejected
                </Text>
              </MenuItem>
              <MenuItem
                icon={<Icon as={GoGitPullRequest} w={6} h={6} color='red' />}
                maxW='18rem'
                h='3.6rem'>
                <Text fontWeight='semibold' noOfLines={2} w='100%'>
                  Your request <b>#211196</b> is expired, please return facility
                  facility facility facility facility
                </Text>
              </MenuItem>
              <MenuItem
                icon={<Icon as={GoGitPullRequest} w={6} h={6} color='teal' />}
                maxW='18rem'
                h='3.6rem'>
                <Text fontWeight='semibold' noOfLines={2} w='100%'>
                  Your request <b>#211196</b> is approved
                </Text>
              </MenuItem>
              <MenuItem
                icon={
                  <Icon as={GoGitPullRequest} w={6} h={6} color='red.500' />
                }
                maxW='18rem'
                h='3.6rem'>
                <Text fontWeight='semibold' noOfLines={2} w='100%'>
                  Your request <b>#211196</b> is rejected
                </Text>
              </MenuItem>
              <MenuItem
                icon={<Icon as={GoGitPullRequest} w={6} h={6} color='red' />}
                maxW='18rem'
                h='3.6rem'>
                <Text fontWeight='semibold' noOfLines={2} w='100%'>
                  Your request <b>#211196</b> is expired, please return facility
                  facility facility facility facility
                </Text>
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
        {!auth.isAuth ? (
          <Button
            leftIcon={<UnlockIcon fontSize='14px' />}
            variant='ghost'
            color={buttonColorMode}
            size='sm'>
            <Link href='/admin/login'>
              <Text textStyle='bold-md'>Đăng nhập</Text>
            </Link>
          </Button>
        ) : (
          <Menu>
            <MenuButton
              as={Button}
              size='sm'
              rightIcon={<ChevronDownIcon />}
              ml='5'>
              {auth.user?.name || 'Quản lý'}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={onHandleLogout}>Đăng xuất</MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
    </Container>
  )
}

export default AdminHeader
