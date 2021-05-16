import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AdminDashboard from '../../../../layouts/AdminDashboard'
import { Link } from '../../../../../i18n'
import UserDetailComponent from '../components/EmployeeDetail'
import FacilityItem from '../components/FacilityItem'
import axios from '../../../../utils/axios'
import { EMPLOYEE, FACILITY } from '../../../../types'

export default function UserDetail() {
  const router = useRouter()
  const [employee, setEmployee] = useState<EMPLOYEE>({})
  const [facilities, setFacilities] = useState<FACILITY[]>([])
  useEffect(() => {
    axios
      .get(`/employees/${router.query['employee-id']}`)
      .then((result) => {
        setEmployee(result.data.employee)
        setFacilities(result.data.employee.facilities)
        debugger
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  return (
    <AdminDashboard isUser>
      <Flex justifyContent='space-between' alignItems='center' mb={5}>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href='/admin/employees'>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>Cán bộ</Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link href={`/admin/employees/${employee.identity}`}>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>
                  #{employee.identity} - {employee.name}
                </Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>

      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          <AccordionButton>
            <Flex justifyContent='space-between' alignItems='center' w='100%'>
              <Text textStyle='bold-md'>Thông tin cán bộ</Text>
              <AccordionIcon />
            </Flex>
          </AccordionButton>
          <AccordionPanel py={5}>
            <UserDetailComponent employee={employee} />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem maxW='100%'>
          <AccordionButton>
            <Flex justifyContent='space-between' alignItems='center' w='100%'>
              <Text textStyle='bold-md'>Thiết bị được giao</Text>
              <AccordionIcon />
            </Flex>
          </AccordionButton>
          <AccordionPanel py={5} maxW='100%'>
            <Grid templateColumns='repeat(3, 1fr)' gap={3} maxW='100%'>
              {facilities.map((facility: FACILITY, index: number) => (
                <GridItem colSpan={1} maxW='17rem'>
                  <FacilityItem facility={facility} key={index} />
                </GridItem>
              ))}
            </Grid>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </AdminDashboard>
  )
}
