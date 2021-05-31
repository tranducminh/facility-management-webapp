/* eslint-disable radix */
import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  Button,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

import { useRouter } from 'next/router'
import Link from 'next/link'
import AdminDashboard from '../../../layouts/AdminDashboard'
import EmployeeFacilityMode from './components/EmployeeFacilityMode'

function ArrangementEmployeeFacility() {
  const router = useRouter()
  return (
    <AdminDashboard isArrangement title='Bàn giao thiết bị'>
      <Flex justifyContent='space-between' alignItems='center' mb={5}>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href='/admin/arrangement'>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>Sắp xếp</Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex alignItems='center'>
          <Text textStyle='bold-sm' mr='3'>
            Chế độ:
          </Text>
          <Menu>
            <MenuButton size='sm' as={Button} rightIcon={<ChevronDownIcon />}>
              <Text textStyle='bold-sm'>Cán bộ - Thiết bị</Text>
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                defaultValue='employee-facility'
                title='Chế độ'
                type='radio'>
                <MenuItemOption
                  value='room-employee'
                  onClick={() => router.push('/admin/arrangement')}>
                  <Text textStyle='bold-sm'>Phòng - Cán bộ</Text>
                </MenuItemOption>
                <MenuItemOption value='employee-facility'>
                  <Text textStyle='bold-sm'>Cán bộ - Thiết bị</Text>
                </MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      <EmployeeFacilityMode />
    </AdminDashboard>
  )
}

export default ArrangementEmployeeFacility
