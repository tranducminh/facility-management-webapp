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
import RoomEmployeeMode from './components/RoomEmployeeMode'

function Arrangement() {
  const router = useRouter()
  return (
    <AdminDashboard isArrangement title='Phân bổ cán bộ'>
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
              <Text textStyle='bold-sm'>Phòng - Cán bộ</Text>
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                defaultValue='room-employee'
                title='Chế độ'
                type='radio'>
                <MenuItemOption value='room-employee'>
                  <Text textStyle='bold-sm'>Phòng - Cán bộ</Text>
                </MenuItemOption>
                <MenuItemOption
                  value='employee-facility'
                  onClick={() => {
                    router.push('/admin/arrangement/employee-facility')
                  }}>
                  <Text textStyle='bold-sm'>Cán bộ - Thiết bị</Text>
                </MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      <RoomEmployeeMode />
    </AdminDashboard>
  )
}

export default Arrangement
