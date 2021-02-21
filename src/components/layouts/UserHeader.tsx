/* eslint-disable prettier/prettier */
import {
  Box,
  Flex,
  Spacer,
  Container,
  Button,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react'
import { BellIcon, UnlockIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'

import { TFunction } from 'next-i18next'
import { useColor } from '../../theme/useColorMode'
import { i18n, withTranslation, Link } from '../../../i18n'
import Logo from '../Logo'

function UserHeader({ t }: { readonly t: TFunction }) {
  const { colorMode, toggleColorMode } = useColorMode()
  const { buttonColorMode } = useColor()
  const borderColor = useColorModeValue('gray.100', 'gray.900')
  return (
    <Container maxW='100%' centerContent borderBottomWidth='1px' borderBottomColor={borderColor}>
      <Flex w='85%' align='center'>
        <Box>

          <Logo />

        </Box>
        <Spacer />
        <Menu>
          <MenuButton color={buttonColorMode} as={Button} variant='ghost'>
            <Image
              src={
                i18n.language === 'vi'
                  ? '/assets/images/vietnam.svg'
                  : '/assets/images/uk.svg'
              }
              w='1.3rem'
            />
          </MenuButton>
          <MenuList>
            <MenuItem
              textStyle='medium'
              onClick={() => i18n.changeLanguage('vi')}>
              <Image src='/assets/images/vietnam.svg' w='1.3rem' mr={3} />
              {t('vietnamese')}
            </MenuItem>
            <MenuItem
              textStyle='medium'
              onClick={() => i18n.changeLanguage('en')}>
              <Image src='/assets/images/uk.svg' w='1.3rem' mr={3} />
              {t('english')}
            </MenuItem>
          </MenuList>
        </Menu>
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
        <Button leftIcon={<UnlockIcon fontSize='14px' />} variant='ghost' color={buttonColorMode}>
          <Link href='/login'><Text textStyle='bold-md'>{t('login')}</Text></Link>
        </Button>
      </Flex>
    </Container>
  )
}

UserHeader.getInitialProps = async () => ({
  namespacesRequired: ['header'],
})

export default withTranslation('header')(UserHeader)
