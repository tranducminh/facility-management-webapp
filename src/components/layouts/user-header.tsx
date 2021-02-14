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
  useColorMode,
} from '@chakra-ui/react'
import { LockIcon, MoonIcon, SunIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { useColor } from '../../theme/useColor'
import { i18n, withTranslation } from '../../../i18n'

function UserHeader({ t }: { t: any }) {
  const { colorMode, toggleColorMode } = useColorMode()
  const { buttonColor } = useColor()
  return (
    <Container maxW='100%' centerContent>
      <Flex py='4' w='90%'>
        <Box p='2'>Logo</Box>
        <Spacer />
        <Menu>
          <MenuButton
            color={buttonColor}
            as={Button}
            variant='ghost'
            rightIcon={<ChevronDownIcon />}>
            {t('language')}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => i18n.changeLanguage('vi')}>
              {t('vietnamese')}
            </MenuItem>
            <MenuItem onClick={() => i18n.changeLanguage('en')}>
              {t('english')}
            </MenuItem>
          </MenuList>
        </Menu>
        <IconButton
          color={buttonColor}
          aria-label='Search database'
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          variant='ghost'
          onClick={toggleColorMode}
        />
        <Button leftIcon={<LockIcon />} color={buttonColor} variant='ghost'>
          {t('login')}
        </Button>
      </Flex>
    </Container>
  )
}

UserHeader.getInitialProps = async () => ({
  namespacesRequired: ['header'],
})

export default withTranslation('header')(UserHeader)
