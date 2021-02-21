import {
  Box,
  Container,
  Grid,
  GridItem,
  Text,
  LinkBox,
  useColorModeValue,
} from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'
import Head from 'next/head'
import UserHeader from '../components/layouts/UserHeader'
import { Link } from '../../i18n'

/* eslint-disable react/destructuring-assignment */
export default function UserDashboard(props: any) {
  const textNavColor = useColorModeValue('teal.700', 'teal.200')
  const bgNavColor = useColorModeValue('#e6fffa', '#308c7a4d')
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
              <Link href='/login'>
                <LinkBox
                  py={2}
                  px={6}
                  mb={4}
                  cursor='pointer'
                  color={textNavColor}
                  backgroundColor={bgNavColor}
                  borderRadius='0.5em'
                  _hover={{
                    color: textNavColor,
                    backgroundColor: bgNavColor,
                    borderRadius: '0.5em',
                  }}>
                  <Grid templateColumns='repeat(5, 1fr)' gap={4}>
                    <GridItem colSpan={1}>
                      <EmailIcon fontSize='1.2em' />
                    </GridItem>
                    <GridItem colSpan={4}>
                      <Text textStyle='bold-md'>Room</Text>
                    </GridItem>
                  </Grid>
                </LinkBox>
              </Link>
              <Link href='/login'>
                <LinkBox
                  py={2}
                  px={6}
                  mb={4}
                  cursor='pointer'
                  borderRadius='0.5em'
                  _hover={{
                    color: textNavColor,
                    backgroundColor: bgNavColor,
                    borderRadius: '0.5em',
                  }}>
                  <Grid templateColumns='repeat(5, 1fr)' gap={4}>
                    <GridItem colSpan={1}>
                      <EmailIcon fontSize='1.2em' />
                    </GridItem>
                    <GridItem colSpan={4}>
                      <Text fontWeight='bold'>Facility</Text>
                    </GridItem>
                  </Grid>
                </LinkBox>
              </Link>
              <Link href='/login'>
                <LinkBox
                  py={2}
                  px={6}
                  mb={4}
                  cursor='pointer'
                  borderRadius='0.5em'
                  _hover={{
                    color: textNavColor,
                    backgroundColor: bgNavColor,
                    borderRadius: '0.5em',
                  }}>
                  <Grid templateColumns='repeat(5, 1fr)' gap={4}>
                    <GridItem colSpan={1}>
                      <EmailIcon fontSize='1.2em' />
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
