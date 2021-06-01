/* eslint-disable radix */
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Tag,
  Button,
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Flex,
  FormControl,
  FormLabel,
  Select,
  useDisclosure,
  FormErrorMessage,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  ViewIcon,
} from '@chakra-ui/icons'
import ReactPaginate from 'react-paginate'
import { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { MdDelete } from 'react-icons/md'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import axios from '../../../../utils/axios'
import { BUILDING, EMPLOYEE, FLOOR, ROOM } from '../../../../types'
import { NotificationStatus } from '../../../../redux/types/notification.type'
import {
  pushNotification,
  resetNotification,
} from '../../../../redux/actions/notification.action'
import Empty from '../../../../components/Empty'

type FormData = {
  identity: string
  name: string
  unit: string
}
export default function EmployeeComponent() {
  const {
    isOpen: isOpenUser,
    onOpen: onOpenUser,
    onClose: onCloseUser,
  } = useDisclosure()
  const dispatch = useDispatch()

  const [employees, setEmployees] = useState<EMPLOYEE[]>([{}])
  const [buildings, setBuildings] = useState<BUILDING[]>([{}])
  const [newEmployeeBuilding, setNewEmployeeBuilding] = useState<string>('')
  const [newEmployeeFloor, setNewEmployeeFloor] = useState<string>('')
  const [newEmployeeRoom, setNewEmployeeRoom] = useState<string>('')

  const [currentBuilding, setCurrentBuilding] = useState<BUILDING>({})
  const [currentFloor, setCurrentFloor] = useState<FLOOR>({})

  const [pageCount, setPageCount] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const refreshEmployee = (page?: number) => {
    if (page) setCurrentPage(page)
    axios
      .get(`/employees?offset=${page || currentPage}`)
      .then((res) => {
        setEmployees(res.data.employees)
        setPageCount(res.data.totalPage)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  useEffect(() => {
    refreshEmployee()
    axios
      .get('/buildings')
      .then((result) => {
        setBuildings(result.data.buildings)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    const building = buildings.filter(
      (item: BUILDING) => item.name === newEmployeeBuilding
    )[0]
    setCurrentBuilding(building)
  }, [newEmployeeBuilding])

  useEffect(() => {
    if (currentBuilding?.floors) {
      const floor = currentBuilding?.floors.filter(
        (item: FLOOR) => item.name === newEmployeeFloor
      )[0]
      setCurrentFloor(floor)
    }
  }, [newEmployeeFloor])

  const createNewEmployee = async (data: FormData) => {
    await axios
      .post('/employees', {
        ...data,
        roomId: parseInt(newEmployeeRoom),
      })
      .then((res) => {
        refreshEmployee()
        dispatch(
          pushNotification({
            title: res.data.message,
            description: res.data.description,
            status: NotificationStatus.SUCCESS,
          })
        )
        dispatch(resetNotification())
        onCloseUser()
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

  const removeEmployee = (id?: number) => {
    axios
      .delete(`/employees/${id}`)
      .then((res) => {
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

  function validateIdentity(value: string) {
    let error
    if (!value) {
      error = 'Mã nhân viên không được bỏ trống'
    }
    return error
  }

  function validateName(value: string) {
    let error
    if (!value) {
      error = 'Tên nhân viên không được bỏ trống'
    }
    return error
  }

  function validateUnit(value: string) {
    let error
    if (!value) {
      error = 'Tên đơn vị không được bỏ trống'
    }
    return error
  }

  function validateFloor() {
    let error
    if (newEmployeeBuilding && !newEmployeeFloor) {
      error = 'Tầng không được bỏ trống'
    }
    return error
  }

  function validateRoom() {
    let error
    if (newEmployeeFloor && !newEmployeeRoom) {
      error = 'Phòng không được bỏ trống'
    }
    return error
  }

  return (
    <div>
      <Flex justifyContent='space-between' alignItems='center' mb={5}>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href='/admin/employees'>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>Cán bộ</Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
        </Breadcrumb>
        <Button
          rightIcon={<ArrowRightIcon fontSize='xs' />}
          colorScheme='teal'
          variant='ghost'
          size='sm'
          onClick={onOpenUser}>
          <Text textStyle='bold-md'>Tạo cán bộ mới</Text>
        </Button>
      </Flex>
      {employees.length <= 0 ? (
        <Empty
          title='Không có cán bộ  '
          description='Hãy tạo cán bộ đầu tiên'
        />
      ) : (
        <>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>Mã nhân viên</Th>
                <Th>Tên</Th>
                <Th>Đơn vị</Th>
                <Th>Phòng</Th>
                <Th isNumeric>Hành động</Th>
              </Tr>
            </Thead>
            <Tbody>
              {employees.map((employee: EMPLOYEE, index: number) => (
                <Tr key={index}>
                  <Td>{employee.identity}</Td>
                  <Td>{employee.name}</Td>
                  <Td>{employee.unit}</Td>
                  <Td>
                    {employee.hasRoom === 'true' ? (
                      <Text>
                        {employee?.room?.floor?.building?.name} /
                        {employee?.room?.name}
                      </Text>
                    ) : (
                      <Tag
                        size='sm'
                        key='status'
                        variant='solid'
                        colorScheme='yellow'>
                        Chưa có phòng
                      </Tag>
                    )}
                  </Td>
                  <Td isNumeric>
                    <Popover size='md'>
                      <PopoverTrigger>
                        <IconButton
                          colorScheme='red'
                          aria-label='Remove employee'
                          variant='outline'
                          size='sm'
                          icon={<MdDelete />}
                          mr='2'
                        />
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverHeader mt='2' fontWeight='bold' border='0'>
                          <Text textAlign='left'>Xóa tài khoản</Text>
                        </PopoverHeader>
                        <PopoverArrow />
                        <PopoverCloseButton mt='2' />
                        <PopoverBody>
                          <Text textAlign='left'>
                            Bạn có chắc muốn xóa tài khoản của{' '}
                            <b>{employee.name}</b>
                          </Text>
                          <Text textAlign='left' mt='2'>
                            Các thiết bị của các bộ sẽ trở về trạng thái chờ
                          </Text>
                        </PopoverBody>
                        <PopoverFooter
                          border='0'
                          d='flex'
                          alignItems='center'
                          justifyContent='flex-end'
                          pb={4}>
                          <Button
                            size='xs'
                            colorScheme='green'
                            onClick={() => removeEmployee(employee.id)}>
                            Đồng ý
                          </Button>
                        </PopoverFooter>
                      </PopoverContent>
                    </Popover>
                    <Link href={`/admin/employees/${employee.identity}`}>
                      <IconButton
                        colorScheme='teal'
                        aria-label='View Employee'
                        variant='outline'
                        size='sm'
                        icon={<ViewIcon />}
                      />
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Mã nhân viên</Th>
                <Th>Tên</Th>
                <Th>Đơn vị</Th>
                <Th>Phòng</Th>
                <Th isNumeric>Hành động</Th>
              </Tr>
            </Tfoot>
          </Table>
          {pageCount > 1 ? (
            <Box maxW='50%' mt={5} float='right'>
              <ReactPaginate
                previousLabel={<ChevronLeftIcon fontSize='1.7rem' />}
                nextLabel={<ChevronRightIcon fontSize='1.7rem' />}
                breakLabel='...'
                breakClassName='break-me'
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                onPageChange={({ selected }) => {
                  refreshEmployee(selected + 1)
                }}
                containerClassName='pagination'
                // subContainerClassName='pages pagination'
                activeClassName='active'
              />
            </Box>
          ) : null}
        </>
      )}
      <Modal isOpen={isOpenUser} onClose={onCloseUser}>
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={{ identity: '', name: '', unit: '' }}
            onSubmit={async (values: FormData, actions: any) => {
              await createNewEmployee(values)
              actions.setSubmitting(false)
            }}>
            {(props) => (
              <Form>
                <ModalHeader>Tạo cán bộ mới</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <Field name='identity' validate={validateIdentity}>
                    {({ field, form }: { field: any; form: any }) => (
                      <FormControl
                        isRequired
                        isInvalid={
                          form.errors.identity && form.touched.identity
                        }>
                        <FormLabel>Mã nhân viên</FormLabel>
                        <Input
                          colorScheme='teal'
                          placeholder='Mã nhân viên'
                          {...field}
                        />
                        <FormErrorMessage>
                          {form.errors?.identity}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='name' validate={validateName}>
                    {({ field, form }: { field: any; form: any }) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors.name && form.touched.name}>
                        <FormLabel>Tên</FormLabel>
                        <Input
                          colorScheme='teal'
                          placeholder='Tên'
                          {...field}
                        />
                        <FormErrorMessage>{form.errors?.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='unit' validate={validateUnit}>
                    {({ field, form }: { field: any; form: any }) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors.unit && form.touched.unit}>
                        <FormLabel>Đơn vị</FormLabel>
                        <Input
                          colorScheme='teal'
                          placeholder='Đơn vị'
                          {...field}
                        />
                        <FormErrorMessage>{form.errors?.unit}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Flex justifyContent='space-between'>
                    <FormControl mt='3' w='48%'>
                      <FormLabel>Tòa nhà</FormLabel>
                      <Select
                        placeholder='Chọn tòa nhà'
                        onChange={(event) => {
                          setNewEmployeeBuilding(event.target.value)
                        }}>
                        {buildings.map((item: BUILDING, index: number) => (
                          <option key={index} value={item.name}>
                            Tòa nhà {item.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <Field name='floor' validate={validateFloor}>
                      {({ field, form }: { field: any; form: any }) => (
                        <FormControl
                          mt='3'
                          w='48%'
                          isRequired={!!newEmployeeBuilding}
                          isInvalid={form.errors.floor && form.touched.floor}>
                          <FormLabel>Tầng</FormLabel>
                          <Select
                            placeholder='Chọn tầng'
                            {...field}
                            onChange={(event) => {
                              setNewEmployeeFloor(event.target.value)
                            }}>
                            {!currentBuilding?.floors
                              ? null
                              : currentBuilding.floors.map(
                                (item: FLOOR, index: number) => (
                                  <option key={index} value={item.name}>
                                    Tầng {item.name}
                                  </option>
                                )
                              )}
                          </Select>
                          <FormErrorMessage>
                            {form.errors?.floor}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                  <Field name='room' validate={validateRoom}>
                    {({ field, form }: { field: any; form: any }) => (
                      <FormControl
                        mt='3'
                        w='48%'
                        isRequired={!!newEmployeeFloor}
                        isInvalid={form.errors.room && form.touched.room}>
                        <FormLabel>Phòng</FormLabel>
                        <Select
                          placeholder='Chọn phòng'
                          {...field}
                          onChange={(event) => {
                            setNewEmployeeRoom(event.target.value)
                          }}>
                          {!currentFloor?.rooms
                            ? null
                            : currentFloor.rooms.map(
                              (item: ROOM, index: number) => (
                                <option key={index} value={item.id}>
                                  Phòng {item.name}
                                </option>
                              )
                            )}
                        </Select>
                        <FormErrorMessage>{form.errors?.room}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </ModalBody>
                <ModalFooter>
                  <Button size='sm' onClick={onCloseUser} mr={3}>
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
    </div>
  )
}
