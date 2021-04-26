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
import { BiTask } from 'react-icons/bi'
import { FaHistory } from 'react-icons/fa'
import RepairmanHeader from './components/RepairmanHeader'
import { Link } from '../../i18n'
import { useColor } from '../theme/useColorMode'

/* eslint-disable react/destructuring-assignment */
export default function RepairmanDashboard(props: any) {
  const { hoverTextColor, hoverBgColor, selectBgColor } = useColor()
  return (
    <Box>
      <Head>
        <link rel='icon' href='/assets/images/poster.png' />
      </Head>
      <RepairmanHeader />
      <Container maxW='100%' centerContent py={8}>
        <Box w='85%'>
          <Grid templateColumns='repeat(5, 1fr)' gap={4}>
            <GridItem
              colSpan={1}
              pr='1em'
              borderRightWidth='1px'
              borderRightColor='gray.100'>
              <Link href='/repairman/tasks'>
                <LinkBox
                  py={2}
                  px={4}
                  mb={4}
                  cursor='pointer'
                  borderRadius='0.5em'
                  color={props.isTask ? hoverTextColor : ''}
                  backgroundColor={props.isTask ? selectBgColor : ''}
                  _hover={{
                    color: hoverTextColor,
                    backgroundColor: hoverBgColor,
                    borderRadius: '0.5em',
                  }}>
                  <Grid templateColumns='repeat(5, 1fr)' gap={4}>
                    <GridItem colSpan={1}>
                      <Icon as={BiTask} fontSize='1.2em' />
                    </GridItem>
                    <GridItem colSpan={4}>
                      <Text fontWeight='bold'>Task</Text>
                    </GridItem>
                  </Grid>
                </LinkBox>
              </Link>
              <Link href='/repairman/history'>
                <LinkBox
                  py={2}
                  px={4}
                  mb={4}
                  cursor='pointer'
                  borderRadius='0.5em'
                  color={props.isHistory ? hoverTextColor : ''}
                  backgroundColor={props.isHistory ? selectBgColor : ''}
                  _hover={{
                    color: hoverTextColor,
                    backgroundColor: hoverBgColor,
                    borderRadius: '0.5em',
                  }}>
                  <Grid templateColumns='repeat(5, 1fr)' gap={4}>
                    <GridItem colSpan={1}>
                      <Icon as={FaHistory} fontSize='1.2em' />
                    </GridItem>
                    <GridItem colSpan={4}>
                      <Text fontWeight='bold'>History</Text>
                    </GridItem>
                  </Grid>
                </LinkBox>
              </Link>
              <Link href='/repairman/profile'>
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
                      <Text fontWeight='bold'>Profile</Text>
                    </GridItem>
                  </Grid>
                </LinkBox>
              </Link>
              <Link href='/repairman/security'>
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
                      <Text fontWeight='bold'>Account security</Text>
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
