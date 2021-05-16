/* eslint-disable prettier/prettier */
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
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react'
import { BellIcon, UnlockIcon, MoonIcon, SunIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import { useColor } from '../../theme/useColorMode'
import RepairmanLogo from '../../components/RepairmanLogo'
import { logout } from '../../redux/actions/auth.action'

function RepairmanHeader() {
  const auth = useSelector((state: RootStateOrAny) => state.auth)
  const dispatch = useDispatch()
  const { colorMode, toggleColorMode } = useColorMode()
  const { buttonColorMode } = useColor()
  const borderColor = useColorModeValue('gray.100', 'gray.900')

  const onHandleLogout = () => {
    dispatch(logout())
  }
  return (
    <Container maxW='100%' centerContent borderBottomWidth='1px' borderBottomColor={borderColor}>
      <Flex w='85%' align='center'>
        <Box>
          <RepairmanLogo />
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
        <IconButton
          aria-label='Color mode'
          size='md'
          color={buttonColorMode}
          icon={<BellIcon fontSize='1.2em' />}
          variant='ghost'
        />
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

export default RepairmanHeader
