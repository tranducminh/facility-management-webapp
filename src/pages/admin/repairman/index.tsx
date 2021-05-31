import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from '@chakra-ui/react'
import Link from 'next/link'
import AdminDashboard from '../../../layouts/AdminDashboard'
import RepairmanComponent from './components/Repairman'

export default function Repairman() {
  return (
    <AdminDashboard isRepairman title='Kỹ thuật viên'>
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
