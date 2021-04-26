/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/ban-types */
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
  Divider,
  Icon,
  FormControl,
  FormLabel,
  Select,
  useDisclosure,
} from '@chakra-ui/react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Search2Icon,
} from '@chakra-ui/icons'
import ReactPaginate from 'react-paginate'
import { useState } from 'react'
import { RiComputerLine } from 'react-icons/ri'
import { BiPrinter } from 'react-icons/bi'
import { FaFax } from 'react-icons/fa'
import { GiWifiRouter } from 'react-icons/gi'
import axios from '../../../../utils/axios'
import { REPAIRMAN, REQUEST } from '../../../../types'

export default function UnCompletedRequest({
  requests,
  refresh,
}: {
  requests: REQUEST[]
  refresh: Function
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [currentRequest, setCurrentRequest] = useState<REQUEST>({})
  const [suitableRepairman, setSuitableRepairman] = useState<REPAIRMAN[]>([])
  const [currentRepairman, setCurrentRepairman] = useState<REPAIRMAN>({})

  const onOpenRequest = (id?: number) => {
    onOpen()
    const request = requests.filter((item: REQUEST) => item.id === id)[0] || {}
    setCurrentRequest(request)
    axios
      .get(`/repairman?specialize=${request.facility?.facilityType?.name}`)
      .then((response) => {
        setSuitableRepairman(response.data.repairman)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const onChangeRepairman = (id: number) => {
    setCurrentRepairman(
      suitableRepairman.filter((item: REPAIRMAN) => item.id === id)[0] || {}
    )
  }

  const onAssignRequest = (requestId?: number) => {
    axios
      .put(`/requests/${requestId}/assign`, {
        repairmanId: currentRepairman.id,
      })
      .then(() => {
        refresh()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      <Flex justifyContent='flex-end' mb={5}>
        <InputGroup maxW='30%'>
          <InputLeftElement pointerEvents='none'>
            <Search2Icon color='gray.300' />
          </InputLeftElement>
          <Input type='text' placeholder='Search request id' />
        </InputGroup>
      </Flex>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Thiết bị</Th>
            <Th>Cán bộ yêu cầu</Th>
            <Th>Vấn đề</Th>
            <Th>Nhân viên kỹ thuật</Th>
            <Th isNumeric>Hành động</Th>
          </Tr>
        </Thead>
        <Tbody>
          {requests.map((request, index) => (
            <Tr>
              <Td>{request.id}</Td>
              <Td>{request.facility?.name}</Td>
              <Td>{request.employee?.name}</Td>
              <Td>{request.problem}</Td>
              <Td>{request.repairman?.name}</Td>
              <Td isNumeric>
                <Button
                  size='sm'
                  colorScheme='teal'
                  variant='ghost'
                  onClick={() => onOpenRequest(request.id)}>
                  Chi tiết
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>ID</Th>
            <Th>Thiết bị</Th>
            <Th>Cán bộ yêu cầu</Th>
            <Th>Vấn đề</Th>
            <Th>Nhân viên kỹ thuật</Th>
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

      <Modal isOpen={isOpen} size='lg' onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>#{currentRequest.id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns='repeat(12, 1fr)' gap={15}>
              <GridItem colStart={2} colEnd={5}>
                <Text textStyle='bold-sm'>Thiết bị</Text>
              </GridItem>
              <GridItem colStart={5} colEnd={12}>
                <Text>{currentRequest.facility?.name}</Text>
              </GridItem>
              <GridItem colStart={2} colEnd={5}>
                <Text textStyle='bold-sm'>Mã cán bộ</Text>
              </GridItem>
              <GridItem colStart={5} colEnd={12}>
                <Text>#{currentRequest.employee?.identity}</Text>
              </GridItem>
              <GridItem colStart={2} colEnd={5}>
                <Text textStyle='bold-sm'>Cán bộ yêu cầu</Text>
              </GridItem>
              <GridItem colStart={5} colEnd={12}>
                <Text>{currentRequest.employee?.name}</Text>
              </GridItem>
              <GridItem colStart={2} colEnd={5}>
                <Text textStyle='bold-sm'>Phòng</Text>
              </GridItem>
              <GridItem colStart={5} colEnd={12}>
                <Text>
                  {currentRequest.employee?.room?.floor?.building?.name} /
                  {currentRequest.employee?.room?.name}
                </Text>
              </GridItem>
              <GridItem colStart={2} colEnd={5}>
                <Text textStyle='bold-sm'>Vấn đề</Text>
              </GridItem>
              <GridItem colStart={5} colEnd={12}>
                <Text>{currentRequest.problem}</Text>
              </GridItem>
              <GridItem colStart={2} colEnd={5}>
                <Text textStyle='bold-sm'>Trạng thái</Text>
              </GridItem>
              <GridItem colStart={5} colEnd={12}>
                <HStack spacing={4}>
                  <Tag size='sm' key='status' variant='solid' colorScheme='red'>
                    Không hoàn thành
                  </Tag>
                </HStack>
              </GridItem>
              <GridItem colStart={2} colEnd={5}>
                <Text textStyle='bold-sm'>Lý do</Text>
              </GridItem>
              <GridItem colStart={5} colEnd={13}>
                <Text>{currentRequest.uncompletedReason}</Text>
              </GridItem>
              <GridItem colStart={1} colEnd={13}>
                <Divider />
              </GridItem>
              <GridItem colStart={2} colEnd={5}>
                <Text textStyle='bold-sm'>Kỹ thuật viên hiện tại</Text>
              </GridItem>
              <GridItem colStart={5} colEnd={12}>
                <Text>{currentRequest.repairman?.name}</Text>
              </GridItem>
              <GridItem colStart={2} colEnd={5}>
                <Text textStyle='bold-sm'>Mã nhân viên</Text>
              </GridItem>
              <GridItem colStart={5} colEnd={12}>
                <Text>#{currentRequest.repairman?.identity}</Text>
              </GridItem>
              <GridItem colStart={2} colEnd={5}>
                <Text textStyle='bold-sm'>Đơn vị</Text>
              </GridItem>
              <GridItem colStart={5} colEnd={12}>
                <Text>{currentRequest.repairman?.unit}</Text>
              </GridItem>
              <GridItem colStart={2} colEnd={5}>
                <Text textStyle='bold-sm'>Chuyên môn</Text>
              </GridItem>
              <GridItem colStart={5} colEnd={12}>
                {currentRequest.repairman?.specializes?.map(
                  (specialize, index_) => {
                    switch (specialize.facilityType?.name) {
                      case 'computer':
                        return (
                          <Icon
                            key={index_}
                            as={RiComputerLine}
                            fontSize='1.2em'
                          />
                        )
                      case 'fax':
                        return <Icon key={index_} as={FaFax} fontSize='1em' />
                      case 'printer':
                        return (
                          <Icon key={index_} as={BiPrinter} fontSize='1.2em' />
                        )
                      case 'node':
                        return (
                          <Icon
                            key={index_}
                            as={GiWifiRouter}
                            fontSize='1.2em'
                          />
                        )
                      default:
                        break
                    }
                  }
                )}
              </GridItem>
              <GridItem colStart={1} colEnd={13}>
                <Divider />
              </GridItem>
              <GridItem colStart={2} colEnd={12}>
                <FormControl isRequired>
                  <FormLabel fontWeight='bold'>Kỹ thuật viên mới</FormLabel>
                  <Flex alignItems='center' justifyContent='space-between'>
                    <Select
                      placeholder='Chọn kỹ thuật viên mới'
                      textStyle='normal'
                      onChange={(event) => {
                        // eslint-disable-next-line radix
                        onChangeRepairman(parseInt(event.target.value))
                      }}>
                      {suitableRepairman.map(
                        (repairman: REPAIRMAN, index: number) => (
                          <option key={index} value={repairman.id}>
                            {repairman.name}
                          </option>
                        )
                      )}
                    </Select>
                  </Flex>
                </FormControl>
              </GridItem>
              {currentRepairman.id ? (
                <>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-sm'>Mã nhân viên</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>#{currentRepairman.identity}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-sm'>Đơn vị</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{currentRepairman.unit}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-sm'>Chuyên môn</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    {currentRepairman.specializes?.map((specialize, index_) => {
                      switch (specialize.facilityType?.name) {
                        case 'computer':
                          return (
                            <Icon
                              key={index_}
                              as={RiComputerLine}
                              fontSize='1.2em'
                            />
                          )
                        case 'fax':
                          return <Icon key={index_} as={FaFax} fontSize='1em' />
                        case 'printer':
                          return (
                            <Icon
                              key={index_}
                              as={BiPrinter}
                              fontSize='1.2em'
                            />
                          )
                        case 'node':
                          return (
                            <Icon
                              key={index_}
                              as={GiWifiRouter}
                              fontSize='1.2em'
                            />
                          )
                        default:
                          break
                      }
                    })}
                  </GridItem>
                </>
              ) : null}
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button
              size='sm'
              colorScheme='teal'
              mr={3}
              onClick={() => onAssignRequest(currentRequest.id)}>
              Bàn giao cho kỹ thuật viên mới
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
