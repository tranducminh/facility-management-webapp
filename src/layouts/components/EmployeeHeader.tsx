/* eslint-disable no-nested-ternary */
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
  Text,
  Icon,
  MenuGroup,
  MenuDivider,
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
import { useEffect, useState } from 'react'
import { GoGitPullRequest } from 'react-icons/go'
import { SiGoogleclassroom } from 'react-icons/si'
import { CgProfile } from 'react-icons/cg'
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux'
import Pusher from 'pusher-js'
import { useRouter } from 'next/router'
import { BsTools } from 'react-icons/bs'
import Link from 'next/link'
import { useColor } from '../../theme/useColorMode'
import Logo from '../../components/Logo'
import { logout } from '../../redux/actions/auth.action'
import {
  pushRealtimeNotification,
  resetNotification,
} from '../../redux/actions/notification.action'
import { NOTIFICATION, NotificationType } from '../../types'
import axios from '../../utils/axios'

function EmployeeHeader() {
  const auth = useSelector((state: RootStateOrAny) => state.auth)
  const dispatch = useDispatch()
  const { colorMode, toggleColorMode } = useColorMode()
  const { buttonColorMode } = useColor()
  const borderColor = useColorModeValue('gray.100', 'gray.900')
  const [notifications, setNotifications] = useState<NOTIFICATION[]>([])
  const [newNotifications, setNewNotifications] = useState<NOTIFICATION[]>([])
  const [unReadNotification, setUnReadNotification] = useState<number>(0)
  const router = useRouter()

  const onHandleLogout = () => {
    dispatch(logout())
  }

  useEffect(() => {
    if (auth.isAuth === false) {
      setNotifications([])
      setNewNotifications([])
      setUnReadNotification(0)
    } else {
      axios
        .get('/notifications')
        .then((res) => {
          setNotifications(res.data.notifications)
        })
        .catch((error) => {
          console.log(error)
        })
      refreshUnReadNotificationTotal()
    }
  }, [auth.isAuth])

  const refreshUnReadNotificationTotal = () => {
    axios
      .get('/notifications/unread')
      .then((res) => {
        setUnReadNotification(res.data.total)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    const pusher = new Pusher(process.env.PUSHER_KEY || 'employee', {
      cluster: 'ap1',
    })
    const channel = pusher.subscribe(auth.user.channel)
    channel.bind('common', (data: { notification: NOTIFICATION }) => {
      setNewNotifications([data.notification, ...newNotifications])
      dispatch(
        pushRealtimeNotification({
          title: data.notification.content,
          id: data.notification.id,
        })
      )
      dispatch(resetNotification())
      refreshUnReadNotificationTotal()
    })
  }, [])

  const onHandleNotification = (notificationId?: number) => {
    axios
      .put(`/notifications/${notificationId}/read`)
      .then(() => {
        console.log('aaaa')
      })
      .catch((error) => {
        console.log(error)
      })
    const notificationTemp =
      notifications.filter((item) => item.id === notificationId)[0] ||
      newNotifications.filter((item) => item.id === notificationId)[0]

    switch (notificationTemp.type) {
      case NotificationType.UPDATED_PROFILE:
        router.push(`/employee/profile?notification=${notificationId}`)
        break
      case NotificationType.PENDING_ROOM:
        router.push(`/employee/profile?notification=${notificationId}`)
        break
      case NotificationType.NEW_ROOM:
        router.push(`/employee/profile?notification=${notificationId}`)
        break
      case NotificationType.NEW_FACILITY_OWNER:
        router.push(`/employee/facilities?notification=${notificationId}`)
        break
      case NotificationType.REMOVED_FACILITY_OWNER:
        router.push(`/employee/facilities?notification=${notificationId}`)
        break
      case NotificationType.UPDATED_FACILITY_INFO:
        router.push(
          `/employee/facilities/${notificationTemp.facility?.id}?notification=${notificationId}`
        )
        break
      case NotificationType.APPROVED_REQUEST:
        router.push(
          `/employee/requests?type=assigned&notification=${notificationId}`
        )
        break
      case NotificationType.REJECTED_REQUEST:
        router.push(
          `/employee/requests?type=rejected&notification=${notificationId}`
        )
        break
      case NotificationType.INPROCESS_REQUEST:
        router.push(
          `/employee/requests?type=inprocess&notification=${notificationId}`
        )
        break
      case NotificationType.COMPLETED_REQUEST:
        router.push(
          `/employee/requests?type=completed&notification=${notificationId}`
        )
        break
      case NotificationType.UNCOMPLETED_REQUEST:
        router.push(
          `/employee/requests?type=uncompleted&notification=${notificationId}`
        )
        break
      default:
        break
    }
  }

  function generateNotificationIcon(type?: NotificationType) {
    switch (type) {
      case NotificationType.PENDING_ROOM:
        return <Icon as={SiGoogleclassroom} w={6} h={6} color='yellow.500' />
      case NotificationType.NEW_ROOM:
        return <Icon as={SiGoogleclassroom} w={6} h={6} color='teal' />
      case NotificationType.NEW_FACILITY_OWNER:
        return <Icon as={BsTools} w={6} h={6} color='teal' />
      case NotificationType.REMOVED_FACILITY_OWNER:
        return <Icon as={BsTools} w={6} h={6} color='red.500' />
      case NotificationType.UPDATED_FACILITY_INFO:
        return <Icon as={BsTools} w={6} h={6} color='blue.500' />
      case NotificationType.UPDATED_PROFILE:
        return <Icon as={CgProfile} w={6} h={6} color='blue.500' />
      case NotificationType.APPROVED_REQUEST:
        return <Icon as={GoGitPullRequest} w={6} h={6} color='teal' />
      case NotificationType.REJECTED_REQUEST:
        return <Icon as={GoGitPullRequest} w={6} h={6} color='red.500' />
      case NotificationType.INPROCESS_REQUEST:
        return <Icon as={GoGitPullRequest} w={6} h={6} color='blue.500' />
      case NotificationType.COMPLETED_REQUEST:
        return <Icon as={GoGitPullRequest} w={6} h={6} color='green' />
      case NotificationType.UNCOMPLETED_REQUEST:
        return <Icon as={GoGitPullRequest} w={6} h={6} color='red.500' />
      default:
        return <Icon as={SiGoogleclassroom} w={6} h={6} color='yellow.500' />
    }
  }

  return (
    <Container
      maxW='100%'
      centerContent
      borderBottomWidth='1px'
      borderBottomColor={borderColor}>
      <Flex w='85%' align='center'>
        <Box>
          <Logo />
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
            size='md'
            variant='ghost'
            mr='5'
            outline='none'>
            <IconButton
              aria-label='Color mode'
              position='relative'
              size='md'
              color={buttonColorMode}
              icon={<BellIcon fontSize='1.2em' />}
              variant='ghost'
            />
            {unReadNotification > 0 ? (
              <Box
                w='1.25rem'
                h='1.25rem'
                lineHeight='1.25rem'
                backgroundColor='red.600'
                borderRadius='0.2rem'
                position='absolute'
                right='0'
                top='0'>
                <Text fontSize='xs' textAlign='center' color='white'>
                  {unReadNotification}
                </Text>
              </Box>
            ) : null}
          </MenuButton>

          <MenuList maxH='20rem' overflow='auto'>
            <Text textStyle='bold-xl' py='1' px='4'>
              Thông báo
            </Text>
            {newNotifications.length <= 0 && notifications.length <= 0 ? (
              <Text textStyle='md' py='1' px='4'>
                Không có thông báo
              </Text>
            ) : null}
            {newNotifications.length > 0 ? (
              <>
                <MenuGroup title='Mới'>
                  {newNotifications.map((notification, index) => (
                    <MenuItem
                      position='relative'
                      cursor='pointer'
                      key={index}
                      icon={generateNotificationIcon(notification.type)}
                      maxW='18rem'
                      h='3.6rem'
                      onClick={() => onHandleNotification(notification.id)}>
                      <Text
                        pr='0.3rem'
                        fontWeight='semibold'
                        noOfLines={2}
                        w='100%'>
                        {notification.content}
                      </Text>
                      {!notification.isRead ? (
                        <Box
                          w='0.6rem'
                          h='0.6rem'
                          borderRadius='0.3rem'
                          backgroundColor='green.500'
                          position='absolute'
                          right='0.6rem'
                          top='1.5rem'
                        />
                      ) : null}
                    </MenuItem>
                  ))}
                </MenuGroup>
                <MenuDivider />
              </>
            ) : null}
            {notifications.length > 0 ? (
              <MenuGroup title='Cũ hơn'>
                {notifications.map((notification, index) => (
                  <MenuItem
                    position='relative'
                    cursor='pointer'
                    key={index}
                    icon={generateNotificationIcon(notification.type)}
                    maxW='18rem'
                    h='3.6rem'
                    onClick={() => onHandleNotification(notification.id)}>
                    <Text
                      pr='0.3rem'
                      fontWeight='semibold'
                      noOfLines={2}
                      w='100%'>
                      {notification.content}
                    </Text>
                    {!notification.isRead ? (
                      <Box
                        w='0.6rem'
                        h='0.6rem'
                        borderRadius='0.3rem'
                        backgroundColor='green.500'
                        position='absolute'
                        right='0.6rem'
                        top='1.5rem'
                      />
                    ) : null}
                  </MenuItem>
                ))}
              </MenuGroup>
            ) : null}
          </MenuList>
        </Menu>

        {!auth.isAuth ? (
          <Button
            leftIcon={<UnlockIcon fontSize='14px' />}
            variant='ghost'
            color={buttonColorMode}
            size='sm'>
            <Link href='/employee/login'>
              <Text textStyle='bold-md'>Đăng nhập</Text>
            </Link>
          </Button>
        ) : (
          <Menu>
            <MenuButton as={Button} size='sm' rightIcon={<ChevronDownIcon />}>
              {auth.user.name}
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

export default EmployeeHeader
