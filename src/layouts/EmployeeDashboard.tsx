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
import { CgProfile } from 'react-icons/cg'
import { MdSecurity } from 'react-icons/md'
import { BsTools } from 'react-icons/bs'
import { GoGitPullRequest } from 'react-icons/go'
import EmployeeHeader from './components/EmployeeHeader'
import { Link } from '../../i18n'
import { useColor } from '../theme/useColorMode'

/* eslint-disable react/destructuring-assignment */
export default function EmployeeDashboard(props: any) {
  const { hoverTextColor, hoverBgColor, selectBgColor } = useColor()
  return (
    <Box>
      <Head>
        <link rel='icon' href='/assets/images/poster.png' />
      </Head>
      <EmployeeHeader />
      <Container maxW='100%' centerContent py={8}>
        <Box w='85%'>
          <Grid templateColumns='repeat(5, 1fr)' gap={4}>
            <GridItem
              colSpan={1}
              pr='1em'
              borderRightWidth='1px'
              borderRightColor='gray.100'>
              <Link href='/employee/facilities'>
                <LinkBox
                  py={2}
                  px={4}
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
                      <Text fontWeight='bold'>Thiết bị</Text>
                    </GridItem>
                  </Grid>
                </LinkBox>
              </Link>
              <Link href='/employee/requests'>
                <LinkBox
                  py={2}
                  px={4}
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
                      <Text fontWeight='bold'>Yêu cầu</Text>
                    </GridItem>
                  </Grid>
                </LinkBox>
              </Link>
              <Link href='/employee/profile'>
                <LinkBox
                  py={2}
                  px={4}
                  mb={4}
                  cursor='pointer'
                  color={props.isProfile ? hoverTextColor : ''}
                  backgroundColor={props.isProfile ? selectBgColor : ''}
                  borderRadius='0.5em'
                  _hover={{
                    color: hoverTextColor,
                    backgroundColor: hoverBgColor,
                    borderRadius: '0.5em',
                  }}>
                  <Grid templateColumns='repeat(5, 1fr)' gap={4}>
                    <GridItem colSpan={1}>
                      <Icon as={CgProfile} fontSize='1.2em' />
                    </GridItem>
                    <GridItem colSpan={4}>
                      <Text fontWeight='bold'>Trang cá nhân</Text>
                    </GridItem>
                  </Grid>
                </LinkBox>
              </Link>
              <Link href='/employee/security'>
                <LinkBox
                  py={2}
                  px={4}
                  mb={4}
                  cursor='pointer'
                  color={props.isSecurity ? hoverTextColor : ''}
                  backgroundColor={props.isSecurity ? selectBgColor : ''}
                  borderRadius='0.5em'
                  _hover={{
                    color: hoverTextColor,
                    backgroundColor: hoverBgColor,
                    borderRadius: '0.5em',
                  }}>
                  <Grid templateColumns='repeat(5, 1fr)' gap={4}>
                    <GridItem colSpan={1}>
                      <Icon as={MdSecurity} fontSize='1.2em' />
                    </GridItem>
                    <GridItem colSpan={4}>
                      <Text fontWeight='bold'>Bảo mật</Text>
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
