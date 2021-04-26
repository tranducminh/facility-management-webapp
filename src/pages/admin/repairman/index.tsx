import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from '@chakra-ui/react'
import AdminDashboard from '../../../layouts/AdminDashboard'
import RepairmanComponent from './components/Repairman'
import { Link } from '../../../../i18n'

export default function Repairman() {
  return (
    <AdminDashboard isRepairman>
      <Flex justifyContent='space-between' alignItems='center' mb={5}>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href='/admin/employees'>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>Kỹ thuật viên</Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>
      <RepairmanComponent />
    </AdminDashboard>
  )
}
