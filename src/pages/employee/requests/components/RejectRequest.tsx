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
  Text,
  Box,
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

  if (requests.length <= 0) return <Empty title='Không có yêu cầu nào' />

  return (
    <Box>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Thiết bị</Th>
            <Th>Vấn đề</Th>
            <Th>Lý do từ chối</Th>
            <Th>Tình trạng</Th>
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
                <Text isTruncated>{request.rejectedReason}</Text>
              </Td>
              <Td>
                <Tag size='sm' key='status' variant='solid' colorScheme='red'>
                  Từ chối
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
            <Th>Lý do từ chối</Th>
            <Th>Tình trạng</Th>
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
              <GridItem colStart={2} colEnd={6}>
                <Text textStyle='bold-md'>Tên thiết bị</Text>
              </GridItem>
              <GridItem colStart={6} colEnd={12}>
                <Text>{currentRequest.facility?.name}</Text>
              </GridItem>
              <GridItem colStart={2} colEnd={6}>
                <Text textStyle='bold-md'>Vấn đề</Text>
              </GridItem>
              <GridItem colStart={6} colEnd={12}>
                <Text>{currentRequest.problem}</Text>
              </GridItem>
              <GridItem colStart={2} colEnd={6}>
                <Text textStyle='bold-md'>Lý do từ chối</Text>
              </GridItem>
              <GridItem colStart={6} colEnd={12}>
                <Text>{currentRequest.rejectedReason}</Text>
              </GridItem>
              <GridItem colStart={2} colEnd={6}>
                <Text textStyle='bold-md'>Tình trạng</Text>
              </GridItem>
              <GridItem colStart={6} colEnd={12}>
                <Tag size='sm' key='status' variant='solid' colorScheme='red'>
                  Từ chối
                </Tag>
              </GridItem>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='gray' size='sm' onClick={onClose}>
              Đóng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
