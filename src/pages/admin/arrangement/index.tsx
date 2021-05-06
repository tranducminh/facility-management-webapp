/* eslint-disable radix */
import { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
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
  Box,
  Grid,
  GridItem,
  Divider,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { RiCommunityLine } from 'react-icons/ri'
import { FaBirthdayCake } from 'react-icons/fa'
import AdminDashboard from '../../../layouts/AdminDashboard'
import axios from '../../../utils/axios'
import { Link } from '../../../../i18n'
import { EMPLOYEE, ROOM } from '../../../types'
import { useColor } from '../../../theme/useColorMode'

function Arrangement() {
  const { hoverTextColor, hoverBgColor, selectBgColor } = useColor()
  const [mode, setMode] = useState('Phòng - Cán bộ')
  const [rooms, setRooms] = useState<ROOM[]>([])
  const [activeRoom, setActiveRoom] = useState<ROOM>()
  const [employees, setEmployees] = useState<EMPLOYEE[]>([])
  useEffect(() => {
    axios
      .get('/rooms')
      .then((response) => {
        setRooms(response.data.rooms)
      })
      .catch((error) => {
        console.log(error)
      })
    axios
      .get('/employees?hasRoom=false')
      .then((response) => {
        setEmployees(response.data.employees)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const chooseRoom = (id?: number) => {
    setActiveRoom(rooms.filter((room: ROOM) => room.id === id)[0])
  }

  function allowDrop(ev) {
    ev.preventDefault()
  }

  function drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id)
  }

  function drop(ev) {
    ev.preventDefault()
    let data = ev.dataTransfer.getData('text')
    ev.target.appendChild(document.getElementById(data))
  }

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
              <Text textStyle='bold-sm'>{mode}</Text>
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                defaultValue='room-employee'
                title='Chế độ'
                type='radio'>
                <MenuItemOption
                  value='room-employee'
                  onClick={() => setMode('Phòng - Cán bộ')}>
                  <Text textStyle='bold-sm'>Phòng - Cán bộ</Text>
                </MenuItemOption>
                <MenuItemOption
                  value='employee-facility'
                  onClick={() => setMode('Cán bộ - Thiết bị')}>
                  <Text textStyle='bold-sm'>Cán bộ - Thiết bị</Text>
                </MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      <Grid templateColumns='repeat(9, 1fr)' gap={4}>
        <GridItem colSpan={2} h='90vh' overflow='auto'>
          {rooms &&
            rooms.map((room: ROOM, index: number) => (
              <Box
                key={index}
                borderWidth='1px'
                borderRadius='lg'
                overflow='hidden'
                p='5'
                mb='5'
                onClick={() => chooseRoom(room.id)}
                backgroundColor={
                  room.id === activeRoom?.id ? selectBgColor : ''
                }
                color={room.id === activeRoom?.id ? hoverTextColor : ''}
                _hover={{
                  color: hoverTextColor,
                  backgroundColor: hoverBgColor,
                  borderRadius: '0.5em',
                }}
                cursor='pointer'>
                <Text textStyle='bold-sm'>#{room.id}</Text>
                <Text>Phòng: {room.name}</Text>
                <Text>Tòa nhà: {room.floor?.building?.name}</Text>
                <Text>Số lượng cán bộ: {room.employees?.length}</Text>
              </Box>
            ))}
        </GridItem>
        <GridItem colSpan={5} borderRadius='lg' backgroundColor='#1c2531' p='3'>
          <div
            onDrop={(event) => drop(event)}
            onDragOver={(event) => allowDrop(event)}>
            <Flex justifyContent='space-between' w='100%' mb='5'>
              <Text textStyle='bold-xl'>Phòng: {activeRoom?.name}</Text>
              <Text textStyle='bold-xl'>
                Tòa nhà: {activeRoom?.floor?.building?.name}
              </Text>
            </Flex>
            <Grid templateColumns='repeat(2, 1fr)' gap={4}>
              {activeRoom?.employees &&
                activeRoom?.employees.map(
                  (employee: EMPLOYEE, index: number) => (
                    <GridItem colSpan={1}>
                      <Box
                        key={index}
                        borderWidth='1px'
                        borderRadius='lg'
                        overflow='hidden'
                        p='5'
                        mb='5'>
                        <Text textStyle='bold-sm'>#{employee.identity}</Text>
                        <Text isTruncated textStyle='bold-sm'>
                          {employee.name}
                        </Text>
                        <Divider my='2' />
                        <Flex alignItems='center'>
                          <RiCommunityLine />
                          <Text ml='2'>{employee.unit}</Text>
                        </Flex>
                        <Flex alignItems='center' mt='2'>
                          <FaBirthdayCake />
                          {employee.dateOfBirth ? (
                            <Text ml='2'>
                              {new Date(employee.dateOfBirth).getDate()}/
                              {new Date(employee.dateOfBirth).getMonth() + 1}/
                              {new Date(employee.dateOfBirth).getFullYear()}
                            </Text>
                          ) : null}
                        </Flex>
                      </Box>
                    </GridItem>
                  )
                )}
            </Grid>
          </div>
        </GridItem>
        <GridItem colSpan={2}>
          {employees &&
            employees.map((employee: EMPLOYEE, index: number) => (
              <div draggable='true' onDragStart={(event) => drag(event)}>
                <Box
                  key={index}
                  borderWidth='1px'
                  borderRadius='lg'
                  overflow='hidden'
                  p='5'
                  mb='5'
                  _hover={{
                    color: hoverTextColor,
                    backgroundColor: hoverBgColor,
                    borderRadius: '0.5em',
                  }}
                  cursor='pointer'>
                  <Text textStyle='bold-sm'>#{employee.identity}</Text>
                  <Text isTruncated textStyle='bold-sm'>
                    {employee.name}
                  </Text>
                  <Divider my='2' />
                  <Flex alignItems='center'>
                    <RiCommunityLine />
                    <Text ml='2'>{employee.unit}</Text>
                  </Flex>
                  <Flex alignItems='center' mt='2'>
                    <FaBirthdayCake />
                    <Text ml='2'>{employee.dateOfBirth}</Text>
                  </Flex>
                </Box>
              </div>
            ))}
        </GridItem>
      </Grid>
    </AdminDashboard>
  )
}

export default Arrangement
