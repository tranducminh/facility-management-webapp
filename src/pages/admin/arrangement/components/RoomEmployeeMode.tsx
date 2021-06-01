import { RiCommunityLine } from 'react-icons/ri'
import { FaBirthdayCake } from 'react-icons/fa'
import {
  Box,
  Grid,
  GridItem,
  Divider,
  Flex,
  Text,
  useColorMode,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import axios from '../../../../utils/axios'
import { EMPLOYEE, ROOM } from '../../../../types'
import { useColor } from '../../../../theme/useColorMode'
import {
  pushNotification,
  resetNotification,
} from '../../../../redux/actions/notification.action'
import { NotificationStatus } from '../../../../redux/types/notification.type'
import { ReducersType } from '../../../../redux/reducers'
import { setCurrentRoom } from '../../../../redux/actions/arrangement.action'

export default function RoomEmployeeMode() {
  const { hoverTextColor, hoverBgColor, selectBgColor } = useColor()
  const [rooms, setRooms] = useState<ROOM[]>([])
  const [activeRoom, setActiveRoom] = useState<ROOM>()
  const [employees, setEmployees] = useState<EMPLOYEE[]>([])
  const [currentEmployee, setCurrentEmployee] = useState<string>('')
  const dispatch = useDispatch()
  const useTypedSelector: TypedUseSelectorHook<ReducersType> = useSelector
  const arrangement = useTypedSelector((state) => state.arrangement)
  const { colorMode } = useColorMode()

  const refreshRoom = () => {
    axios
      .get('/rooms')
      .then((res) => {
        setRooms(res.data.rooms)
        if (activeRoom?.id) {
          setActiveRoom(
            res.data.rooms.filter((room: ROOM) => room.id === activeRoom?.id)[0]
          )
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const refreshEmployee = () => {
    axios
      .get('/employees?hasRoom=false')
      .then((response) => {
        setEmployees(response.data.employees)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    refreshRoom()
    refreshEmployee()
  }, [])

  useEffect(() => {
    if (arrangement.currentRoomId && rooms.length > 0) {
      chooseRoom(arrangement.currentRoomId)
      dispatch(setCurrentRoom({ roomId: undefined }))
    }
  }, [arrangement, rooms])

  const chooseRoom = (id?: number) => {
    setActiveRoom(rooms.filter((room: ROOM) => room.id === id)[0])
  }

  function allowDropEmployee(ev: any) {
    ev.preventDefault()
  }

  async function dragEmployee(ev: any) {
    await setCurrentEmployee(ev.target.id)
  }

  function dropEmployee(ev: any) {
    ev.preventDefault()
    if (
      activeRoom?.employees?.filter(
        (employee) => employee.identity === currentEmployee
      ).length === 0
    ) {
      axios
        .put(`/employees/${currentEmployee}/room`, { roomId: activeRoom?.id })
        .then((res) => {
          refreshRoom()
          refreshEmployee()
          dispatch(
            pushNotification({
              title: res.data.message,
              description: res.data.description,
              status: NotificationStatus.SUCCESS,
            })
          )
          dispatch(resetNotification())
        })
        .catch((error) => {
          dispatch(
            pushNotification({
              title: error.response.data.message,
              description: error.response.data.description,
              status: NotificationStatus.ERROR,
            })
          )
          dispatch(resetNotification())
        })
    }
  }

  function dropRevertEmployee(ev: any) {
    ev.preventDefault()
    if (
      employees?.filter((employee) => employee.identity === currentEmployee)
        .length === 0
    ) {
      axios
        .delete(`/employees/${currentEmployee}/room`)
        .then((res) => {
          refreshRoom()
          refreshEmployee()
          dispatch(
            pushNotification({
              title: res.data.message,
              description: res.data.description,
              status: NotificationStatus.SUCCESS,
            })
          )
          dispatch(resetNotification())
        })
        .catch((error) => {
          dispatch(
            pushNotification({
              title: error.response.data.message,
              description: error.response.data.description,
              status: NotificationStatus.ERROR,
            })
          )
          dispatch(resetNotification())
        })
    }
  }

  return (
    <Grid templateColumns='repeat(9, 1fr)' gap={4}>
      <GridItem colSpan={2} h='90vh' overflow='auto'>
        {rooms &&
          rooms.map((room: ROOM, index: number) => (
            <Box
              key={index}
              borderWidth='1px'
              borderRadius='lg'
              overflow='hidden'
              p='3'
              mb='5'
              onClick={() => chooseRoom(room.id)}
              backgroundColor={room.id === activeRoom?.id ? selectBgColor : ''}
              color={room.id === activeRoom?.id ? hoverTextColor : ''}
              _hover={{
                color: hoverTextColor,
                backgroundColor: hoverBgColor,
                borderRadius: '0.5em',
              }}
              cursor='pointer'>
              <Flex justifyContent='space-between'>
                <Text textStyle='bold-md'>Phòng: {room.name}</Text>
                <Text textStyle='bold-md'>#{room.id}</Text>
              </Flex>
              <Divider my='2' />
              <Text>Tòa nhà: {room.floor?.building?.name}</Text>
              <Text>Số lượng cán bộ: {room.employees?.length}</Text>
            </Box>
          ))}
      </GridItem>
      <GridItem
        colSpan={5}
        borderRadius='lg'
        backgroundColor={colorMode === 'dark' ? '#1c2531' : '#fbfbfb'}
        p='5'>
        <div
          id='active-room'
          onDrop={(e) => dropEmployee(e)}
          onDragOver={(e) => allowDropEmployee(e)}>
          <Flex justifyContent='space-between' w='100%' mb='5'>
            <Text textStyle='bold-xl'>Phòng: {activeRoom?.name}</Text>
            <Text textStyle='bold-xl'>
              Tòa nhà: {activeRoom?.floor?.building?.name}
            </Text>
          </Flex>
          <Grid templateColumns='repeat(2, 1fr)' gap={4} id='employees'>
            {activeRoom?.employees &&
              activeRoom?.employees.map((employee: EMPLOYEE, index: number) => (
                <GridItem
                  colSpan={1}
                  id={employee.identity}
                  draggable='true'
                  onDragStart={(e) => dragEmployee(e)}>
                  <Box
                    key={index}
                    borderWidth='1px'
                    borderRadius='lg'
                    overflow='hidden'
                    p='3'
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
                      {employee.dateOfBirth ? (
                        <Text ml='2'>
                          {new Date(employee.dateOfBirth).getDate()}/
                          {new Date(employee.dateOfBirth).getMonth() + 1}/
                          {new Date(employee.dateOfBirth).getFullYear()}
                        </Text>
                      ) : (
                        <Text ml='2'>Chưa cập nhật</Text>
                      )}
                    </Flex>
                  </Box>
                </GridItem>
              ))}
          </Grid>
        </div>
      </GridItem>
      <GridItem
        colSpan={2}
        id='pending-employee'
        onDrop={(e) => dropRevertEmployee(e)}
        onDragOver={(e) => allowDropEmployee(e)}
        h='90vh'
        overflow='auto'>
        {employees &&
          employees.map((employee: EMPLOYEE, index: number) => (
            <GridItem
              colSpan={1}
              draggable='true'
              className='student'
              id={employee.identity}
              onDragStart={(e) => dragEmployee(e)}>
              <Box
                key={index}
                borderWidth='1px'
                borderRadius='lg'
                overflow='hidden'
                p='3'
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
                  {employee.dateOfBirth ? (
                    <Text ml='2'>
                      {new Date(employee.dateOfBirth).getDate()}/
                      {new Date(employee.dateOfBirth).getMonth() + 1}/
                      {new Date(employee.dateOfBirth).getFullYear()}
                    </Text>
                  ) : (
                    <Text ml='2'>Chưa cập nhật</Text>
                  )}
                </Flex>
              </Box>
            </GridItem>
          ))}
      </GridItem>
    </Grid>
  )
}
