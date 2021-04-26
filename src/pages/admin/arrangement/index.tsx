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
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import AdminDashboard from '../../../layouts/AdminDashboard'
import axios from '../../../utils/axios'
import { Link } from '../../../../i18n'
import { ROOM } from '../../../types'

function Arrangement() {
  const [mode, setMode] = useState('Room - Employee')
  const [rooms, setRooms] = useState([])
  const [columns, setColumns] = useState({
    room: {
      id: 'room',
    },
  })
  useEffect(() => {
    axios
      .get('/buildings/A1/floors/4')
      .then((response) => {
        setRooms(response.data.floor.rooms)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const deletedRoom = rooms.splice(source.index, 1)[0]
    debugger
    rooms.splice(destination.index, 0, deletedRoom)
    debugger
    setRooms(rooms)
  }

  return (
    <AdminDashboard isArrangement>
      <Flex justifyContent='space-between' alignItems='center' mb={5}>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href='/admin/arrangement'>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>Arrangement</Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex alignItems='center'>
          <Text textStyle='bold-sm' mr='3'>
            Mode:
          </Text>
          <Menu>
            <MenuButton size='sm' as={Button} rightIcon={<ChevronDownIcon />}>
              <Text textStyle='bold-sm'>{mode}</Text>
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                defaultValue='room-employee'
                title='Mode'
                type='radio'>
                <MenuItemOption
                  value='room-employee'
                  onClick={() => setMode('Room - Employee')}>
                  <Text textStyle='bold-sm'>Room - Employee</Text>
                </MenuItemOption>
                <MenuItemOption
                  value='employee-facility'
                  onClick={() => setMode('Employee - Facility')}>
                  <Text textStyle='bold-sm'>Employee - Facility</Text>
                </MenuItemOption>
                <MenuItemOption
                  value='room-facility'
                  onClick={() => setMode('Room - Facility')}>
                  <Text textStyle='bold-sm'>Room - Facility</Text>
                </MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      <DragDropContext onDragEnd={onDragEnd}>
        <Grid templateColumns='repeat(8, 1fr)' gap={4}>
          <GridItem colSpan={2}>
            <RoomColumn rooms={rooms} />
          </GridItem>
        </Grid>
      </DragDropContext>
    </AdminDashboard>
  )
}

const RoomColumn = ({ rooms }: { rooms: ROOM[] }) => {
  return (
    <Box>
      <Text textStyle='bold-md'>Rooms</Text>
      <Droppable droppableId='1'>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {rooms.map((room: ROOM, index: number) => (
              <Draggable draggableId={room.id?.toString() || '1'} index={index}>
                {(provided_) => (
                  <div
                    {...provided_.draggableProps}
                    {...provided_.dragHandleProps}
                    ref={provided_.innerRef}>
                    <Box
                      key={index}
                      border='1px solid #ffffff'
                      borderRadius='4'
                      p='3'
                      textAlign='center'
                      my='3'>
                      <Text textStyle='bold-sm'>{room.name}</Text>
                    </Box>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Box>
  )
}

export default Arrangement
