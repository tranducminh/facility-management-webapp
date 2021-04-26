import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from '@chakra-ui/react'
import AdminDashboard from '../../../layouts/AdminDashboard'
import EmployeeList from './components/EmployeeList'
import { Link } from '../../../../i18n'

export default function User() {
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
        </Breadcrumb>
      </Flex>
      <EmployeeList />
    </AdminDashboard>
  )
}
