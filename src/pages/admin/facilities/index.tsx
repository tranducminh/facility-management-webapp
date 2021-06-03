import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
} from '@chakra-ui/react'
import { ArrowRightIcon, ChevronDownIcon } from '@chakra-ui/icons'
import Link from 'next/link'

import { useState, useEffect } from 'react'
import AdminDashboard from '../../../layouts/AdminDashboard'
import FacilityList from './components/FacilityList'
import axios from '../../../utils/axios'
import { FACILITY } from '../../../types'
import Loading from '../../../components/Loading'

export default function Facility() {
  const [modeName, setModeName] = useState('Máy tính')
  const [mode, setMode] = useState('computer')

  const [statusName, setStatusName] = useState('Sẵn sàng')
  const [status, setStatus] = useState('ready')

  const [currentFacilities, setCurrentFacilities] = useState<FACILITY[]>([{}])
  const [facilities, setFacilities] = useState<FACILITY[]>([{}])

  const [pageCount, setPageCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const refresh = () => {
    setIsLoading(true)
    axios.get(`/facilities?type=${mode}&status=${status}`).then((response) => {
      setFacilities(response.data.facilities)
      setCurrentFacilities(response.data.facilities.slice(0, 10))
      setPageCount(Math.ceil(parseFloat(response.data.facilities.length) / 10))
      setIsLoading(false)
    })
  }
  const onChangePage = (page: number) => {
    setCurrentFacilities(facilities.slice((page - 1) * 10, page * 10))
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
      <Flex justifyContent='flex-start' mb={5}>
        <Flex>
          <Menu>
            {({ onClose }) => (
              <>
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
                      closeOnSelect
                      value='computer'
                      onClick={() => {
                        setModeName('Máy tính')
                        onClose()
                      }}>
                      <Text textStyle='bold-sm'>Máy tính</Text>
                    </MenuItemOption>
                    <MenuItemOption
                      closeOnSelect
                      value='printer'
                      onClick={() => {
                        setModeName('Máy in')
                        onClose()
                      }}>
                      <Text textStyle='bold-sm'>Máy in</Text>
                    </MenuItemOption>
                    <MenuItemOption
                      closeOnSelect
                      value='fax'
                      onClick={() => {
                        setModeName('Máy fax')
                        onClose()
                      }}>
                      <Text textStyle='bold-sm'>Máy fax</Text>
                    </MenuItemOption>
                  </MenuOptionGroup>
                </MenuList>
              </>
            )}
          </Menu>
          <Menu>
            {({ onClose }) => (
              <>
                <MenuButton
                  size='sm'
                  as={Button}
                  rightIcon={<ChevronDownIcon />}>
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
                      onClick={() => {
                        setStatusName('Sẵn sàng')
                        onClose()
                      }}>
                      <Text textStyle='bold-sm'>Sẵn sàng</Text>
                    </MenuItemOption>
                    <MenuItemOption
                      value='repairing'
                      onClick={() => {
                        setStatusName('Đang sửa chữa')
                        onClose()
                      }}>
                      <Text textStyle='bold-sm'>Đang sửa chữa</Text>
                    </MenuItemOption>
                    <MenuItemOption
                      value='error'
                      onClick={() => {
                        setStatusName('Hỏng')
                        onClose()
                      }}>
                      <Text textStyle='bold-sm'>Hỏng</Text>
                    </MenuItemOption>
                  </MenuOptionGroup>
                </MenuList>
              </>
            )}
          </Menu>
        </Flex>
      </Flex>
      {isLoading ? (
        <Loading />
      ) : (
        <FacilityList
          facilities={currentFacilities}
          refresh={refresh}
          pageCount={pageCount}
          onChangePage={onChangePage}
        />
      )}
    </AdminDashboard>
  )
}
