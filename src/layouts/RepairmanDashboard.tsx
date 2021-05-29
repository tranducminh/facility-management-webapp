import {
  Box,
  Container,
  Grid,
  GridItem,
  Text,
  LinkBox,
  Icon,
  useToast,
} from '@chakra-ui/react'
import Head from 'next/head'
import { CgProfile } from 'react-icons/cg'
import { MdSecurity } from 'react-icons/md'
import { BiTask } from 'react-icons/bi'
import { FaHistory } from 'react-icons/fa'
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Link from 'next/link'
import RepairmanHeader from './components/RepairmanHeader'
import { useColor } from '../theme/useColorMode'
import { fetchMe } from '../redux/actions/auth.action'

/* eslint-disable react/destructuring-assignment */
export default function RepairmanDashboard(props: any) {
  const auth = useSelector((state: RootStateOrAny) => state.auth)
  const router = useRouter()
  const dispatch = useDispatch()
  const { hoverTextColor, hoverBgColor, selectBgColor } = useColor()
  const notification = useSelector(
    (state: RootStateOrAny) => state.notification
  )
  const toast = useToast()

  useEffect(() => {
    if (auth.role === 'admin') {
      router.push('/admin')
    }

    if (auth.role === 'employee') {
      router.push('/employee')
    }

    if (!auth.isAuth) {
      router.push('/repairman/login')
    }
  }, [auth])

  useEffect(() => {
    dispatch(fetchMe({ role: 'repairman' }))
  }, [])

  useEffect(() => {
    if (notification.isEnabled) {
      toast({
        title: notification.title,
        description: notification.description,
        status: notification.status,
        position: 'bottom-left',
        duration: 5000,
        isClosable: true,
      })
    }
  }, [notification])

  return (
    <Box>
      <Head>
        <link rel='icon' href='/assets/images/logo-light.png' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta charSet='utf-8' />
        <meta name='description' content={props?.description} />
        <title>
          {props?.title ||
            'Hệ thống quản lý cơ sở vật chất Học viện Quốc gia Hồ Chí Minh'}
        </title>
      </Head>
      <RepairmanHeader />
      <Container maxW='100%' centerContent py={8}>
        {auth.role === 'repairman' ? (
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
                        <Text fontWeight='bold'>Nhiệm vụ</Text>
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
                        <Text fontWeight='bold'>Lịch sử làm việc</Text>
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
                        <Text fontWeight='bold'>Trang cá nhân</Text>
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
                        <Text fontWeight='bold'>Bảo mật</Text>
                      </GridItem>
                    </Grid>
                  </LinkBox>
                </Link>
              </GridItem>
              <GridItem colSpan={4}>{props.children}</GridItem>
            </Grid>
          </Box>
        ) : null}
      </Container>
    </Box>
  )
}
