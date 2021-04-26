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
  Icon,
  MenuGroup,
  MenuDivider,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { BellIcon, UnlockIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { GoGitPullRequest } from 'react-icons/go'
import { TFunction } from 'next-i18next'
import { useColor } from '../../theme/useColorMode'
import { i18n, withTranslation, Link } from '../../../i18n'
import Logo from '../../components/Logo'

function EmployeeHeader({ t }: { readonly t: TFunction }) {
  const { colorMode, toggleColorMode } = useColorMode()
  const { buttonColorMode } = useColor()
  const borderColor = useColorModeValue('gray.100', 'gray.900')
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
            <Text textStyle='bold-xl' py='1' px='4'>
              Notifications
            </Text>
            <MenuGroup title='New'>
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
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title='Earlier'>
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

        <Button
          leftIcon={<UnlockIcon fontSize='14px' />}
          variant='ghost'
          color={buttonColorMode}>
          <Link href='/employee/login'>
            <Text textStyle='bold-md'>{t('login')}</Text>
          </Link>
        </Button>
      </Flex>
    </Container>
  )
}

EmployeeHeader.getInitialProps = async () => ({
  namespacesRequired: ['header'],
})

export default withTranslation('header')(EmployeeHeader)
