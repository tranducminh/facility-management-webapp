/* eslint-disable radix */
import { useState } from 'react'
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

import AdminDashboard from '../../../layouts/AdminDashboard'
import { Link } from '../../../../i18n'
import RoomEmployeeMode from './components/RoomEmployeeMode'
import EmployeeFacilityMode from './components/EmployeeFacilityMode'

function Arrangement() {
  const [modeText, setModeText] = useState('Phòng - Cán bộ')
  const [mode, setMode] = useState('room-employee')
  return (
    <AdminDashboard isArrangement>
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
              <Text textStyle='bold-sm'>{modeText}</Text>
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                defaultValue='room-employee'
                title='Chế độ'
                type='radio'
                onChange={(value) => {
                  setMode(value.toString())
                }}>
                <MenuItemOption
                  value='room-employee'
                  onClick={() => setModeText('Phòng - Cán bộ')}>
                  <Text textStyle='bold-sm'>Phòng - Cán bộ</Text>
                </MenuItemOption>
                <MenuItemOption
                  value='employee-facility'
                  onClick={() => setModeText('Cán bộ - Thiết bị')}>
                  <Text textStyle='bold-sm'>Cán bộ - Thiết bị</Text>
                </MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      {mode === 'room-employee' ? (
        <RoomEmployeeMode />
      ) : (
        <EmployeeFacilityMode />
      )}
    </AdminDashboard>
  )
}

export default Arrangement
