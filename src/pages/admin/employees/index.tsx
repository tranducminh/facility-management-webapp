import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from '@chakra-ui/react'
import Link from 'next/link'
import AdminDashboard from '../../../layouts/AdminDashboard'
import EmployeeList from './components/EmployeeList'

export default function User() {
  return (
    <AdminDashboard isUser title='Nhân viên'>
      <Flex justifyContent='space-between' alignItems='center' mb={5}>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href='/admin/employees'>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>Cán bộ</Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>
      <EmployeeList />
    </AdminDashboard>
  )
}
