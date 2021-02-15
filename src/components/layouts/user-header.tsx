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
  useColorMode,
} from '@chakra-ui/react'
import { LockIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useColor } from '../../theme/useColorMode'
import { i18n, withTranslation, Link } from '../../../i18n'

function UserHeader({ t }: { t: any }) {
  const { colorMode, toggleColorMode } = useColorMode()
  const { buttonColorMode } = useColor()
  return (
    <Container maxW='100%' centerContent>
      <Flex py='4' w='90%' align='center'>
        <Box p='2' textStyle='normal'>
          <Link href='/'>Logo</Link>
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
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          variant='ghost'
          onClick={toggleColorMode}
        />
        <Button leftIcon={<LockIcon />} variant='ghost' color={buttonColorMode}>
          <Link href='/login'>{t('login')}</Link>
        </Button>
      </Flex>
    </Container>
  )
}

UserHeader.getInitialProps = async () => ({
  namespacesRequired: ['header'],
})

export default withTranslation('header')(UserHeader)
