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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Spinner,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import AdminDashboard from '../../../../layouts/AdminDashboard'
import EmployeeDetail from '../components/EmployeeDetail'
import FacilityItem from '../components/FacilityItem'
import axios from '../../../../utils/axios'
import { EMPLOYEE, FACILITY } from '../../../../types'

export default function UserDetail() {
  const router = useRouter()
  const [employee, setEmployee] = useState<EMPLOYEE>({})
  const [facilities, setFacilities] = useState<FACILITY[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const refresh = (employeeId?: string) => {
    axios
      .get(`/employees/${employeeId || router.query['employee-id']}`)
      .then((result) => {
        setEmployee(result.data.employee)
        setFacilities(result.data.employee.facilities)
        setIsLoading(false)
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          setIsError(true)
        }
      })
  }
  useEffect(() => {
    refresh()
  }, [])

  if (isError) {
    return (
      <AdminDashboard isUser title={employee?.name || 'Nhân viên'}>
        <Alert
          status='error'
          variant='subtle'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
          height='200px'>
          <AlertIcon boxSize='40px' mr={0} />
          <AlertTitle mt={4} mb={1} fontSize='lg'>
            Không tìm thấy cán bộ với mã nhân viên #
            {router.query['employee-id']}
          </AlertTitle>
          <AlertDescription maxWidth='sm' mt='3'>
            <Link href='/admin/employees'>
              <Button size='sm' variant='ghost' colorScheme='teal'>
                Trở về trang danh sách cán bộ
              </Button>
            </Link>
          </AlertDescription>
        </Alert>
      </AdminDashboard>
    )
  }
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
            {isLoading ? (
              <Spinner size='sm' />
            ) : (
              <Link href={`/admin/employees/${employee.identity}`}>
                <BreadcrumbLink>
                  <Text textStyle='bold-md'>
                    #{employee.identity} - {employee.name}
                  </Text>
                </BreadcrumbLink>
              </Link>
            )}
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>
      {isLoading ? (
        <Spinner size='md' />
      ) : (
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            <AccordionButton>
              <Flex justifyContent='space-between' alignItems='center' w='100%'>
                <Text textStyle='bold-md'>Thông tin cán bộ</Text>
                <AccordionIcon />
              </Flex>
            </AccordionButton>
            <AccordionPanel py={5}>
              <EmployeeDetail employee={employee} refresh={refresh} />
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
      )}
    </AdminDashboard>
  )
}
