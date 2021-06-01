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
  FormControl,
  FormLabel,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { REQUEST } from '../../../../types'
import axios from '../../../../utils/axios'
import { NotificationStatus } from '../../../../redux/types/notification.type'
import {
  pushNotification,
  resetNotification,
} from '../../../../redux/actions/notification.action'
import Empty from '../../../../components/Empty'

export default function PendingRequest({
  requests,
  refresh,
}: {
  requests: REQUEST[]
  refresh: Function
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure()
  const dispatch = useDispatch()

  const [currentRequest, setCurrentRequest] = useState<REQUEST>({})
  const [updatedProblem, setUpdatedProblem] = useState<string>('')
  const onOpenRequest = (id?: number) => {
    onOpen()
    const request = requests.filter((item: REQUEST) => item.id === id)[0] || {}
    setCurrentRequest(request)
    setUpdatedProblem(request.problem || '')
  }
  const updateRequest = (id?: number) => {
    axios
      .put(`/requests/${id}`, { problem: updatedProblem })
      .then((res) => {
        onClose()
        onCloseEdit()
        refresh()
        dispatch(
          pushNotification({
            title: res.data.message,
            description: res.data.description,
            status: NotificationStatus.SUCCESS,
          })
        )
        dispatch(resetNotification())
      })
      .catch((error) => {
        onCloseEdit()
        dispatch(
          pushNotification({
            title: error.response.data.message,
            description: error.response.data.description,
            status: NotificationStatus.ERROR,
          })
        )
        dispatch(resetNotification())
      })
  }
  const deleteRequest = (id?: number) => {
    axios
      .put(`/requests/${id}/delete`)
      .then((res) => {
        onClose()
        refresh()
        dispatch(
          pushNotification({
            title: res.data.message,
            description: res.data.description,
            status: NotificationStatus.SUCCESS,
          })
        )
        dispatch(resetNotification())
      })
      .catch((error) => {
        onClose()
        dispatch(
          pushNotification({
            title: error.response.data.message,
            description: error.response.data.description,
            status: NotificationStatus.ERROR,
          })
        )
        dispatch(resetNotification())
      })
  }

  if (requests.length <= 0) return <Empty title='Không có yêu cầu ' />

  return (
    <Box>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Thiết bị</Th>
            <Th>Vấn đề</Th>
            <Th>Trạng thái</Th>
            <Th isNumeric>Hành động</Th>
          </Tr>
        </Thead>
        <Tbody>
          {requests.map((request: REQUEST, index: number) => (
            <Tr key={index}>
              <Td>{request.id}</Td>
              <Td maxW='15rem'>
                <Text isTruncated>{request.facility?.name}</Text>
              </Td>
              <Td maxW='15rem'>
                <Text isTruncated>{request.problem}</Text>
              </Td>
              <Td>
                <Tag
                  size='sm'
                  key='status'
                  variant='solid'
                  colorScheme='yellow'>
                  Đang chờ
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
          <Th>ID</Th>
          <Th>Thiết bị</Th>
          <Th>Vấn đề</Th>
          <Th>Trạng thái</Th>
          <Th isNumeric>Hành động</Th>
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
                <Text textStyle='bold-md'>Thiết bị</Text>
              </GridItem>
              <GridItem colStart={5} colEnd={12}>
                <Text>{currentRequest.facility?.name}</Text>
              </GridItem>
              <GridItem colStart={2} colEnd={5}>
                <Text textStyle='bold-md'>Vấn đề</Text>
              </GridItem>
              <GridItem colStart={5} colEnd={12}>
                <Text>{currentRequest.problem}</Text>
              </GridItem>
              <GridItem colStart={2} colEnd={5}>
                <Text textStyle='bold-md'>Tình trạng</Text>
              </GridItem>
              <GridItem colStart={5} colEnd={12}>
                <Tag
                  size='sm'
                  key='status'
                  variant='solid'
                  colorScheme='yellow'>
                  Đang chờ
                </Tag>
              </GridItem>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button size='sm' colorScheme='blue' mr={3} onClick={onOpenEdit}>
              Chỉnh sửa
            </Button>
            <Button
              size='sm'
              colorScheme='red'
              mr={3}
              onClick={() => deleteRequest(currentRequest.id)}>
              Hủy yêu cầu
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenEdit} onClose={onCloseEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cập nhật yêu cầu</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box
              fontWeight='semibold'
              as='h2'
              lineHeight='tight'
              isTruncated
              fontSize='md'>
              #{currentRequest.facility?.id}
            </Box>
            <Box
              fontWeight='semibold'
              as='h2'
              lineHeight='tight'
              isTruncated
              fontSize='xl'>
              <Text textStyle='bold-md'>{currentRequest.facility?.name}</Text>
            </Box>
            <FormControl mt={4}>
              <FormLabel>Vấn đề gặp phải</FormLabel>
              <Textarea
                defaultValue={updatedProblem}
                placeholder='Vấn đề gặp phải'
                onChange={(event) => setUpdatedProblem(event.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button size='sm' onClick={onCloseEdit} mr={3}>
              Hủy
            </Button>
            <Button
              size='sm'
              colorScheme='teal'
              onClick={() => updateRequest(currentRequest.id)}>
              Cập nhật yêu cầu
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
