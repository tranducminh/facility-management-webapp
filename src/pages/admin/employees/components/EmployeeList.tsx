/* eslint-disable prettier/prettier */
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
  HStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  InputGroup,
  InputLeftElement,
  Input,
  Flex,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Select,
  useDisclosure,
} from '@chakra-ui/react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Search2Icon,
  ArrowRightIcon,
} from '@chakra-ui/icons'
import ReactPaginate from 'react-paginate'
import { useEffect, useState } from 'react'
import { Link } from '../../../../../i18n'
import axios from '../../../../utils/axios'
import { BUILDING, EMPLOYEE, FLOOR, ROOM } from '../../../../types'

export default function EmployeeComponent() {
  const {
    isOpen: isOpenUser,
    onOpen: onOpenUser,
    onClose: onCloseUser,
  } = useDisclosure()

  const [employees, setEmployees] = useState<EMPLOYEE[]>([{}])
  const [buildings, setBuildings] = useState<BUILDING[]>([{}])
  const [newEmployeeBuilding, setNewEmployeeBuilding] = useState<string>('')
  const [newEmployeeFloor, setNewEmployeeFloor] = useState<string>('')
  const [newEmployeeRoom, setNewEmployeeRoom] = useState<string>('')
  const [identity, setIdentity] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [unit, setUnit] = useState<string>('')

  const [currentBuilding, setCurrentBuilding] = useState<BUILDING>({})
  const [currentFloor, setCurrentFloor] = useState<FLOOR>({})
  const refreshEmployee = () => {
    axios.get('/employees').then((result) => {
      setEmployees(result.data.employees)
    })
  }
  useEffect(() => {
    refreshEmployee()
    axios.get('/buildings').then((result) => {
      setBuildings(result.data.buildings)
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

  const createNewEmployee = () => {
    axios
      .post('/employees', {
        identity,
        password: identity,
        passwordConfirmation: identity,
        name,
        unit,
        // eslint-disable-next-line radix
        roomId: parseInt(newEmployeeRoom),
      })
      .then(() => {
        refreshEmployee()
        onCloseUser()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      <Flex justifyContent='space-between' alignItems='center' mb={5}>
        <InputGroup maxW='30%'>
          <InputLeftElement pointerEvents='none'>
            <Search2Icon color='gray.300' />
          </InputLeftElement>
          <Input type='text' placeholder='Search user id' />
        </InputGroup>
        <Button
          rightIcon={<ArrowRightIcon fontSize='xs' />}
          colorScheme='teal'
          variant='ghost'
          size='sm'
          onClick={onOpenUser}>
          <Text textStyle='bold-md'>Tạo cán bộ mới</Text>
        </Button>
      </Flex>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Mã nhân viên</Th>
            <Th>Tên</Th>
            <Th>Đơn vị</Th>
            <Th>Phòng</Th>
            <Th>Đã có phòng</Th>
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
                  <Text textStyle='normal'>No room</Text>
                )}
              </Td>
              <Td>
                {employee.hasRoom === 'true' ? (
                  <Tag
                    size='sm'
                    key='status'
                    variant='solid'
                    colorScheme='teal'>
                    True
                  </Tag>
                ) : (
                  <Tag
                    size='sm'
                    key='status'
                    variant='solid'
                    colorScheme='yellow'>
                    False
                  </Tag>
                )}
              </Td>
              <Td isNumeric>
                <Link href={`/admin/employees/${employee.identity}`}>
                  <Button colorScheme='teal' variant='ghost' size='sm'>
                    Show
                  </Button>
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
            <Th>Đã có phòng</Th>
            <Th isNumeric>Hành động</Th>
          </Tr>
        </Tfoot>
      </Table>
      <Box w='50%' mt={5} float='right'>
        <ReactPaginate
          previousLabel={<ChevronLeftIcon fontSize='1.7rem' />}
          nextLabel={<ChevronRightIcon fontSize='1.7rem' />}
          breakLabel='...'
          breakClassName='break-me'
          pageCount={20}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={({ selected }) => {
            console.log(selected)
          }}
          containerClassName='pagination'
          // subContainerClassName='pages pagination'
          activeClassName='active'
        />
      </Box>

      <Modal isOpen={isOpenUser} onClose={onCloseUser}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New employee</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Identity</FormLabel>
              <Input
                colorScheme='teal'
                placeholder='Identity'
                onChange={(event) => setIdentity(event.target.value)}
              />
            </FormControl>
            <FormControl mt='3' isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                colorScheme='teal'
                placeholder='Name'
                onChange={(event) => setName(event.target.value)}
              />
            </FormControl>
            <FormControl mt='3' isRequired>
              <FormLabel>Unit</FormLabel>
              <Input
                colorScheme='teal'
                placeholder='Unit'
                onChange={(event) => setUnit(event.target.value)}
              />
            </FormControl>
            <Grid templateColumns='repeat(2, 1fr)' gap={6}>
              <FormControl mt='3' isRequired>
                <FormLabel>Building</FormLabel>
                <Select
                  placeholder='Select option'
                  onChange={(event) => {
                    setNewEmployeeBuilding(event.target.value)
                  }}>
                  {buildings.map((item: BUILDING, index: number) => (
                    <option key={index} value={item.name}>
                      Building {item.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl mt='3' isRequired>
                <FormLabel>Floor</FormLabel>
                <Select
                  placeholder='Select option'
                  onChange={(event) => {
                    setNewEmployeeFloor(event.target.value)
                  }}>
                  {!currentBuilding?.floors
                    ? null
                    : currentBuilding.floors.map(
                      (item: FLOOR, index: number) => (
                        <option key={index} value={item.name}>
                          Floor {item.name}
                        </option>
                      )
                    )}
                </Select>
              </FormControl>
              <FormControl mt='3' isRequired>
                <FormLabel>Room</FormLabel>
                <Select
                  placeholder='Select option'
                  onChange={(event) => {
                    setNewEmployeeRoom(event.target.value)
                  }}>
                  {!currentFloor?.rooms
                    ? null
                    : currentFloor.rooms.map((item: ROOM, index: number) => (
                      <option key={index} value={item.id}>
                        Room {item.name}
                      </option>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button size='sm' onClick={onCloseUser} mr={3}>
              Cancel
            </Button>
            <Button size='sm' colorScheme='teal' onClick={createNewEmployee}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
