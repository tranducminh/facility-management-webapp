/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-nested-ternary */
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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  FormControl,
  FormLabel,
  Input,
  Grid,
  GridItem,
  Select,
  Textarea,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Formik, Form, Field } from 'formik'
import { useRouter } from 'next/router'
import AdminDashboard from '../../../../layouts/AdminDashboard'
import axios from '../../../../utils/axios'
import {
  BUILDING,
  EMPLOYEE,
  FLOOR,
  ROOM,
  CONFIGURATION,
} from '../../../../types'

type FormData = {
  name: string
  origin: string
  price: string
}

export default function NewFacility() {
  const router = useRouter()

  const [modeName, setModeName] = useState('Máy tính')
  const [mode, setMode] = useState('computer')

  const [buildings, setBuildings] = useState<BUILDING[]>([{}])
  const [currentBuildingId, setCurrentBuildingId] = useState<number>()
  const [currentFloorId, setCurrentFloorId] = useState<number>()
  const [currentRoomId, setCurrentRoomId] = useState<number>()
  const [currentEmployeeId, setCurrentEmployeeId] = useState<number>()

  const [currentBuilding, setCurrentBuilding] = useState<BUILDING>({})
  const [currentFloor, setCurrentFloor] = useState<FLOOR>({})
  const [currentRoom, setCurrentRoom] = useState<ROOM>({})
  const [currentEmployee, setCurrentEmployee] = useState<EMPLOYEE | null>(null)

  const [configuration, setConfiguration] = useState<CONFIGURATION>()

  useEffect(() => {
    axios.get('/buildings').then((result) => {
      setBuildings(result.data.buildings)
    })
  }, [])

  useEffect(() => {
    const building = buildings.filter(
      (item: BUILDING) => item.id === currentBuildingId
    )[0]
    setCurrentBuilding(building)
  }, [currentBuildingId])

  useEffect(() => {
    if (currentBuilding?.floors) {
      const floor = currentBuilding?.floors.filter(
        (item: FLOOR) => item.id === currentFloorId
      )[0]
      setCurrentFloor(floor)
    }
  }, [currentFloorId])

  useEffect(() => {
    if (currentFloor?.rooms) {
      const room = currentFloor?.rooms.filter(
        (item: ROOM) => item.id === currentRoomId
      )[0]
      setCurrentRoom(room)
    }
  }, [currentRoomId])

  useEffect(() => {
    if (currentRoom?.employees) {
      const employee = currentRoom?.employees.filter(
        (item: EMPLOYEE) => item.id === currentEmployeeId
      )[0]
      setCurrentEmployee(employee)
    }
  }, [currentEmployeeId])

  const createNewFacility = (data: FormData) => {
    axios
      .post('/facilities', {
        ...data,
        configuration,
        facilityType: mode,
        employeeId: currentEmployeeId,
      })
      .then((res) => {
        router.push(`/admin/facilities/${res.data.facility.id}`)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function validateName(value: string) {
    let error
    if (!value) {
      error = 'Tên thiết bị không được bỏ trống'
    }
    return error
  }

  function validateOrigin(value: string) {
    let error
    if (!value) {
      error = 'Nguồn gốc không được bỏ trống'
    }
    return error
  }

  function validatePrice(value: string) {
    let error
    if (!value) {
      error = 'Giá trị không được bỏ trống'
    }
    if (parseInt(value) < 0) {
      error = 'Giá trị không được là số âm'
    }
    return error
  }

  return (
    <AdminDashboard isFacility>
      <Flex justifyContent='space-between' alignItems='center' mb={5}>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href='/admin/facilities'>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>Thiết bị</Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link href='/admin/facilities/new'>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>Tạo mới</Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
        </Breadcrumb>

        <Menu>
          <MenuButton size='sm' as={Button} rightIcon={<ChevronDownIcon />}>
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
      </Flex>
      <Formik
        enableReinitialize
        initialValues={{
          name: '',
          origin: '',
          price: '',
        }}
        onSubmit={async (values: FormData, actions: any) => {
          await createNewFacility(values)
          actions.setSubmitting(false)
        }}>
        {(props) => (
          <Form>
            <Accordion defaultIndex={[0]} allowMultiple>
              <AccordionItem>
                <AccordionButton>
                  <Box flex='1' textAlign='left'>
                    <Text textStyle='bold-sm'>Thông tin chung</Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Grid templateColumns='repeat(2, 1fr)' gap={4}>
                    <GridItem colSpan={1}>
                      <Field name='name' validate={validateName}>
                        {({ field, form }: { field: any; form: any }) => (
                          <FormControl
                            isRequired
                            isInvalid={form.errors.name && form.touched.name}>
                            <FormLabel>Tên thiết bị</FormLabel>
                            <Input
                              id='name'
                              {...field}
                              placeholder='Tên thiết bị'
                            />
                            <FormErrorMessage>
                              {form.errors?.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Field name='origin' validate={validateOrigin}>
                        {({ field, form }: { field: any; form: any }) => (
                          <FormControl
                            isRequired
                            isInvalid={
                              form.errors.origin && form.touched.origin
                            }>
                            <FormLabel>Nguồn gốc</FormLabel>
                            <Input
                              {...field}
                              placeholder='Nguồn gốc'
                              id='origin'
                            />
                            <FormErrorMessage>
                              {form.errors?.origin}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Field name='price' validate={validatePrice}>
                        {({ field, form }: { field: any; form: any }) => (
                          <FormControl
                            isRequired
                            isInvalid={form.errors.price && form.touched.price}>
                            <FormLabel>Giá trị</FormLabel>
                            <Input
                              {...field}
                              placeholder='Giá trị'
                              id='price'
                              type='number'
                            />
                            <FormErrorMessage>
                              {form.errors?.price}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </GridItem>
                  </Grid>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                      <Text textStyle='bold-sm'> Thông số kỹ thuật</Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {mode === 'computer' ? (
                    <Grid templateColumns='repeat(2, 1fr)' gap={4}>
                      <GridItem colSpan={1}>
                        <FormControl id='cpu'>
                          <FormLabel>CPU</FormLabel>
                          <Textarea
                            placeholder='CPU'
                            onChange={(event) =>
                              setConfiguration({
                                ...configuration,
                                cpu: event.target.value,
                              })
                            }
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl id='mainBoard'>
                          <FormLabel>Main board</FormLabel>
                          <Textarea
                            placeholder='Main board'
                            onChange={(event) =>
                              setConfiguration({
                                ...configuration,
                                mainboard: event.target.value,
                              })
                            }
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl id='hardDrive'>
                          <FormLabel>Ổ cứng</FormLabel>
                          <Textarea
                            placeholder='Ổ cứng'
                            onChange={(event) =>
                              setConfiguration({
                                ...configuration,
                                hardDrive: event.target.value,
                              })
                            }
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl id='ram'>
                          <FormLabel>Bộ nhớ</FormLabel>
                          <Textarea
                            placeholder='Bộ nhớ'
                            onChange={(event) =>
                              setConfiguration({
                                ...configuration,
                                ram: event.target.value,
                              })
                            }
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl id='vga'>
                          <FormLabel>Card màn hình</FormLabel>
                          <Textarea
                            placeholder='Card màn hình'
                            onChange={(event) =>
                              setConfiguration({
                                ...configuration,
                                vga: event.target.value,
                              })
                            }
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl id='psu'>
                          <FormLabel>Nguồn</FormLabel>
                          <Textarea
                            placeholder='Nguồn'
                            onChange={(event) =>
                              setConfiguration({
                                ...configuration,
                                psu: event.target.value,
                              })
                            }
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl id='monitor'>
                          <FormLabel>Màn hình</FormLabel>
                          <Textarea
                            placeholder='Màn hình'
                            onChange={(event) =>
                              setConfiguration({
                                ...configuration,
                                monitor: event.target.value,
                              })
                            }
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl id='keyboard'>
                          <FormLabel>Bàn phím</FormLabel>
                          <Textarea
                            placeholder='Bàn phím'
                            onChange={(event) =>
                              setConfiguration({
                                ...configuration,
                                keyboard: event.target.value,
                              })
                            }
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl id='mouse'>
                          <FormLabel>Chuột</FormLabel>
                          <Textarea
                            placeholder='Chuột'
                            onChange={(event) =>
                              setConfiguration({
                                ...configuration,
                                mouse: event.target.value,
                              })
                            }
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl id='headPhone'>
                          <FormLabel>Tai nghe</FormLabel>
                          <Textarea
                            placeholder='Tai nghe'
                            onChange={(event) =>
                              setConfiguration({
                                ...configuration,
                                headPhone: event.target.value,
                              })
                            }
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl id='fanCase'>
                          <FormLabel>Tản nhiệt</FormLabel>
                          <Textarea
                            placeholder='Tản nhiệt'
                            onChange={(event) =>
                              setConfiguration({
                                ...configuration,
                                fanCase: event.target.value,
                              })
                            }
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl id='webcam'>
                          <FormLabel>Webcam</FormLabel>
                          <Textarea
                            placeholder='Webcam'
                            onChange={(event) =>
                              setConfiguration({
                                ...configuration,
                                webcam: event.target.value,
                              })
                            }
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl id='cardReader'>
                          <FormLabel>Đầu đọc thẻ</FormLabel>
                          <Textarea
                            placeholder='Đầu đọc thẻ'
                            onChange={(event) =>
                              setConfiguration({
                                ...configuration,
                                cardReader: event.target.value,
                              })
                            }
                          />
                        </FormControl>
                      </GridItem>
                    </Grid>
                  ) : mode === 'printer' ? (
                    <Grid templateColumns='repeat(2, 1fr)' gap={4}>
                      <GridItem colSpan={1}>
                        <FormControl id='model'>
                          <FormLabel>Model</FormLabel>
                          <Textarea
                            placeholder='Model'
                            onChange={(event) =>
                              setConfiguration({
                                ...configuration,
                                model: event.target.value,
                              })
                            }
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl id='printSpeed'>
                          <FormLabel>Tốc độ in</FormLabel>
                          <Textarea
                            placeholder='Tốc độ in'
                            onChange={(event) =>
                              setConfiguration({
                                ...configuration,
                                printSpeed: event.target.value,
                              })
                            }
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl id='resolution'>
                          <FormLabel>Độ phân giải</FormLabel>
                          <Textarea
                            placeholder='Độ phân giải'
                            onChange={(event) =>
                              setConfiguration({
                                ...configuration,
                                resolution: event.target.value,
                              })
                            }
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl id='ram'>
                          <FormLabel>Bộ nhớ</FormLabel>
                          <Textarea
                            placeholder='Bộ nhớ'
                            onChange={(event) =>
                              setConfiguration({
                                ...configuration,
                                ram: event.target.value,
                              })
                            }
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl id='paperSize'>
                          <FormLabel>Khay giấy</FormLabel>
                          <Textarea
                            placeholder='Khay giấy'
                            onChange={(event) =>
                              setConfiguration({
                                ...configuration,
                                paperSize: event.target.value,
                              })
                            }
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl id='printInk'>
                          <FormLabel>Mực in</FormLabel>
                          <Textarea
                            placeholder='Mực in'
                            onChange={(event) =>
                              setConfiguration({
                                ...configuration,
                                printInk: event.target.value,
                              })
                            }
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl id='duplexPrint'>
                          <FormLabel>In đảo mặt</FormLabel>
                          <Textarea
                            placeholder='In đảo mặt'
                            onChange={(event) =>
                              setConfiguration({
                                ...configuration,
                                duplexPrint: event.target.value,
                              })
                            }
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl id='communication'>
                          <FormLabel>Cổng giao tiếp</FormLabel>
                          <Textarea
                            placeholder='Cổng giao tiếp'
                            onChange={(event) =>
                              setConfiguration({
                                ...configuration,
                                communication: event.target.value,
                              })
                            }
                          />
                        </FormControl>
                      </GridItem>
                    </Grid>
                  ) : mode === 'fax' ? (
                    <Grid templateColumns='repeat(2, 1fr)' gap={4}>
                      <GridItem colSpan={1}>
                        <FormControl id='model'>
                          <FormLabel>Model</FormLabel>
                          <Textarea
                            placeholder='Model'
                            onChange={(event) =>
                              setConfiguration({
                                ...configuration,
                                model: event.target.value,
                              })
                            }
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl id='faxSpeed'>
                          <FormLabel>Tốc độ fax</FormLabel>
                          <Textarea
                            placeholder='Tốc độ fax'
                            onChange={(event) =>
                              setConfiguration({
                                ...configuration,
                                faxSpeed: event.target.value,
                              })
                            }
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl id='resolution'>
                          <FormLabel>Độ phân giải</FormLabel>
                          <Textarea
                            placeholder='Độ phân giải'
                            onChange={(event) =>
                              setConfiguration({
                                ...configuration,
                                resolution: event.target.value,
                              })
                            }
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl id='ram'>
                          <FormLabel>Bộ nhớ</FormLabel>
                          <Textarea
                            placeholder='ram'
                            onChange={(event) =>
                              setConfiguration({
                                ...configuration,
                                ram: event.target.value,
                              })
                            }
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl id='paperSize'>
                          <FormLabel>Khay giấy</FormLabel>
                          <Textarea
                            placeholder='Khay giấy'
                            onChange={(event) =>
                              setConfiguration({
                                ...configuration,
                                paperSize: event.target.value,
                              })
                            }
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl id='printInk'>
                          <FormLabel>Mực in</FormLabel>
                          <Textarea
                            placeholder='Mực in'
                            onChange={(event) =>
                              setConfiguration({
                                ...configuration,
                                printInk: event.target.value,
                              })
                            }
                          />
                        </FormControl>
                      </GridItem>
                    </Grid>
                  ) : mode === 'node' ? (
                    <>
                      <Grid templateColumns='repeat(4, 1fr)' gap={4}>
                        <GridItem colSpan={1}>
                          <FormControl id='buildingNode' isRequired>
                            <FormLabel fontSize='sm'>Tòa nhà</FormLabel>
                            <Select
                              placeholder='Chọn tòa nhà'
                              onChange={(event) => {
                                setCurrentBuildingId(
                                  parseInt(event.target.value)
                                )
                              }}>
                              {buildings.map(
                                (item: BUILDING, index: number) => (
                                  <option key={index} value={item.id}>
                                    Tòa nhà {item.name}
                                  </option>
                                )
                              )}
                            </Select>
                          </FormControl>
                        </GridItem>
                        <GridItem colSpan={1}>
                          <FormControl id='floorNode' isRequired>
                            <FormLabel fontSize='sm'>Tầng</FormLabel>
                            <Select
                              placeholder='Chọn tầng'
                              onChange={(event) => {
                                setCurrentFloorId(parseInt(event.target.value))
                              }}>
                              {!currentBuilding?.floors
                                ? null
                                : currentBuilding.floors.map(
                                  (item: FLOOR, index: number) => (
                                    <option key={index} value={item.id}>
                                      Tầng {item.name}
                                    </option>
                                  )
                                )}
                            </Select>
                          </FormControl>
                        </GridItem>
                        <GridItem colSpan={1}>
                          <FormControl id='roomNode' isRequired>
                            <FormLabel fontSize='sm'>Phòng</FormLabel>
                            <Select
                              placeholder='Chọn phòng'
                              onChange={(event) => {
                                setCurrentRoomId(parseInt(event.target.value))
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
                          </FormControl>
                        </GridItem>
                      </Grid>
                      <Grid templateColumns='repeat(2, 1fr)' gap={4} mt='5'>
                        <GridItem colSpan={1}>
                          <FormControl id='node' isRequired>
                            <FormLabel>Nút mạng</FormLabel>
                            <Textarea
                              placeholder='Nút mạng'
                              onChange={(event) =>
                                setConfiguration({
                                  ...configuration,
                                  nodeName: event.target.value,
                                })
                              }
                            />
                          </FormControl>
                        </GridItem>
                      </Grid>
                    </>
                  ) : null}
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                      <Text textStyle='bold-sm'>
                        Cán bộ chịu trách nhiệm và sử dụng
                      </Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Grid templateColumns='repeat(4, 1fr)' gap={4} mt='5'>
                    <GridItem colSpan={1}>
                      <FormControl id='builiding'>
                        <FormLabel fontSize='sm'>Tòa nhà</FormLabel>
                        <Select
                          placeholder='Chọn tòa nhà'
                          onChange={(event) => {
                            setCurrentBuildingId(parseInt(event.target.value))
                          }}>
                          {buildings.map((item: BUILDING, index: number) => (
                            <option key={index} value={item.id}>
                              Tòa nhà {item.name}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <FormControl>
                        <FormLabel fontSize='sm'>Tầng</FormLabel>
                        <Select
                          id='floor'
                          placeholder='Chọn tầng'
                          onChange={(event) => {
                            setCurrentFloorId(parseInt(event.target.value))
                          }}>
                          {!currentBuilding?.floors
                            ? null
                            : currentBuilding.floors.map(
                              (item: FLOOR, index: number) => (
                                <option key={index} value={item.id}>
                                  Tầng {item.name}
                                </option>
                              )
                            )}
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <FormControl>
                        <FormLabel fontSize='sm'>Phòng</FormLabel>
                        <Select
                          id='room'
                          placeholder='Chọn phòng'
                          onChange={(event) => {
                            setCurrentRoomId(parseInt(event.target.value))
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
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <FormControl id='price'>
                        <FormLabel fontSize='sm'>Cán bộ</FormLabel>
                        <Select
                          placeholder='Select option'
                          onChange={(event) => {
                            setCurrentEmployeeId(parseInt(event.target.value))
                          }}>
                          {!currentRoom?.employees
                            ? null
                            : currentRoom.employees?.map(
                              (item: EMPLOYEE, index: number) => (
                                <option key={index} value={item.id}>
                                  {item.name}
                                </option>
                              )
                            )}
                        </Select>
                      </FormControl>
                    </GridItem>
                  </Grid>
                  {!currentEmployee ? null : (
                    <Box mt='5' mr='5'>
                      <Text>Thông tin cán bộ</Text>
                      <Grid
                        templateColumns='repeat(2, 1fr)'
                        gap={9}
                        pl='5'
                        pt='5'>
                        <GridItem colSpan={1}>
                          <Grid templateColumns='repeat(3, 1fr)' gap={4}>
                            <GridItem colSpan={1}>
                              <Text textStyle='bold-sm'>Tên:</Text>
                            </GridItem>
                            <GridItem colSpan={2}>
                              <Text>{currentEmployee.name}</Text>
                            </GridItem>
                            <GridItem colSpan={1}>
                              <Text textStyle='bold-sm'>Số điện thoại:</Text>
                            </GridItem>
                            <GridItem colSpan={2}>
                              <Text>{currentEmployee.phone}</Text>
                            </GridItem>
                            <GridItem colSpan={1}>
                              <Text textStyle='bold-sm'>Email:</Text>
                            </GridItem>
                            <GridItem colSpan={2}>
                              <Text>{currentEmployee.email}</Text>
                            </GridItem>
                          </Grid>
                        </GridItem>
                        <GridItem colSpan={1}>
                          <Grid templateColumns='repeat(3, 1fr)' gap={4}>
                            <GridItem colSpan={1}>
                              <Text textStyle='bold-sm'>Tòa nhà:</Text>
                            </GridItem>
                            <GridItem colSpan={2}>
                              <Text>{currentBuilding.name}</Text>
                            </GridItem>
                            <GridItem colSpan={1}>
                              <Text textStyle='bold-sm'>Phòng:</Text>
                            </GridItem>
                            <GridItem colSpan={2}>
                              <Text>{currentRoom.name}</Text>
                            </GridItem>
                            <GridItem colSpan={1}>
                              <Text textStyle='bold-sm'>Đơn vị:</Text>
                            </GridItem>
                            <GridItem colSpan={2}>
                              <Text>{currentEmployee.unit}</Text>
                            </GridItem>
                          </Grid>
                        </GridItem>
                      </Grid>
                    </Box>
                  )}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Button
              size='sm'
              float='right'
              colorScheme='teal'
              mt='5'
              type='submit'
              isLoading={props.isSubmitting}>
              Tạo mới
            </Button>
          </Form>
        )}
      </Formik>
    </AdminDashboard>
  )
}
