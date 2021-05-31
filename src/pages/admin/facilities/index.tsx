import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
} from '@chakra-ui/react'
import { Search2Icon, ArrowRightIcon, ChevronDownIcon } from '@chakra-ui/icons'
import Link from 'next/link'

import { useState, useEffect } from 'react'
import AdminDashboard from '../../../layouts/AdminDashboard'
import FacilityList from './components/FacilityList'
import axios from '../../../utils/axios'
import { FACILITY } from '../../../types'

export default function Facility() {
  const [modeName, setModeName] = useState('Máy tính')
  const [mode, setMode] = useState('computer')

  const [statusName, setStatusName] = useState('Sẵn sàng')
  const [status, setStatus] = useState('ready')

  const [currentFacilities, setCurrentFacilities] = useState<FACILITY[]>([{}])
  // useEffect(() => {
  //   axios.get('/facilities').then((response) => {
  //     setCurrentFacilities(response.data.facilities || [])
  //   })
  // }, [])

  const refresh = () => {
    axios.get(`/facilities?type=${mode}&status=${status}`).then((response) => {
      setCurrentFacilities(response.data.facilities)
    })
  }

  useEffect(() => {
    refresh()
  }, [mode, status])
  return (
    <AdminDashboard isFacility title='Thiết bị'>
      <Flex justifyContent='space-between' alignItems='center' mb={5}>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href='/admin/facilities'>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>Thiết bị</Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
        </Breadcrumb>
        <Link href='/admin/facilities/new'>
          <Button
            rightIcon={<ArrowRightIcon fontSize='xs' />}
            colorScheme='teal'
            variant='ghost'
            size='sm'>
            Tạo thiết bị mới
          </Button>
        </Link>
      </Flex>
      <Flex justifyContent='space-between' mb={5}>
        <Flex>
          <Menu>
            <MenuButton
              size='sm'
              as={Button}
              rightIcon={<ChevronDownIcon />}
              mr='5'>
              <Text textStyle='bold-sm'>{modeName}</Text>
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                defaultValue='computer'
                title='Loại thiết bị'
                type='radio'
                onChange={(value) => setMode(value.toString())}>
                <MenuItemOption
                  value='computer'
                  onClick={() => setModeName('Máy tính')}>
                  <Text textStyle='bold-sm'>Máy tính</Text>
                </MenuItemOption>
                <MenuItemOption
                  value='printer'
                  onClick={() => setModeName('Máy in')}>
                  <Text textStyle='bold-sm'>Máy in</Text>
                </MenuItemOption>
                <MenuItemOption
                  value='fax'
                  onClick={() => setModeName('Máy fax')}>
                  <Text textStyle='bold-sm'>Máy fax</Text>
                </MenuItemOption>
                <MenuItemOption
                  value='node'
                  onClick={() => setModeName('Nút mạng')}>
                  <Text textStyle='bold-sm'>Nút mạng</Text>
                </MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton size='sm' as={Button} rightIcon={<ChevronDownIcon />}>
              <Text textStyle='bold-sm'>{statusName}</Text>
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                defaultValue='ready'
                title='Trạng thái'
                type='radio'
                onChange={(value) => setStatus(value.toString())}>
                <MenuItemOption
                  value='ready'
                  onClick={() => setStatusName('Sẵn sàng')}>
                  <Text textStyle='bold-sm'>Sẵn sàng</Text>
                </MenuItemOption>
                <MenuItemOption
                  value='repairing'
                  onClick={() => setStatusName('Đang sửa chữa')}>
                  <Text textStyle='bold-sm'>Đang sửa chữa</Text>
                </MenuItemOption>
                <MenuItemOption
                  value='error'
                  onClick={() => setStatusName('Hỏng')}>
                  <Text textStyle='bold-sm'>Hỏng</Text>
                </MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </Flex>
        <InputGroup maxW='30%'>
          <InputLeftElement pointerEvents='none'>
            <Search2Icon color='gray.300' />
          </InputLeftElement>
          <Input type='text' placeholder='Search request id' />
        </InputGroup>
      </Flex>
      <FacilityList facilities={currentFacilities} refresh={refresh} />
    </AdminDashboard>
  )
}
