/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-nested-ternary */
/* eslint-disable radix */
import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  Tag,
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
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import AdminDashboard from '../../../../layouts/AdminDashboard'
import axios from '../../../../utils/axios'
import {
  BUILDING,
  EMPLOYEE,
  FLOOR,
  ROOM,
  CONFIGURATION,
  FACILITY,
} from '../../../../types'

export default function NewFacility() {
  const router = useRouter()

  const [modeName, setModeName] = useState('Máy tính')
  const [mode, setMode] = useState('computer')
  const [facility, setFacility] = useState<FACILITY>()

  const [buildings, setBuildings] = useState<BUILDING[]>([{}])
  const [currentBuildingId, setCurrentBuildingId] = useState<number>()
  const [currentFloorId, setCurrentFloorId] = useState<number>()
  const [currentRoomId, setCurrentRoomId] = useState<number>()
  const [currentEmployeeId, setCurrentEmployeeId] = useState<number>()

  const [currentBuilding, setCurrentBuilding] = useState<BUILDING>({})
  const [currentFloor, setCurrentFloor] = useState<FLOOR>({})
  const [currentRoom, setCurrentRoom] = useState<ROOM>({})
  const [currentEmployee, setCurrentEmployee] = useState<EMPLOYEE | null>(null)

  const [name, setName] = useState<string>('')
  const [origin, setOrigin] = useState<string>('')
  const [price, setPrice] = useState<number>()
  const [configuration, setConfiguration] = useState<CONFIGURATION>()

  useEffect(() => {
    axios.get('/buildings').then((result) => {
      setBuildings(result.data.buildings)
    })

    const facilityId = router.query['facility-id']
    axios
      .get(`/facilities/${facilityId}`)
      .then((response) => {
        setFacility(response.data.facility)
        setMode(response.data.facility.facilityType.name)
        setName(response.data.facility.name)
        setOrigin(response.data.facility.origin)
        setPrice(response.data.facility.price)
        setConfiguration(response.data.facility.configuration)
        setCurrentEmployee(response.data.facility.employee)
        setCurrentRoom(response.data.facility.employee.room)
        setCurrentFloor(response.data.facility.employee.room.floor)
        setCurrentBuilding(response.data.facility.employee.room.floor.building)
      })
      .catch((error) => {
        console.log(error)
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

  useEffect(() => {
    switch (mode) {
      case 'computer':
        setModeName('Máy tính')
        break
      case 'printer':
        setModeName('Máy in')
        break
      case 'fax':
        setModeName('Máy fax')
        break
      case 'node':
        setModeName('Nút mạng')
        break

      default:
        break
    }
  }, [mode])

  const createNewFacility = () => {
    axios
      .post('/facilities', {
        name,
        origin,
        price,
        configuration,
        facilityType: mode,
        employeeId: currentEmployeeId,
      })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
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
            <Link href={`/admin/facilities/${facility?.id}`}>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>
                  #{facility?.id} - {name}
                </Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link href={`/admin/facilities/${facility?.id}/edit`}>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>Chỉnh sửa</Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
        </Breadcrumb>
        <Tag size='md' variant='solid' colorScheme='teal'>
          <Text textStyle='bold-sm'>{modeName}</Text>
        </Tag>
      </Flex>
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
                <FormControl id='name' isRequired>
                  <FormLabel>Tên thiết bị</FormLabel>
                  <Input
                    placeholder='Tên thiết bị'
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}>
                <FormControl id='origin' isRequired>
                  <FormLabel>Nguồn gốc</FormLabel>
                  <Input
                    value={origin}
                    placeholder='Nguồn gốc'
                    onChange={(event) => setOrigin(event.target.value)}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}>
                <FormControl id='price' isRequired>
                  <FormLabel>Giá trị</FormLabel>
                  <Input
                    value={price}
                    placeholder='Giá trị'
                    onChange={(event) => setPrice(parseInt(event.target.value))}
                  />
                </FormControl>
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
                  <FormControl id='cpu' isRequired>
                    <FormLabel>CPU</FormLabel>
                    <Textarea
                      value={configuration?.cpu}
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
                  <FormControl id='mainBoard' isRequired>
                    <FormLabel>Main board</FormLabel>
                    <Textarea
                      value={configuration?.mainboard}
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
                  <FormControl id='hardDrive' isRequired>
                    <FormLabel>Ổ cứng</FormLabel>
                    <Textarea
                      value={configuration?.hardDrive}
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
                  <FormControl id='ram' isRequired>
                    <FormLabel>Bộ nhớ</FormLabel>
                    <Textarea
                      value={configuration?.ram}
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
                  <FormControl id='vga' isRequired>
                    <FormLabel>Card màn hình</FormLabel>
                    <Textarea
                      value={configuration?.vga}
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
                  <FormControl id='psu' isRequired>
                    <FormLabel>Nguồn</FormLabel>
                    <Textarea
                      value={configuration?.psu}
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
                  <FormControl id='monitor' isRequired>
                    <FormLabel>Màn hình</FormLabel>
                    <Textarea
                      value={configuration?.monitor}
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
                  <FormControl id='keyboard' isRequired>
                    <FormLabel>Bàn phím</FormLabel>
                    <Textarea
                      value={configuration?.keyboard}
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
                  <FormControl id='mouse' isRequired>
                    <FormLabel>Chuột</FormLabel>
                    <Textarea
                      value={configuration?.mouse}
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
                  <FormControl id='headPhone' isRequired>
                    <FormLabel>Tai nghe</FormLabel>
                    <Textarea
                      value={configuration?.headPhone}
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
                  <FormControl id='fanCase' isRequired>
                    <FormLabel>Tản nhiệt</FormLabel>
                    <Textarea
                      value={configuration?.fanCase}
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
                  <FormControl id='webcam' isRequired>
                    <FormLabel>Webcam</FormLabel>
                    <Textarea
                      value={configuration?.webcam}
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
                  <FormControl id='cardReader' isRequired>
                    <FormLabel>Đầu đọc thẻ</FormLabel>
                    <Textarea
                      value={configuration?.cardReader}
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
                  <FormControl id='model' isRequired>
                    <FormLabel>Model</FormLabel>
                    <Textarea
                      value={configuration?.model}
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
                  <FormControl id='printSpeed' isRequired>
                    <FormLabel>Tốc độ in</FormLabel>
                    <Textarea
                      value={configuration?.printSpeed}
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
                  <FormControl id='resolution' isRequired>
                    <FormLabel>Độ phân giải</FormLabel>
                    <Textarea
                      value={configuration?.resolution}
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
                  <FormControl id='ram' isRequired>
                    <FormLabel>Bộ nhớ</FormLabel>
                    <Textarea
                      value={configuration?.ram}
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
                  <FormControl id='paperSize' isRequired>
                    <FormLabel>Khay giấy</FormLabel>
                    <Textarea
                      value={configuration?.paperSize}
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
                  <FormControl id='printInk' isRequired>
                    <FormLabel>Mực in</FormLabel>
                    <Textarea
                      value={configuration?.printInk}
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
                  <FormControl id='duplexPrint' isRequired>
                    <FormLabel>In đảo mặt</FormLabel>
                    <Textarea
                      value={configuration?.duplexPrint}
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
                  <FormControl id='communication' isRequired>
                    <FormLabel>Cổng giao tiếp</FormLabel>
                    <Textarea
                      value={configuration?.communication}
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
                  <FormControl id='model' isRequired>
                    <FormLabel>Model</FormLabel>
                    <Textarea
                      value={configuration?.model}
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
                  <FormControl id='faxSpeed' isRequired>
                    <FormLabel>Tốc độ fax</FormLabel>
                    <Textarea
                      value={configuration?.faxSpeed}
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
                  <FormControl id='resolution' isRequired>
                    <FormLabel>Độ phân giải</FormLabel>
                    <Textarea
                      value={configuration?.resolution}
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
                  <FormControl id='ram' isRequired>
                    <FormLabel>Bộ nhớ</FormLabel>
                    <Textarea
                      value={configuration?.ram}
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
                  <FormControl id='paperSize' isRequired>
                    <FormLabel>Khay giấy</FormLabel>
                    <Textarea
                      value={configuration?.paperSize}
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
                  <FormControl id='printInk' isRequired>
                    <FormLabel>Mực in</FormLabel>
                    <Textarea
                      value={configuration?.printInk}
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
                    <FormControl id='name' isRequired>
                      <FormLabel fontSize='sm'>Tòa nhà</FormLabel>
                      <Select
                        value={currentBuilding.name}
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
                    <FormControl id='origin' isRequired>
                      <FormLabel fontSize='sm'>Tầng</FormLabel>
                      <Select
                        value={currentFloor.name}
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
                    <FormControl id='price' isRequired>
                      <FormLabel fontSize='sm'>Phòng</FormLabel>
                      <Select
                        value={currentRoom.name}
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
                <FormControl id='name' isRequired>
                  <FormLabel fontSize='sm'>Tòa nhà</FormLabel>
                  <Select
                    value={currentBuilding?.name}
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
                <FormControl id='origin' isRequired>
                  <FormLabel fontSize='sm'>Tầng</FormLabel>
                  <Select
                    value={currentFloor?.name}
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
                <FormControl id='price' isRequired>
                  <FormLabel fontSize='sm'>Phòng</FormLabel>
                  <Select
                    value={currentRoom?.name}
                    placeholder='Chọn phòng'
                    onChange={(event) => {
                      setCurrentRoomId(parseInt(event.target.value))
                    }}>
                    {!currentFloor?.rooms
                      ? null
                      : currentFloor.rooms.map((item: ROOM, index: number) => (
                        <option key={index} value={item.id}>
                          Phòng {item.name}
                        </option>
                      ))}
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}>
                <FormControl id='price' isRequired>
                  <FormLabel fontSize='sm'>Cán bộ</FormLabel>
                  <Select
                    value={currentEmployee?.name}
                    placeholder='Chọn cán bộ'
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
                <Grid templateColumns='repeat(2, 1fr)' gap={9} pl='5' pt='5'>
                  <GridItem colSpan={1}>
                    <Grid templateColumns='repeat(3, 1fr)' gap={4}>
                      <GridItem colSpan={1}>
                        <Text textStyle='bold-sm'>Tên:</Text>
                      </GridItem>
                      <GridItem colSpan={2}>
                        <Text>{currentEmployee?.name}</Text>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <Text textStyle='bold-sm'>Số điện thoại:</Text>
                      </GridItem>
                      <GridItem colSpan={2}>
                        <Text>{currentEmployee?.phone}</Text>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <Text textStyle='bold-sm'>Email:</Text>
                      </GridItem>
                      <GridItem colSpan={2}>
                        <Text>{currentEmployee?.email}</Text>
                      </GridItem>
                    </Grid>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Grid templateColumns='repeat(3, 1fr)' gap={4}>
                      <GridItem colSpan={1}>
                        <Text textStyle='bold-sm'>Tòa nhà:</Text>
                      </GridItem>
                      <GridItem colSpan={2}>
                        <Text>{currentBuilding?.name}</Text>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <Text textStyle='bold-sm'>Phòng:</Text>
                      </GridItem>
                      <GridItem colSpan={2}>
                        <Text>{currentRoom?.name}</Text>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <Text textStyle='bold-sm'>Đơn vị:</Text>
                      </GridItem>
                      <GridItem colSpan={2}>
                        <Text>{currentEmployee?.unit}</Text>
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
        onClick={createNewFacility}>
        Cập nhật thông tin
      </Button>
      <Link href={`/admin/facilities/${facility?.id}`}>
        <Button size='sm' float='right' mt='5' mr='5'>
          Hủy
        </Button>
      </Link>
    </AdminDashboard>
  )
}
