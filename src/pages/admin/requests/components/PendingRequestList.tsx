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
  Box,
  HStack,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  Flex,
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
  Select,
  FormControl,
  FormLabel,
  Divider,
  Icon,
  Textarea,
  FormErrorMessage,
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { useState } from 'react'
import { RiComputerLine } from 'react-icons/ri'
import { BiPrinter } from 'react-icons/bi'
import { FaFax } from 'react-icons/fa'
import { GiWifiRouter } from 'react-icons/gi'
import { Formik, Form, Field } from 'formik'
import axios from '../../../../utils/axios'
import { REPAIRMAN, REQUEST } from '../../../../types'

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

  const onAssignRequest = async () => {
    await axios
      .put(`/requests/${currentRequest.id}/assign`, {
        repairmanId: currentRepairman.id,
      })
      .then(() => {
        refresh()
        onClose()
        onCloseReject()
      })
      .catch((error) => {
        console.log(error)
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
      .then(() => {
        refresh()
        onClose()
        onCloseReject()
      })
      .catch((error) => {
        console.log(error)
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
            {/* <Th>Cán bộ yêu cầu</Th> */}
            <Th>Vấn đề</Th>
            <Th>Trạng thái</Th>
            <Th isNumeric>Hành động</Th>
          </Tr>
        </Thead>
        <Tbody>
          {requests.map((request, index) => (
            <Tr key={index}>
              <Td>{request.id}</Td>
              <Td>
                <Box maxW='12rem' isTruncated>
                  <Text noOfLines={1}>{request.facility?.name}</Text>
                </Box>
              </Td>
              {/* <Td>
                <Box maxW='8rem' isTruncated>
                  <Text noOfLines={1} isTruncated>
                    {request.employee?.name}
                  </Text>
                </Box>
              </Td> */}
              <Td>
                <Box maxW='12rem' isTruncated>
                  <Text noOfLines={1} isTruncated>
                    {request.problem}
                  </Text>
                </Box>
              </Td>
              <Td>
                <HStack spacing={4}>
                  <Tag
                    size='sm'
                    key='status'
                    variant='solid'
                    colorScheme='yellow'>
                    Đang chờ
                  </Tag>
                </HStack>
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
          {/* <Th>Cán bộ yêu cầu</Th> */}
          <Th>Vấn đề</Th>
          <Th>Trạng thái</Th>
          <Th isNumeric>Hành động</Th>
        </Tfoot>
      </Table>
      {/* <Box w='50%' mt={5} float='right'>
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
      </Box> */}

      <Modal isOpen={isOpen} size='lg' onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={{ repairmanId: 1 }}
            onSubmit={async (values: FormData, actions: any) => {
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
                          colorScheme='yellow'>
                          Đang chờ
                        </Tag>
                      </HStack>
                    </GridItem>
                    <GridItem colStart={2} colEnd={12}>
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
                            <FormLabel fontWeight='bold' htmlFor='repairmanId'>
                              Kỹ thuật viên
                            </FormLabel>
                            <Select
                              placeholder='Chọn kỹ thuật viên'
                              textStyle='normal'
                              id='repairmanId'
                              value={currentRepairman.id}
                              {...field}
                              onChange={(event) => {
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
                          {currentRepairman.specializes?.map(
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
                                  return (
                                    <Icon
                                      key={index_}
                                      as={FaFax}
                                      fontSize='1em'
                                    />
                                  )
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
                            }
                          )}
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
    </div>
  )
}
