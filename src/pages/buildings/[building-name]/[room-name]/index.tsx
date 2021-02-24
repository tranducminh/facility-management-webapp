import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import Head from 'next/head'
import UserDashboard from '../../../../layouts/UserDashboard'
import { useColor } from '../../../../theme/useColorMode'
import { Link } from '../../../../../i18n'

export default function RoomDetail() {
  const { hoverTextColor, hoverBgColor } = useColor()
  return (
    <UserDashboard isRoom>
      <Head>
        <title>
          Room 123 - Building A1 - Ho Chi Minh National Academy of Politics -
          Facility management system
        </title>
      </Head>

      <Flex mb={5} alignItems='center'>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href='/buildings'>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>Buildings</Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link href='/buildings/building-a1'>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>A1</Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link href='/buildings/building-a1/room-123'>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>Room 123</Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>

      <Grid templateColumns='repeat(7, 1fr)' gap={4}>
        <GridItem colSpan={1}>
          <Text textStyle='bold-md' textAlign='center'>
            Mon
          </Text>
        </GridItem>
        <GridItem colSpan={1}>
          <Text textStyle='bold-md' textAlign='center'>
            Tue
          </Text>
        </GridItem>
        <GridItem colSpan={1}>
          <Text textStyle='bold-md' textAlign='center'>
            Wed
          </Text>
        </GridItem>
        <GridItem colSpan={1}>
          <Text textStyle='bold-md' textAlign='center'>
            Thu
          </Text>
        </GridItem>
        <GridItem colSpan={1}>
          <Text textStyle='bold-md' textAlign='center'>
            Fri
          </Text>
        </GridItem>
        <GridItem colSpan={1}>
          <Text textStyle='bold-md' textAlign='center'>
            Sat
          </Text>
        </GridItem>
        <GridItem colSpan={1}>
          <Text textStyle='bold-md' textAlign='center'>
            Sun
          </Text>
        </GridItem>
        {[...Array(30)].map((value, index) => (
          <Link href='/buildings/building-a1/room-123/21-11-1999'>
            <GridItem colSpan={1}>
              <Flex
                borderBottomWidth='2px'
                flexDirection='column'
                pb={8}
                pr={2}
                cursor='pointer'
                _hover={{
                  color: hoverTextColor,
                  backgroundColor: hoverBgColor,
                  borderColor: hoverBgColor,
                }}>
                <Text align='right' textStyle='bold-md'>
                  {index + 1}
                </Text>
              </Flex>
            </GridItem>
          </Link>
        ))}
      </Grid>
    </UserDashboard>
  )
}
