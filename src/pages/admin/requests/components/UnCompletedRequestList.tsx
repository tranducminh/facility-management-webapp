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
  Divider,
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { useDispatch } from 'react-redux'
import axios from '../../../../utils/axios'
import { REPAIRMAN, REQUEST } from '../../../../types'
import { NotificationStatus } from '../../../../redux/types/notification.type'
import {
  pushNotification,
  resetNotification,
} from '../../../../redux/actions/notification.action'
import Empty from '../../../../components/Empty'
import Specialize from '../../../../components/Specialize'

type FormData = {
  repairmanId?: number
}
export default function UnCompletedRequest({
  requests,
  refresh,
}: {
  requests: REQUEST[]
  refresh: Function
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()

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

  const onAssignRequest = () => {
    axios
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
            <Th>Nhân viên kỹ thuật</Th>
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
                <Text isTruncated>{request.employee?.name}</Text>
              </Td>
              <Td maxW='11rem'>
                <Text isTruncated>{request.problem}</Text>
              </Td>
              <Td maxW='11rem'>
                <Text isTruncated>{request.repairman?.name}</Text>
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
            <Th>Nhân viên kỹ thuật</Th>
            <Th isNumeric>Hành động</Th>
          </Tr>
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
                      <HStack spacing={4}>
                        <Tag
                          size='sm'
                          key='status'
                          variant='solid'
                          colorScheme='red'>
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
                      <Specialize
                        specializes={currentRequest.repairman?.specializes}
                      />
                    </GridItem>
                    <GridItem colStart={1} colEnd={13}>
                      <Divider />
                    </GridItem>
                    <GridItem colStart={2} colEnd={12}>
                      <Field name='repairmanId' validate={validateRepairmanId}>
                        {({ field, form }: { field: any; form: any }) => (
                          <FormControl
                            isRequired
                            isInvalid={
                              form.errors.repairmanId &&
                              form.touched.repairmanId
                            }>
                            <FormLabel fontWeight='bold'>
                              Kỹ thuật viên mới
                            </FormLabel>
                            <Select
                              placeholder='Chọn kỹ thuật viên mới'
                              textStyle='normal'
                              {...field}
                              value={currentRepairman.id}
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
                  <Button
                    size='sm'
                    colorScheme='teal'
                    mr={3}
                    type='submit'
                    isLoading={props.isSubmitting}>
                    Bàn giao cho kỹ thuật viên mới
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
