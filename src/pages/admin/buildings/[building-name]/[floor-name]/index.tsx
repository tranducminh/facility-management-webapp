/* eslint-disable prettier/prettier */
import {
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  Flex,
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
  FormErrorMessage,
} from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Formik, Form, Field } from 'formik'

import { useDispatch } from 'react-redux'
import AdminDashboard from '../../../../../layouts/AdminDashboard'
import RoomList from '../../components/RoomList'
import axios from '../../../../../utils/axios'
import { BUILDING, FLOOR, ROOM } from '../../../../../types'
import FloorItem from '../../components/FloorItem'
import { NotificationStatus } from '../../../../../redux/types/notification.type'
import {
  pushNotification,
  resetNotification,
} from '../../../../../redux/actions/notification.action'

export default function BuildingDetail() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenNewRoom,
    onOpen: onOpenNewRoom,
    onClose: onCloseNewRoom,
  } = useDisclosure()

  const [building, setBuilding] = useState<BUILDING>({})
  const [floor, setFloor] = useState<FLOOR>({})
  const [rooms, setRooms] = useState<ROOM[]>([])

  type FormData = {
    name: string
  }

  const refreshData = () => {
    const buildingName = router.query['building-name'] as string
    const floorName = router.query['floor-name'] as string
    axios
      .get(`/buildings/${buildingName.split('-')[1]}`)
      .then((response) => {
        setBuilding(response.data.building)
        const { floors } = response.data.building
        setFloor(
          floors.filter(
            (item: FLOOR) => item?.name === floorName.split('-')[1]
          )[0]
        )
        setRooms(
          floors.filter(
            (item: FLOOR) => item?.name === floorName.split('-')[1]
          )[0].rooms
        )
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const createNewFloor = (data: FormData) => {
    axios
      .post('/floors', { ...data, buildingId: building.id })
      .then((res) => {
        refreshData()
        onClose()
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
  const createNewRoom = (data: FormData) => {
    axios
      .post('/rooms', { ...data, floorId: floor.id })
      .then((res) => {
        refreshData()
        onCloseNewRoom()
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
  useEffect(() => {
    refreshData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  function validateFloorName(value: string) {
    let error
    if (!value) {
      error = 'Tên tầng không được bỏ trống'
    }
    return error
  }

  function validateRoomName(value: string) {
    let error
    if (!value) {
      error = 'Tên phòng không được bỏ trống'
    }
    return error
  }

  return (
    <AdminDashboard isBuilding title={`Tòa nhà ${building?.name}`}>
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
              href={`/admin/buildings/building-${building?.name}/floor-${floor?.name}`}>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>Tầng {floor?.name}</Text>
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
          <RoomList
            rooms={rooms}
            building={building}
            floor={floor}
            refresh={refreshData}
          />
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
              <FloorItem floor={item} key={index} currentFloor={floor} building={building} refresh={refreshData} />
            ))}
        </GridItem>
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={{ name: '' }}
            onSubmit={async (values: FormData, actions: any) => {
              await createNewFloor(values)
              actions.setSubmitting(false)
            }}>
            {(props) => (
              <Form>
                <ModalHeader>Tạo tầng mới</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <Field name='name' validate={validateFloorName}>
                    {({ field, form }: { field: any; form: any }) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors?.name && form.touched?.name}>
                        <FormLabel>Tên tầng</FormLabel>
                        <Input
                          {...field}
                          id='name'
                          colorScheme='teal'
                          placeholder='Tên tầng'
                        />
                        <FormErrorMessage>{form.errors?.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </ModalBody>
                <ModalFooter>
                  <Button size='sm' onClick={onClose} mr={3}>
                    Hủy
                  </Button>
                  <Button
                    size='sm'
                    colorScheme='teal'
                    type='submit'
                    isLoading={props.isSubmitting}>
                    Tạo mới
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenNewRoom} onClose={onCloseNewRoom}>
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={{ name: '' }}
            onSubmit={async (values: FormData, actions: any) => {
              await createNewRoom(values)
              actions.setSubmitting(false)
            }}>
            {(props) => (
              <Form>
                <ModalHeader>Tạo phòng mới</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <Field name='name' validate={validateRoomName}>
                    {({ field, form }: { field: any; form: any }) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors?.name && form.touched?.name}>
                        <FormLabel>Tên phòng</FormLabel>
                        <Input
                          {...field}
                          id='name'
                          colorScheme='teal'
                          placeholder='Tên phòng'
                        />
                        <FormErrorMessage>{form.errors?.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </ModalBody>
                <ModalFooter>
                  <Button size='sm' onClick={onCloseNewRoom} mr={3}>
                    Hủy
                  </Button>
                  <Button
                    size='sm'
                    colorScheme='teal'
                    type='submit'
                    isLoading={props.isSubmitting}>
                    Tạo mới
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </AdminDashboard >
  )
}
