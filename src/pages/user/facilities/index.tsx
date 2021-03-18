import React from 'react'
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
import UserDashboard from '../../../layouts/UserDashboard'
import { withTranslation, Link } from '../../../../i18n'
import FacilityItem from './components/FacilityItem'

export default function Facility() {
  return (
    <UserDashboard isFacility>
      <Head>
        <title>
          Facilities - Ho Chi Minh National Academy of Politics - Facility
          management system
        </title>
      </Head>

      <Flex mb={5} alignItems='center'>
        <Breadcrumb>
          <Link href='/user/buildings'>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>Facilities</Text>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Link>
        </Breadcrumb>
        <Spacer />
        <InputGroup maxW='30%'>
          <InputLeftElement pointerEvents='none'>
            <Search2Icon color='gray.300' />
          </InputLeftElement>
          <Input type='text' placeholder='Search facility' />
        </InputGroup>
      </Flex>

      <Grid templateColumns='repeat(3, 1fr)' gap={4}>
        {[...Array(20)].map((value, index) => (
          <Link href='/user/facilities/table'>
            <GridItem colSpan={1}>
              <FacilityItem />
            </GridItem>
          </Link>
        ))}
      </Grid>
    </UserDashboard>
  )
}
