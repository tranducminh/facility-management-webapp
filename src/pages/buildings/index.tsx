import Head from 'next/head'
import {
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Spacer,
  Tooltip,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { BsBuilding } from 'react-icons/bs'
import UserDashboard from '../../layouts/UserDashboard'
import { withTranslation, Link } from '../../../i18n'
import { useColor } from '../../theme/useColorMode'

function Building() {
  const { hoverTextColor, hoverBgColor } = useColor()
  return (
    <UserDashboard isRoom>
      <Head>
        <title>
          Buildings - Ho Chi Minh National Academy of Politics - Facility
          management system
        </title>
      </Head>

      <Flex mb={5} alignItems='center'>
        <Breadcrumb>
          <Link href='/buildings'>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>Buildings</Text>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Link>
        </Breadcrumb>
        <Spacer />
        <InputGroup maxW='30%'>
          <InputLeftElement pointerEvents='none'>
            <Search2Icon color='gray.300' />
          </InputLeftElement>
          <Input type='text' placeholder='Search room or building' />
        </InputGroup>
      </Flex>

      <Grid templateColumns='repeat(5, 1fr)' gap={4}>
        {[...Array(20)].map((value, index) => (
          <Link href='/buildings/building-a1'>
            <GridItem colSpan={1}>
              <Tooltip hasArrow label="Hey, I'm here!" aria-label='A tooltip'>
                <Flex
                  borderWidth='2px'
                  borderRadius='lg'
                  flexDirection='column'
                  alignItems='center'
                  p={4}
                  cursor='pointer'
                  _hover={{
                    color: hoverTextColor,
                    backgroundColor: hoverBgColor,
                    borderColor: hoverBgColor,
                  }}>
                  <Icon as={BsBuilding} fontSize='5xl' />
                  <Text textAlign='center' textStyle='bold-md'>
                    Building A{index + 1}
                  </Text>
                </Flex>
              </Tooltip>
            </GridItem>
          </Link>
        ))}
      </Grid>
    </UserDashboard>
  )
}

Building.getInitialProps = async () => ({
  namespacesRequired: ['user-index'],
})

export default withTranslation('user-index')(Building)
