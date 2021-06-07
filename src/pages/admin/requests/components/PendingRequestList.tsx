/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable array-callback-return */
/* eslint-disable radix */
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
  // Select,
  FormControl,
  FormLabel,
  Divider,
  Textarea,
  FormErrorMessage,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { useDispatch } from 'react-redux'
import axios from '../../../../utils/axios'
import { REPAIRMAN, REQUEST, SPECIALIZE } from '../../../../types'
import { NotificationStatus } from '../../../../redux/types/notification.type'
import {
  pushNotification,
  resetNotification,
} from '../../../../redux/actions/notification.action'
import Empty from '../../../../components/Empty'
import Specialize from '../../../../components/Specialize'

type FormData = {
  rejectedReason?: string
  repairmanId?: number
}

export default function PendingRequestList({
  requests,
  refresh,
}: {
  requests: REQUEST[]
  refresh: Function
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()
  const {
    isOpen: isOpenReject,
    onOpen: onOpenReject,
    onClose: onCloseReject,
  } = useDisclosure()
  const [currentRequest, setCurrentRequest] = useState<REQUEST>({})
  const [suitableRepairman, setSuitableRepairman] = useState<REPAIRMAN[]>([])
  const [currentRepairman, setCurrentRepairman] = useState<REPAIRMAN>({})

  const onOpenRequest = (id?: number) => {
    onOpen()
    const request = requests.filter((item: REQUEST) => item.id === id)[0] || {}
    setCurrentRequest(request)
    axios
      .get(`/specializes/${request.facility?.facilityType?.name}`)
      .then((response) => {
        setSuitableRepairman(
          response.data.specializes.map(
            (specialize: SPECIALIZE) => specialize.repairman
          )
        )
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

  const onAssignRequest = async () => {
    await axios
      .put(`/requests/${currentRequest.id}/assign`, {
        repairmanId: currentRepairman.id,
      })
      .then((res) => {
        dispatch(
          pushNotification({
            title: res.data.message,
            description: res.data.description,
            status: NotificationStatus.SUCCESS,
          })
        )
        dispatch(resetNotification())
        refresh()
        onClose()
        onCloseReject()
      })
      .catch((error) => {
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

  const onRejectRequest = async (
    requestId?: number,
    rejectedReason?: string
  ) => {
    await axios
      .put(`/requests/${requestId}/reject`, {
        rejectedReason,
      })
      .then((res) => {
        dispatch(
          pushNotification({
            title: res.data.message,
            description: res.data.description,
            status: NotificationStatus.SUCCESS,
          })
        )
        dispatch(resetNotification())
        refresh()
        onClose()
        onCloseReject()
      })
      .catch((error) => {
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

  function validateRejectedReason(value: string) {
    let error
    if (!value) {
      error = 'Lý do từ chối không được bỏ trống'
    }
    return error
  }

  function validateRepairmanId() {
    let error
    if (!currentRepairman.id) {
      error = 'Kỹ thuật viên không được bỏ trống'
    }
    return error
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
          <Th>Cán bộ yêu cầu</Th>
          <Th>Vấn đề</Th>
          <Th>Trạng thái</Th>
          <Th isNumeric>Hành động</Th>
        </Tfoot>
      </Table>

      <Modal isOpen={isOpen} size='lg' onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={{ repairmanId: 1 }}
            onSubmit={async (values: FormData, actions: any) => {
              console.log(values)
              await onAssignRequest()
              actions.setSubmitting(false)
            }}>
            {(props) => (
              <Form>
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
                      <Tag
                        size='sm'
                        key='status'
                        variant='solid'
                        colorScheme='yellow'>
                        Đang chờ
                      </Tag>
                    </GridItem>
                    <GridItem colStart={2} colEnd={12}>
                      <Divider />
                    </GridItem>
                    <GridItem colStart={2} colEnd={12}>
                      <Field name='repairmanId' validate={validateRepairmanId}>
                        {({ form }: { form: any }) => (
                          <FormControl
                            isRequired
                            isInvalid={
                              form.errors.repairmanId &&
                              form.touched.repairmanId
                            }>
                            <FormLabel fontWeight='bold' htmlFor='repairmanId'>
                              Kỹ thuật viên
                            </FormLabel>
                            <Menu>
                              <MenuButton
                                as={Button}
                                rightIcon={<ChevronDownIcon />}>
                                {currentRepairman?.name || 'Chọn kỹ thuật viên'}
                              </MenuButton>
                              <MenuList>
                                {suitableRepairman.map(
                                  (repairman: REPAIRMAN, index: number) => (
                                    <MenuItem
                                      minH='48px'
                                      key={index}
                                      onClick={() => {
                                        onChangeRepairman(repairman?.id || 1)
                                      }}>
                                      <Text mr='3'>{repairman.name}</Text>
                                      <Specialize
                                        specializes={repairman.specializes}
                                      />
                                    </MenuItem>
                                  )
                                )}
                              </MenuList>
                            </Menu>
                            {/* <Select
                              placeholder='Chọn kỹ thuật viên'
                              textStyle='normal'
                              id='repairmanId'
                              value={currentRepairman.id}
                              onChange={(event) => {
                                onChangeRepairman(parseInt(event.target.value))
                              }}>
                              {suitableRepairman.map(
                                (repairman: REPAIRMAN, index: number) => (
                                  <option key={index} value={repairman.id}>
                                    {repairman.name}
                                    <Specialize
                                      specializes={repairman.specializes}
                                    />
                                  </option>
                                )
                              )}
                            </Select> */}
                            <FormErrorMessage>
                              {form.errors?.repairmanId}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
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
                          <Specialize
                            specializes={currentRepairman.specializes}
                          />
                        </GridItem>
                      </>
                    ) : null}
                  </Grid>
                </ModalBody>

                <ModalFooter>
                  <Button size='sm' colorScheme='gray' mr={3} onClick={onClose}>
                    Đóng
                  </Button>
                  <Button
                    size='sm'
                    colorScheme='red'
                    mr={3}
                    onClick={onOpenReject}>
                    Từ chối
                  </Button>
                  <Button
                    size='sm'
                    colorScheme='teal'
                    type='submit'
                    isLoading={props.isSubmitting}>
                    Chấp nhận
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenReject} onClose={onCloseReject}>
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={{ rejectedReason: '' }}
            onSubmit={async (values: FormData, actions: any) => {
              await onRejectRequest(currentRequest.id, values.rejectedReason)
              actions.setSubmitting(false)
            }}>
            {(props) => (
              <Form>
                <ModalHeader>Từ chối yêu cầu</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Field
                    name='rejectedReason'
                    validate={validateRejectedReason}>
                    {({ field, form }: { field: any; form: any }) => (
                      <FormControl
                        isRequired
                        isInvalid={
                          form.errors.rejectedReason &&
                          form.touched.rejectedReason
                        }>
                        <FormLabel htmlFor='rejectedReason'>Lý do</FormLabel>
                        <Textarea
                          {...field}
                          colorScheme='teal'
                          id='rejectedReason'
                          placeholder='Lý do'
                        />
                        <FormErrorMessage>
                          {form.errors?.rejectedReason}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme='red'
                    size='sm'
                    type='submit'
                    isLoading={props.isSubmitting}>
                    Từ chối
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </Box>
  )
}
