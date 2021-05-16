/* eslint-disable no-nested-ternary */
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
  // Modal,
  // ModalOverlay,
  // ModalContent,
  // ModalHeader,
  // ModalFooter,
  // ModalBody,
  // ModalCloseButton,
  // Grid,
  // GridItem,
  // Divider,
  // useDisclosure,
} from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import ReactPaginate from 'react-paginate'
// import { useState } from 'react'
import Link from 'next/link'
import { FACILITY } from '../../../../types'

export default function FacilityList({
  facilities,
}: {
  facilities: FACILITY[]
}) {
  // const { isOpen, onOpen, onClose } = useDisclosure()
  // const [currentFacility, setCurrentFacility] = useState<FACILITY>({})
  // const showFacility = (facilityId: number = 1) => {
  //   onOpen()
  //   setCurrentFacility(
  //     facilities.filter((item: FACILITY) => item.id === facilityId)[0]
  //   )
  // }
  return (
    <div>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Facility</Th>
            <Th>Owner</Th>
            <Th>Type</Th>
            <Th>Status</Th>
            <Th isNumeric>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {facilities.map((facility: FACILITY, index: number) => (
            <Tr key={index}>
              <Td>{facility.id}</Td>
              <Td>{facility.name}</Td>
              <Td
                cursor='pointer'
                _hover={{ color: 'teal', fontWeight: 'bold' }}>
                <Link href={`/admin/employees/${facility.employee?.identity}`}>
                  <Text>{facility.employee?.name}</Text>
                </Link>
              </Td>
              <Td>
                <HStack spacing={4}>
                  <Tag
                    size='sm'
                    key='status'
                    variant='solid'
                    colorScheme='gray'>
                    {facility.facilityType?.name?.toUpperCase() || ''}
                  </Tag>
                </HStack>
              </Td>
              <Td>
                <Tag size='sm' key='status' variant='solid' colorScheme='teal'>
                  {facility.status}
                </Tag>
              </Td>
              <Td isNumeric>
                <Link href={`/admin/facilities/${facility?.id}`}>
                  <Button size='sm' colorScheme='teal' variant='ghost'>
                    Show
                  </Button>
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>ID</Th>
            <Th>Facility</Th>
            <Th>Requester</Th>
            <Th>Problem</Th>
            <Th>Repairman</Th>
            <Th isNumeric>Actions</Th>
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

      {/* <Modal isOpen={isOpen} size='xl' onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>#{currentFacility.id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns='repeat(12, 1fr)' gap={15}>
              <GridItem colStart={2} colEnd={5}>
                <Text textStyle='bold-md'>Tên</Text>
              </GridItem>
              <GridItem colStart={5} colEnd={12}>
                <Text>{currentFacility.name}</Text>
              </GridItem>
              <GridItem colStart={2} colEnd={5}>
                <Text textStyle='bold-md'>Xuất sứ</Text>
              </GridItem>
              <GridItem colStart={5} colEnd={12}>
                <Text>{currentFacility.origin}</Text>
              </GridItem>
              <GridItem colStart={2} colEnd={5}>
                <Text textStyle='bold-md'>Giá trị</Text>
              </GridItem>
              <GridItem colStart={5} colEnd={12}>
                <Text>{currentFacility.price} VND</Text>
              </GridItem>
              <GridItem colStart={2} colEnd={5}>
                <Text textStyle='bold-md'>Ngày cấp</Text>
              </GridItem>
              <GridItem colStart={5} colEnd={12}>
                <Text>21/11/2022</Text>
              </GridItem>
              <GridItem colStart={2} colEnd={5}>
                <Text textStyle='bold-md'>Trạng thái</Text>
              </GridItem>
              <GridItem colStart={5} colEnd={12}>
                <HStack spacing={4}>
                  <Tag
                    size='sm'
                    key='status'
                    variant='solid'
                    colorScheme='teal'>
                    {currentFacility.status}
                  </Tag>
                </HStack>
              </GridItem>
              <GridItem colStart={1} colEnd={13}>
                <Divider colorScheme='teal' />
              </GridItem>
              {currentFacility.facilityType?.name === 'computer' ? (
                <>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>CPU</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{currentFacility.configuration?.cpu}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Main board</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{currentFacility.configuration?.mainboard}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Ổ cứng</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{currentFacility.configuration?.hardDrive}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Bộ nhớ</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{currentFacility.configuration?.ram}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>VGA</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{currentFacility.configuration?.vga}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Nguồn</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{currentFacility.configuration?.psu}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Màn hình</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{currentFacility.configuration?.monitor}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Bàn phím</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{currentFacility.configuration?.keyboard}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Chuột</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{currentFacility.configuration?.mouse}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Tai nghe</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{currentFacility.configuration?.headPhone}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Micro</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>Loa Edifier R1850DB - 2.0 Matte Black</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Tản nhiệt</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{currentFacility.configuration?.fanCase}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Webcam</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{currentFacility.configuration?.webcam}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Đầu đọc thẻ</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{currentFacility.configuration?.cardReader}</Text>
                  </GridItem>
                </>
              ) : currentFacility.facilityType?.name === 'fax' ? (
                <>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Model</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{currentFacility.configuration?.model}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Tốc độ fax</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{currentFacility.configuration?.faxSpeed}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Độ phân giải</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{currentFacility.configuration?.resolution}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Bộ nhớ</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{currentFacility.configuration?.ram}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Khay giấy</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{currentFacility.configuration?.paperSize}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Mực</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{currentFacility.configuration?.printInk}</Text>
                  </GridItem>
                </>
              ) : currentFacility.facilityType?.name === 'printer' ? (
                <>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Model</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{currentFacility.configuration?.model}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Tốc độ in</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{currentFacility.configuration?.printSpeed}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Độ phân giải</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{currentFacility.configuration?.resolution}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Bộ nhớ</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{currentFacility.configuration?.ram}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Khay giấy</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{currentFacility.configuration?.paperSize}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Mực</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{currentFacility.configuration?.printInk}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>In đảo mặt</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{currentFacility.configuration?.duplexPrint}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Cổng giao tiếp</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{currentFacility.configuration?.communication}</Text>
                  </GridItem>
                </>
              ) : (
                <>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Nút mạng</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{currentFacility.configuration?.nodeName}</Text>
                  </GridItem>
                </>
              )}
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button size='sm' colorScheme='gray' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </div>
  )
}
