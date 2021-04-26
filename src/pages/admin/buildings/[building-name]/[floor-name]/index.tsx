/* eslint-disable prettier/prettier */
import {
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  Flex,
  Box,
  Button,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  useDisclosure,
} from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import AdminDashboard from '../../../../../layouts/AdminDashboard'
import { useColor } from '../../../../../theme/useColorMode'
import RoomList from '../../components/RoomList'
import axios from '../../../../../utils/axios'
import { BUILDING, FLOOR, ROOM } from '../../../../../types'

export default function BuildingDetail() {
  const router = useRouter()
  const { hoverTextColor, hoverBgColor, selectBgColor } = useColor()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenNewRoom,
    onOpen: onOpenNewRoom,
    onClose: onCloseNewRoom,
  } = useDisclosure()
  const [building, setBuilding] = useState<BUILDING>({})
  const [floor, setFloor] = useState<FLOOR>({})
  const [rooms, setRooms] = useState<ROOM[]>([])
  const [newFloorName, setNewFloorName] = useState<string>('')
  const [newRoomName, setNewRoomName] = useState<string>('')

  const refreshData = () => {
    const buildingName = router.query['building-name'] as string
    const floorName = router.query['floor-name'] as string
    axios
      .get(`/buildings/${buildingName.split('-')[1]}`)
      .then((response) => {
        setBuilding(response.data.building)
        debugger
        const { floors } = response.data.building
        setFloor(
          floors.filter(
            (item: FLOOR) => item.name === floorName.split('-')[1]
          )[0]
        )
        setRooms(
          floors.filter(
            (item: FLOOR) => item.name === floorName.split('-')[1]
          )[0].rooms
        )
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const createNewFloor = () => {
    axios
      .post('/floors', { name: newFloorName, buildingId: building.id })
      .then(() => {
        refreshData()
        onClose()
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const createNewRoom = () => {
    console.log(newRoomName)
    debugger
    axios
      .post('/rooms', { name: newRoomName, floorId: floor.id })
      .then(() => {
        refreshData()
        onCloseNewRoom()
      })
      .catch((error) => {
        console.log(error)
      })
  }
  useEffect(() => {
    refreshData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])
  return (
    <AdminDashboard isBuilding>
      <Flex justifyContent='space-between' alignItems='center' mb={5}>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href='/admin/buildings'>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>Tòa nhà</Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link href={`/admin/buildings/building-${building?.name}`}>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>Tòa nhà {building?.name}</Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link
              href={`/admin/buildings/building-${building?.name}/floor-${floor.name}`}>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>Tầng {floor.name}</Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
        </Breadcrumb>
        <Button
          rightIcon={<ArrowRightIcon fontSize='xs' />}
          colorScheme='teal'
          variant='ghost'
          size='sm'
          onClick={onOpen}>
          <Text textStyle='bold-sm' mt='0.1rem'>
            Tạo tầng mới
          </Text>
        </Button>
      </Flex>
      <Grid templateColumns='repeat(14, 1fr)' gap={4}>
        <GridItem colSpan={12}>
          <RoomList rooms={rooms} building={building} floor={floor} />
          <Button
            rightIcon={<ArrowRightIcon fontSize='xs' />}
            colorScheme='teal'
            variant='ghost'
            size='sm'
            onClick={onOpenNewRoom}
            mt='5'>
            <Text textStyle='bold-sm' mt='0.1rem'>
              Tạo phòng mới
            </Text>
          </Button>
        </GridItem>
        <GridItem
          colSpan={2}
          pl='1em'
          borderLeftWidth='1px'
          borderLeftColor='gray.100'
          overflow='auto'
          maxH='80vh'
          className='scrollbar'>
          {!building.floors
            ? null
            : building.floors.map((item: FLOOR, index: number) => (
              <Link
                href={`/admin/buildings/building-${building?.name}/floor-${item.name}`}
                replace>
                <Box
                  key={index}
                  p={1.5}
                  mb={4}
                  cursor='pointer'
                  color={item.id === floor.id ? hoverTextColor : ''}
                  backgroundColor={item.id === floor.id ? selectBgColor : ''}
                  borderRadius='0.5em'
                  _hover={{
                    color: hoverTextColor,
                    backgroundColor: hoverBgColor,
                    borderRadius: '0.5em',
                  }}>
                  <Text textAlign='center' textStyle='bold-sm'>
                    Tầng {item.name}
                  </Text>
                </Box>
              </Link>
            ))}
        </GridItem>
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tạo tầng mới</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Tên tầng</FormLabel>
              <Input
                colorScheme='teal'
                placeholder='Tên tầng'
                onChange={(event) => setNewFloorName(event.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button size='sm' onClick={onClose} mr={3}>
              Hủy
            </Button>
            <Button size='sm' colorScheme='teal' onClick={createNewFloor}>
              Tạo mới
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenNewRoom} onClose={onCloseNewRoom}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tạo phòng mới</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Tên phòng</FormLabel>
              <Input colorScheme='teal' placeholder='Tên phòng' onChange={(event) => setNewRoomName(event.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button size='sm' onClick={onCloseNewRoom} mr={3}>
              Hủy
            </Button>
            <Button size='sm' colorScheme='teal' onClick={createNewRoom}>
              Tạo mới
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </AdminDashboard>
  )
}
