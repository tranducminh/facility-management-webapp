/* eslint-disable prettier/prettier */
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
  useDisclosure,
} from '@chakra-ui/react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Search2Icon,
  ArrowRightIcon
} from '@chakra-ui/icons'
import ReactPaginate from 'react-paginate'
import { useState } from 'react'
import { RiComputerLine } from 'react-icons/ri'
import { BiPrinter } from 'react-icons/bi'
import { FaFax } from 'react-icons/fa'
import { GiWifiRouter } from 'react-icons/gi'
import { REQUEST, REPLACEMENT } from '../../../../types'

export default function CompletedRequest({
  requests,
}: {
  requests: REQUEST[]
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [currentRequest, setCurrentRequest] = useState<REQUEST>({})
  const [replacements, setReplacements] = useState<REPLACEMENT[] | undefined>(
    []
  )
  const onOpenRequest = (id?: number) => {
    onOpen()
    const request = requests.filter((item: REQUEST) => item.id === id)[0] || {}
    setCurrentRequest(request)
    setReplacements(request?.replacements)
  }

  const convertName = (name?: string | number) => {
    switch (name) {
      case 'cpu':
        return 'CPU'
      case 'mainboard':
        return 'Main board'
      case 'hardDrive':
        return 'Ổ cứng'
      case 'ram':
        return 'Bộ nhớ'
      case 'vga':
        return 'Card màn hình'
      case 'psu':
        return 'Nguồn'
      case 'monitor':
        return 'Màn hình'
      case 'keyboard':
        return 'Bàn phím'
      case 'mouse':
        return 'Chuột'
      case 'headPhone':
        return 'Tai nghe'
      case 'fanCase':
        return 'Tản nhiệt'
      case 'webcam':
        return 'Webcam'
      case 'cardReader':
        return 'Đầu đọc thẻ'
      case 'model':
        return 'Model'
      case 'paperSize':
        return 'Khay giấy'
      case 'printInk':
        return 'Mực in'
      case 'communication':
        return 'Cổng giao tiếp'
      default:
        break
    }
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
            <Th>Vấn đề</Th>
            <Th>Nhân viên kỹ thuật</Th>
            <Th>Trạng thái</Th>
            <Th isNumeric>Hành động</Th>
          </Tr>
        </Thead>
        <Tbody>
          {requests.map((request, index) => (
            <Tr key={index}>
              <Td>{request.id}</Td>
              <Td w='20%'>{request.facility?.name}</Td>
              <Td w='20%'>{request.problem}</Td>
              <Td>{request.repairman?.name}</Td>
              <Td>
                <Tag
                  size='sm'
                  key='status'
                  variant='solid'
                  colorScheme='green'>
                  Hoàn thành
                </Tag>
              </Td>
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
            <Th>Vấn đề</Th>
            <Th>Nhân viên kỹ thuật</Th>
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

      <Modal
        isOpen={isOpen}
        size={replacements && replacements?.length > 0 ? '2xl' : 'lg'}
        onClose={onClose}>
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
                  <Tag
                    size='sm'
                    key='status'
                    variant='solid'
                    colorScheme='green'>
                    Đã hoàn thành
                  </Tag>
                </HStack>
              </GridItem>
              <GridItem colStart={2} colEnd={5}>
                <Text textStyle='bold-sm'>Giải pháp</Text>
              </GridItem>
              <GridItem colStart={5} colEnd={12}>
                <Text>{currentRequest.solution}</Text>
              </GridItem>
              {replacements && replacements.length <= 0 ? null : (
                <GridItem colStart={2} colEnd={12}>
                  <Text textStyle='bold-sm'>Linh kiện thay thế</Text>
                </GridItem>
              )}
              {!replacements
                ? null
                : replacements.map(
                  (replacement: REPLACEMENT) => (
                    <>
                      <GridItem colStart={2} colEnd={12} pl='5'>
                        <Text textStyle='bold-sm'>
                          {convertName(replacement?.component)}
                        </Text>
                      </GridItem>
                      <GridItem colStart={2} colEnd={7} pl='10'>
                        <Text textStyle='normal'>{replacement.source}</Text>
                      </GridItem>
                      <GridItem colStart={7} colEnd={8}>
                        <ArrowRightIcon />
                      </GridItem>
                      <GridItem colStart={8} colEnd={12}>
                        <Text textStyle='normal'>{replacement.target}</Text>
                      </GridItem>
                    </>
                  )
                )}
              <GridItem colStart={2} colEnd={12}>
                <Divider />
              </GridItem>

              <GridItem colStart={2} colEnd={5}>
                <Text textStyle='bold-sm'>Kỹ thuật viên</Text>
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
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button size='sm' colorScheme='gray' mr={3} onClick={onClose}>
              Đóng
            </Button>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
