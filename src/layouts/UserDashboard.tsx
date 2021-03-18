import {
  Box,
  Container,
  Grid,
  GridItem,
  Text,
  LinkBox,
  Icon,
} from '@chakra-ui/react'
import Head from 'next/head'
import { SiGoogleclassroom } from 'react-icons/si'
import { BsTools } from 'react-icons/bs'
import { GoGitPullRequest } from 'react-icons/go'
import UserHeader from './components/UserHeader'
import { Link } from '../../i18n'
import { useColor } from '../theme/useColorMode'

/* eslint-disable react/destructuring-assignment */
export default function UserDashboard(props: any) {
  const { hoverTextColor, hoverBgColor, selectBgColor } = useColor()
  return (
    <Box>
      <Head>
        <link rel='icon' href='/assets/images/poster.png' />
      </Head>
      <UserHeader />
      <Container maxW='100%' centerContent py={8}>
        <Box w='85%'>
          <Grid templateColumns='repeat(5, 1fr)' gap={4}>
            <GridItem
              colSpan={1}
              pr='1em'
              // minH='100vh'
              borderRightWidth='1px'
              borderRightColor='gray.100'>
              <Link href='/user/buildings'>
                <LinkBox
                  py={2}
                  px={6}
                  mb={4}
                  cursor='pointer'
                  color={props.isRoom ? hoverTextColor : ''}
                  backgroundColor={props.isRoom ? selectBgColor : ''}
                  borderRadius='0.5em'
                  _hover={{
                    color: hoverTextColor,
                    backgroundColor: hoverBgColor,
                    borderRadius: '0.5em',
                  }}>
                  <Grid templateColumns='repeat(5, 1fr)' gap={4}>
                    <GridItem colSpan={1}>
                      <Icon as={SiGoogleclassroom} fontSize='1.2em' />
                    </GridItem>
                    <GridItem colSpan={4}>
                      <Text textStyle='bold-md'>Room</Text>
                    </GridItem>
                  </Grid>
                </LinkBox>
              </Link>
              <Link href='/user/facilities'>
                <LinkBox
                  py={2}
                  px={6}
                  mb={4}
                  cursor='pointer'
                  borderRadius='0.5em'
                  color={props.isFacility ? hoverTextColor : ''}
                  backgroundColor={props.isFacility ? selectBgColor : ''}
                  _hover={{
                    color: hoverTextColor,
                    backgroundColor: hoverBgColor,
                    borderRadius: '0.5em',
                  }}>
                  <Grid templateColumns='repeat(5, 1fr)' gap={4}>
                    <GridItem colSpan={1}>
                      <Icon as={BsTools} fontSize='1.2em' />
                    </GridItem>
                    <GridItem colSpan={4}>
                      <Text fontWeight='bold'>Facility</Text>
                    </GridItem>
                  </Grid>
                </LinkBox>
              </Link>
              <Link href='/user/requests'>
                <LinkBox
                  py={2}
                  px={6}
                  mb={4}
                  cursor='pointer'
                  borderRadius='0.5em'
                  color={props.isRequest ? hoverTextColor : ''}
                  backgroundColor={props.isRequest ? selectBgColor : ''}
                  _hover={{
                    color: hoverTextColor,
                    backgroundColor: hoverBgColor,
                    borderRadius: '0.5em',
                  }}>
                  <Grid templateColumns='repeat(5, 1fr)' gap={4}>
                    <GridItem colSpan={1}>
                      <Icon as={GoGitPullRequest} fontSize='1.2em' />
                    </GridItem>
                    <GridItem colSpan={4}>
                      <Text fontWeight='bold'>My request</Text>
                    </GridItem>
                  </Grid>
                </LinkBox>
              </Link>
            </GridItem>
            <GridItem colSpan={4}>{props.children}</GridItem>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}
