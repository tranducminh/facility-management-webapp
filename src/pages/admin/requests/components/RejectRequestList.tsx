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
  Grid,
  GridItem,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { REQUEST } from '../../../../types'
import Empty from '../../../../components/Empty'

export default function RejectRequest({ requests }: { requests: REQUEST[] }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [currentRequest, setCurrentRequest] = useState<REQUEST>({})

  const onOpenRequest = (id?: number) => {
    onOpen()
    const request = requests.filter((item: REQUEST) => item.id === id)[0] || {}
    setCurrentRequest(request)
  }

  if (requests.length <= 0) return <Empty title='Không có yêu cầu ' />

  return (
    <Box>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Thiết bị</Th>
            <Th>Cán bộ yêu cầu</Th>
            <Th>Vấn đề</Th>
            <Th>Trạng thái</Th>
            <Th isNumeric>Hành động</Th>
          </Tr>
        </Thead>
        <Tbody>
          {requests.map((request, index) => (
            <Tr key={index}>
              <Td>{request.id}</Td>
              <Td maxW='11rem'>
                <Text isTruncated>{request.facility?.name}</Text>
              </Td>
              <Td maxW='11rem'>
                <Text isTruncated>{request.employee?.name}</Text>
              </Td>
              <Td maxW='11rem'>
                <Text isTruncated>{request.problem}</Text>
              </Td>
              <Td>
                <Tag size='sm' key='status' variant='solid' colorScheme='red'>
                  Đã từ chối
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
            <Th>Cán bộ yêu cầu</Th>
            <Th>Vấn đề</Th>
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
                    Đã từ chối
                  </Tag>
                </HStack>
              </GridItem>
              <GridItem colStart={2} colEnd={5}>
                <Text textStyle='bold-sm'>Lý do từ chối</Text>
              </GridItem>
              <GridItem colStart={5} colEnd={12}>
                <Text>{currentRequest.rejectedReason}</Text>
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
    </Box>
  )
}
