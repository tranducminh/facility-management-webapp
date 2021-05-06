import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import {
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Spacer,
  Grid,
  GridItem,
} from '@chakra-ui/react'

import { Search2Icon } from '@chakra-ui/icons'
import Link from 'next/link'
import EmployeeDashboard from '../../../layouts/EmployeeDashboard'
import FacilityItem from './components/FacilityItem'
import axios from '../../../utils/axios'
import { FACILITY } from '../../../types'

export default function Facility() {
  const [facilities, setFacilities] = useState<FACILITY[]>([])
  useEffect(() => {
    axios
      .get('/employees/me/facilities')
      .then((response) => {
        setFacilities(response.data.employee.facilities)
        debugger
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  return (
    <EmployeeDashboard isFacility>
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
                <Text textStyle='bold-md'>Thiết bị</Text>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Link>
        </Breadcrumb>
        <Spacer />
        <InputGroup maxW='30%'>
          <InputLeftElement pointerEvents='none'>
            <Search2Icon color='gray.300' />
          </InputLeftElement>
          <Input type='text' placeholder='Tìm kiếm thiết bị' />
        </InputGroup>
      </Flex>

      <Grid templateColumns='repeat(3, 1fr)' gap={6}>
        {facilities.map((facility: FACILITY, index: number) => (
          <GridItem key={index} colSpan={1} w='100%'>
            <FacilityItem facility={facility} />
          </GridItem>
        ))}
      </Grid>
    </EmployeeDashboard>
  )
}
