/* eslint-disable array-callback-return */
/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react'
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
  FormControl,
  FormLabel,
  Icon,
  Checkbox,
  useDisclosure,
} from '@chakra-ui/react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Search2Icon,
  ArrowRightIcon,
} from '@chakra-ui/icons'
import ReactPaginate from 'react-paginate'
import { RiComputerLine } from 'react-icons/ri'
import { BiPrinter } from 'react-icons/bi'
import { FaFax } from 'react-icons/fa'
import { GiWifiRouter } from 'react-icons/gi'
import { Link } from '../../../../../i18n'
import axios from '../../../../utils/axios'
import { REPAIRMAN } from '../../../../types'

export default function RepairmanComponent() {
  const {
    isOpen: isOpenUser,
    onOpen: onOpenUser,
    onClose: onCloseUser,
  } = useDisclosure()
  const [checkedItems, setCheckedItems] = useState([false, false, false, false])

  const allChecked = checkedItems.every(Boolean)
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked

  const [repairman, setRepairman] = useState<REPAIRMAN[]>([])
  const [identity, setIdentity] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [unit, setUnit] = useState<string>('')

  const refreshData = () => {
    axios
      .get('/repairman')
      .then((response) => {
        setRepairman(response.data.repairman)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const createNewRepairman = () => {
    const facilityTypes = []
    if (checkedItems[0]) facilityTypes.push('computer')
    if (checkedItems[1]) facilityTypes.push('printer')
    if (checkedItems[2]) facilityTypes.push('fax')
    if (checkedItems[3]) facilityTypes.push('node')
    axios.post('/repairman', {
      identity, name, unit, facilityTypes
    }).then(() => {
      refreshData()
      onCloseUser()
    }).catch((error) => {
      console.log(error)
    })
  }
  useEffect(() => {
    refreshData()
  }, [])
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
          <Text textStyle='bold-md'>Tạo kỹ thuật viên mới</Text>
        </Button>
      </Flex>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Mã nhân viên</Th>
            <Th>Tên</Th>
            <Th>Đơn vị</Th>
            <Th>Chuyên môn</Th>
            <Th>Trạng thái</Th>
            <Th isNumeric>Hành động</Th>
          </Tr>
        </Thead>
        <Tbody>
          {!repairman
            ? null
            : repairman.map((item: REPAIRMAN, index: number) => (
              <Tr key={index}>
                <Td>{item.identity}</Td>
                <Td>{item.name}</Td>
                <Td>{item.unit}</Td>
                <Td>
                  {item.specializes?.map((specialize, index_) => {
                    switch (specialize.facilityType?.name) {
                      case 'computer':
                        return (<Icon key={index_} as={RiComputerLine} fontSize='1.2em' />)
                      case 'fax':
                        return <Icon key={index_} as={FaFax} fontSize='1em' />
                      case 'printer':
                        return <Icon key={index_} as={BiPrinter} fontSize='1.2em' />
                      case 'node':
                        return <Icon key={index_} as={GiWifiRouter} fontSize='1.2em' />
                      default:
                        break
                    }
                  })}
                </Td>
                <Td>
                  <HStack spacing={4}>
                    <Tag
                      size='sm'
                      key='status'
                      variant='solid'
                      colorScheme='teal'>
                      Hoạt động
                      </Tag>
                  </HStack>
                </Td>
                <Td isNumeric>
                  <Link href={`/admin/repairman/${item.identity}`}>
                    <Button colorScheme='teal' variant='ghost' size='sm'>
                      Chi tiết
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
            <Th>Chuyên môn</Th>
            <Th>Trạng thái</Th>
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
          <ModalHeader>New repairman</ModalHeader>
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
            <FormControl mt='3' isRequired>
              <FormLabel>Specialize</FormLabel>
              <Checkbox
                isChecked={allChecked}
                isIndeterminate={isIndeterminate}
                onChange={(e) => {
                  setCheckedItems([
                    e.target.checked,
                    e.target.checked,
                    e.target.checked,
                    e.target.checked,
                  ])
                }}
                colorScheme='teal'>
                All
              </Checkbox>
              <Flex pl={6} mt={1} spacing={1} justifyContent='space-around'>
                <Checkbox
                  isChecked={checkedItems[0]}
                  onChange={(e) => {
                    setCheckedItems([
                      e.target.checked,
                      checkedItems[1],
                      checkedItems[2],
                      checkedItems[3],
                    ])
                  }}
                  colorScheme='teal'>
                  Computer
                </Checkbox>
                <Checkbox
                  isChecked={checkedItems[1]}
                  onChange={(e) => {
                    setCheckedItems([
                      checkedItems[0],
                      e.target.checked,
                      checkedItems[2],
                      checkedItems[3],
                    ])
                  }}
                  colorScheme='teal'>
                  Printer
                </Checkbox>
                <Checkbox
                  isChecked={checkedItems[2]}
                  onChange={(e) => {
                    setCheckedItems([
                      checkedItems[0],
                      checkedItems[1],
                      e.target.checked,
                      checkedItems[3],
                    ])
                  }}
                  colorScheme='teal'>
                  Fax
                </Checkbox>
                <Checkbox
                  isChecked={checkedItems[3]}
                  onChange={(e) => {
                    setCheckedItems([
                      checkedItems[0],
                      checkedItems[1],
                      checkedItems[2],
                      e.target.checked,
                    ])
                  }}
                  colorScheme='teal'>
                  Node
                </Checkbox>
              </Flex>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button size='sm' onClick={onCloseUser} mr={3}>
              Cancel
            </Button>
            <Button size='sm' colorScheme='teal' onClick={createNewRepairman}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
