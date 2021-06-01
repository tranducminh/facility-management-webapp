/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react'
import {
  Text,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  GridItem,
} from '@chakra-ui/react'

import Link from 'next/link'
import EmployeeDashboard from '../../../layouts/EmployeeDashboard'
import FacilityItem from './components/FacilityItem'
import axios from '../../../utils/axios'
import { FACILITY } from '../../../types'
import Loading from '../../../components/Loading'
import Empty from '../../../components/Empty'

export default function Facility() {
  const [facilities, setFacilities] = useState<FACILITY[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const refresh = () => {
    axios
      .get('/employees/me/facilities')
      .then((response) => {
        setIsLoading(false)
        setFacilities(response.data.employee.facilities)
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error)
      })
  }
  useEffect(() => {
    setIsLoading(true)
    refresh()
  }, [])
  return (
    <EmployeeDashboard isFacility title='Thiết bị'>
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
      </Flex>
      {isLoading ? (
        <Loading />
      ) : facilities.length > 0 ? (
        <Grid templateColumns='repeat(3, 1fr)' gap={6}>
          {facilities.map((facility: FACILITY, index: number) => (
            <GridItem key={index} colSpan={1} w='100%'>
              <FacilityItem facility={facility} refresh={refresh} />
            </GridItem>
          ))}
        </Grid>
      ) : (
        <Empty title='Bạn chưa có thiết bị nào' />
      )}
    </EmployeeDashboard>
  )
}
