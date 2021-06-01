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
  HStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Grid,
  GridItem,
  Divider,
  Icon,
  Box,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { RiComputerLine } from 'react-icons/ri'
import { BiPrinter } from 'react-icons/bi'
import { FaFax } from 'react-icons/fa'
import { GiWifiRouter } from 'react-icons/gi'
import { REQUEST } from '../../../../types'
import Empty from '../../../../components/Empty'

export default function InProcessRequest({
  requests,
}: {
  requests: REQUEST[]
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [currentRequest, setCurrentRequest] = useState<REQUEST>({})

  const onOpenRequest = (id?: number) => {
    onOpen()
    const request = requests.filter((item: REQUEST) => item.id === id)[0] || {}
    setCurrentRequest(request)
  }

  if (requests.length <= 0) return <Empty title='Không có yêu cầu nào' />

  return (
    <Box>
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
          {requests.map((request: REQUEST, index: number) => (
            <Tr key={index}>
              <Td>{request.id}</Td>
              <Td maxW='11rem'>
                <Text isTruncated>{request.facility?.name}</Text>
              </Td>
              <Td maxW='11rem'>
                <Text isTruncated>{request.problem}</Text>
              </Td>
              <Td maxW='11rem'>
                <Text isTruncated>{request.repairman?.name}</Text>
              </Td>
              <Td>
                <Tag size='sm' key='status' variant='solid' colorScheme='blue'>
                  Đang sửa chữa
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
                    colorScheme='blue'>
                    Đang sửa chữa
                  </Tag>
                </HStack>
              </GridItem>
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
            {/* <Button size='sm' colorScheme='red' mr={3} onClick={onClose}>
              Từ chối
            </Button>
            <Button
              size='sm'
              colorScheme='teal'
              mr={3}
              onClick={() => onAssignRequest(currentRequest.id)}>
              Chấp nhận
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
