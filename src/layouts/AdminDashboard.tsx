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
import { FiUsers } from 'react-icons/fi'
import { MdSecurity } from 'react-icons/md'
import { GoGitPullRequest } from 'react-icons/go'
import { BsBuilding, BsTools } from 'react-icons/bs'
import { GiAutoRepair } from 'react-icons/gi'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { HiOutlineDocumentReport } from 'react-icons/hi'
import AdminHeader from './components/AdminHeader'
import { Link } from '../../i18n'
import { useColor } from '../theme/useColorMode'

/* eslint-disable react/destructuring-assignment */
export default function AdminDashboard(props: any) {
  const { hoverTextColor, hoverBgColor, selectBgColor } = useColor()
  return (
    <Box>
      <Head>
        <link rel='icon' href='/assets/images/poster.png' />
      </Head>
      <AdminHeader />
      <Container maxW='100%' centerContent py={8}>
        <Box w='85%'>
          <Grid templateColumns='repeat(5, 1fr)' gap={4}>
            <GridItem
              colSpan={1}
              pr='1em'
              borderRightWidth='1px'
              borderRightColor='gray.100'>
              <Link href='/admin/buildings'>
                <LinkBox
                  py={2}
                  px={4}
                  mb={4}
                  cursor='pointer'
                  borderRadius='0.5em'
                  color={props.isBuilding ? hoverTextColor : ''}
                  backgroundColor={props.isBuilding ? selectBgColor : ''}
                  _hover={{
                    color: hoverTextColor,
                    backgroundColor: hoverBgColor,
                    borderRadius: '0.5em',
                  }}>
                  <Grid templateColumns='repeat(5, 1fr)' gap={4}>
                    <GridItem colSpan={1}>
                      <Icon as={BsBuilding} fontSize='1.2em' />
                    </GridItem>
                    <GridItem colSpan={4}>
                      <Text fontWeight='bold'>Tòa nhà</Text>
                    </GridItem>
                  </Grid>
                </LinkBox>
              </Link>
              <Link href='/admin/arrangement'>
                <LinkBox
                  py={2}
                  px={4}
                  mb={4}
                  cursor='pointer'
                  color={props.isArrangement ? hoverTextColor : ''}
                  backgroundColor={props.isArrangement ? selectBgColor : ''}
                  borderRadius='0.5em'
                  _hover={{
                    color: hoverTextColor,
                    backgroundColor: hoverBgColor,
                    borderRadius: '0.5em',
                  }}>
                  <Grid templateColumns='repeat(5, 1fr)' gap={4}>
                    <GridItem colSpan={1}>
                      <Icon as={AiOutlineUnorderedList} fontSize='1.2em' />
                    </GridItem>
                    <GridItem colSpan={4}>
                      <Text textStyle='bold-md'>Sắp xếp</Text>
                    </GridItem>
                  </Grid>
                </LinkBox>
              </Link>
              <Link href='/admin/requests'>
                <LinkBox
                  py={2}
                  px={4}
                  mb={4}
                  cursor='pointer'
                  color={props.isRequest ? hoverTextColor : ''}
                  backgroundColor={props.isRequest ? selectBgColor : ''}
                  borderRadius='0.5em'
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
                      <Text textStyle='bold-md'>Yêu cầu</Text>
                    </GridItem>
                  </Grid>
                </LinkBox>
              </Link>
              <Link href='/admin/employees'>
                <LinkBox
                  py={2}
                  px={4}
                  mb={4}
                  cursor='pointer'
                  color={props.isUser ? hoverTextColor : ''}
                  backgroundColor={props.isUser ? selectBgColor : ''}
                  borderRadius='0.5em'
                  _hover={{
                    color: hoverTextColor,
                    backgroundColor: hoverBgColor,
                    borderRadius: '0.5em',
                  }}>
                  <Grid templateColumns='repeat(5, 1fr)' gap={4}>
                    <GridItem colSpan={1}>
                      <Icon as={FiUsers} fontSize='1.2em' />
                    </GridItem>
                    <GridItem colSpan={4}>
                      <Text textStyle='bold-md'>Cán bộ</Text>
                    </GridItem>
                  </Grid>
                </LinkBox>
              </Link>
              <Link href='/admin/repairman'>
                <LinkBox
                  py={2}
                  px={4}
                  mb={4}
                  cursor='pointer'
                  color={props.isRepairman ? hoverTextColor : ''}
                  backgroundColor={props.isRepairman ? selectBgColor : ''}
                  borderRadius='0.5em'
                  _hover={{
                    color: hoverTextColor,
                    backgroundColor: hoverBgColor,
                    borderRadius: '0.5em',
                  }}>
                  <Grid templateColumns='repeat(5, 1fr)' gap={4}>
                    <GridItem colSpan={1}>
                      <Icon as={GiAutoRepair} fontSize='1.2em' />
                    </GridItem>
                    <GridItem colSpan={4}>
                      <Text textStyle='bold-sm'>Kỹ thuật viên</Text>
                    </GridItem>
                  </Grid>
                </LinkBox>
              </Link>
              <Link href='/admin/facilities'>
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
              <Link href='/admin/reports'>
                <LinkBox
                  py={2}
                  px={4}
                  mb={4}
                  cursor='pointer'
                  borderRadius='0.5em'
                  color={props.isReport ? hoverTextColor : ''}
                  backgroundColor={props.isReport ? selectBgColor : ''}
                  _hover={{
                    color: hoverTextColor,
                    backgroundColor: hoverBgColor,
                    borderRadius: '0.5em',
                  }}>
                  <Grid templateColumns='repeat(5, 1fr)' gap={4}>
                    <GridItem colSpan={1}>
                      <Icon as={HiOutlineDocumentReport} fontSize='1.2em' />
                    </GridItem>
                    <GridItem colSpan={4}>
                      <Text fontWeight='bold'>Báo cáo</Text>
                    </GridItem>
                  </Grid>
                </LinkBox>
              </Link>
              <Link href='/admin/security'>
                <LinkBox
                  py={2}
                  px={4}
                  mb={4}
                  cursor='pointer'
                  borderRadius='0.5em'
                  color={props.isSecurity ? hoverTextColor : ''}
                  backgroundColor={props.isSecurity ? selectBgColor : ''}
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
