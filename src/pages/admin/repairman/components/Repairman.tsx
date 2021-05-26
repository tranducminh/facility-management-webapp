/* eslint-disable prettier/prettier */
/* eslint-disable array-callback-return */
import { useState, useEffect } from 'react'
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
  InputGroup,
  InputLeftElement,
  Input,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Checkbox,
  FormErrorMessage,
  IconButton,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react'
import { Search2Icon, ArrowRightIcon, ViewIcon } from '@chakra-ui/icons'
import { MdDelete } from 'react-icons/md'
import { RiComputerLine } from 'react-icons/ri'
import { BiPrinter } from 'react-icons/bi'
import { FaFax } from 'react-icons/fa'
import { Formik, Form, Field } from 'formik'
import { useDispatch } from 'react-redux'
import { Link } from '../../../../../i18n'
import axios from '../../../../utils/axios'
import { REPAIRMAN, SPECIALIZE } from '../../../../types'
import { NotificationStatus } from '../../../../redux/types/notification.type'
import {
  pushNotification,
  resetNotification,
} from '../../../../redux/actions/notification.action'

type FormData = {
  identity?: string
  name?: string
  unit?: string
}
export default function RepairmanComponent() {
  const dispatch = useDispatch()
  const {
    isOpen: isOpenUser,
    onOpen: onOpenUser,
    onClose: onCloseUser,
  } = useDisclosure()
  const [checkedItems, setCheckedItems] = useState([false, false, false, false])

  const allChecked = checkedItems.every(Boolean)
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked
  const [repairman, setRepairman] = useState<REPAIRMAN[]>([])

  const refreshData = () => {
    axios
      .get('/repairman')
      .then((res) => {
        setRepairman(res.data.repairman)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const createNewRepairman = async (data: FormData) => {
    const facilityTypes = []
    if (checkedItems[0]) facilityTypes.push('computer')
    if (checkedItems[1]) facilityTypes.push('printer')
    if (checkedItems[2]) facilityTypes.push('fax')
    if (checkedItems[3]) facilityTypes.push('node')
    await axios
      .post('/repairman', {
        ...data,
        facilityTypes,
      })
      .then((res) => {
        refreshData()
        onCloseUser()
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

  const onRemove = (id?: number) => {
    axios
      .delete(`/repairman/${id}`)
      .then((res) => {
        dispatch(
          pushNotification({
            title: res.data.message,
            description: res.data.description,
            status: NotificationStatus.SUCCESS,
          })
        )
        dispatch(resetNotification())
        refreshData()
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
  useEffect(() => {
    refreshData()
  }, [])

  function validateIdentity(value: string) {
    let error
    if (!value) {
      error = 'Mã nhân viên không được bỏ trống'
    }
    return error
  }

  function validateName(value: string) {
    let error
    if (!value) {
      error = 'Tên nhân viên không được bỏ trống'
    }
    return error
  }

  function validateUnit(value: string) {
    let error
    if (!value) {
      error = 'Tên đơn vị không được bỏ trống'
    }
    return error
  }

  return (
    <div>
      <Flex justifyContent='space-between' alignItems='center' mb={5}>
        <InputGroup maxW='30%'>
          <InputLeftElement pointerEvents='none'>
            <Search2Icon color='gray.300' />
          </InputLeftElement>
          <Input type='text' placeholder='Search user id' />
        </InputGroup>
        <Button
          rightIcon={<ArrowRightIcon fontSize='xs' />}
          colorScheme='teal'
          variant='ghost'
          size='sm'
          onClick={onOpenUser}>
          <Text textStyle='bold-md'>Tạo kỹ thuật viên mới</Text>
        </Button>
      </Flex>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Mã nhân viên</Th>
            <Th>Tên</Th>
            <Th>Đơn vị</Th>
            <Th>Chuyên môn</Th>
            <Th>Trạng thái</Th>
            <Th isNumeric>Hành động</Th>
          </Tr>
        </Thead>
        <Tbody>
          {!repairman
            ? null
            : repairman.map((item: REPAIRMAN, index: number) => (
              <Tr key={index}>
                <Td>{item.identity}</Td>
                <Td>{item.name}</Td>
                <Td>{item.unit}</Td>
                <Td>
                  {item.specializes?.map(
                    (specialize: SPECIALIZE, index_: number) => {
                      if (specialize.active) {
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
                              <Icon key={index_} as={FaFax} fontSize='1em' />
                            )
                          case 'printer':
                            return (
                              <Icon
                                key={index_}
                                as={BiPrinter}
                                fontSize='1.2em'
                              />
                            )
                          default:
                            break
                        }
                      }
                    }
                  )}
                </Td>
                <Td>
                  <HStack spacing={4}>
                    <Tag
                      size='sm'
                      key='status'
                      variant='solid'
                      colorScheme='teal'>
                      Hoạt động
                      </Tag>
                  </HStack>
                </Td>
                <Td isNumeric>
                  <Popover size='md'>
                    <PopoverTrigger>
                      <IconButton
                        colorScheme='red'
                        aria-label='Remove employee'
                        variant='outline'
                        size='sm'
                        icon={<MdDelete />}
                        mr='2'
                      />
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverHeader mt='2' fontWeight='bold' border='0'>
                        <Text textAlign='left'>Xóa tài khoản</Text>
                      </PopoverHeader>
                      <PopoverArrow />
                      <PopoverCloseButton mt='2' />
                      <PopoverBody>
                        <Text textAlign='left'>
                          Bạn có chắc muốn xóa tài khoản của{' '}
                          <b>{item.name}</b>
                        </Text>
                      </PopoverBody>
                      <PopoverFooter
                        border='0'
                        d='flex'
                        alignItems='center'
                        justifyContent='flex-end'
                        pb={4}>
                        <Button
                          size='xs'
                          colorScheme='green'
                          onClick={() => onRemove(item.id)}>
                          Đồng ý
                          </Button>
                      </PopoverFooter>
                    </PopoverContent>
                  </Popover>
                  <Link href={`/admin/repairman/${item.identity}`}>
                    <IconButton
                      colorScheme='teal'
                      aria-label='View Employee'
                      variant='outline'
                      size='sm'
                      icon={<ViewIcon />}
                    />
                  </Link>
                </Td>
              </Tr>
            ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Mã nhân viên</Th>
            <Th>Tên</Th>
            <Th>Đơn vị</Th>
            <Th>Chuyên môn</Th>
            <Th>Trạng thái</Th>
            <Th isNumeric>Hành động</Th>
          </Tr>
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

      <Modal isOpen={isOpenUser} onClose={onCloseUser}>
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={{ identity: '', name: '', unit: '' }}
            onSubmit={async (values: FormData, actions: any) => {
              await createNewRepairman(values)
              actions.setSubmitting(false)
            }}>
            {(props) => (
              <Form>
                <ModalHeader>Tạo kỹ thuật viên mới</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <Field name='identity' validate={validateIdentity}>
                    {({ field, form }: { field: any; form: any }) => (
                      <FormControl
                        isRequired
                        isInvalid={
                          form.errors.identity && form.touched.identity
                        }>
                        <FormLabel>Mã nhân viên</FormLabel>
                        <Input
                          {...field}
                          colorScheme='teal'
                          placeholder='Mã nhân viên'
                        />
                        <FormErrorMessage>
                          {form.errors?.identity}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='name' validate={validateName} mt='3'>
                    {({ field, form }: { field: any; form: any }) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors.name && form.touched.name}>
                        <FormLabel>Tên</FormLabel>
                        <Input
                          {...field}
                          colorScheme='teal'
                          placeholder='Tên'
                        />
                        <FormErrorMessage>{form.errors?.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='unit' validate={validateUnit} mt='3'>
                    {({ field, form }: { field: any; form: any }) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors.unit && form.touched.unit}>
                        <FormLabel>Đơn vị</FormLabel>
                        <Input
                          {...field}
                          colorScheme='teal'
                          placeholder='Đơn vị'
                        />
                        <FormErrorMessage>{form.errors?.unit}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <FormControl mt='3'>
                    <FormLabel>Chuyên môn</FormLabel>
                    <Checkbox
                      isChecked={allChecked}
                      isIndeterminate={isIndeterminate}
                      onChange={(e) => {
                        setCheckedItems([
                          e.target.checked,
                          e.target.checked,
                          e.target.checked,
                          e.target.checked,
                        ])
                      }}
                      colorScheme='teal'>
                      Tất cả
                    </Checkbox>
                    <Flex
                      pl={6}
                      mt={1}
                      spacing={1}
                      justifyContent='space-around'>
                      <Checkbox
                        isChecked={checkedItems[0]}
                        onChange={(e) => {
                          setCheckedItems([
                            e.target.checked,
                            checkedItems[1],
                            checkedItems[2],
                            checkedItems[3],
                          ])
                        }}
                        colorScheme='teal'>
                        Máy tính
                      </Checkbox>
                      <Checkbox
                        isChecked={checkedItems[1]}
                        onChange={(e) => {
                          setCheckedItems([
                            checkedItems[0],
                            e.target.checked,
                            checkedItems[2],
                            checkedItems[3],
                          ])
                        }}
                        colorScheme='teal'>
                        Máy in
                      </Checkbox>
                      <Checkbox
                        isChecked={checkedItems[2]}
                        onChange={(e) => {
                          setCheckedItems([
                            checkedItems[0],
                            checkedItems[1],
                            e.target.checked,
                            checkedItems[3],
                          ])
                        }}
                        colorScheme='teal'>
                        Máy fax
                      </Checkbox>
                    </Flex>
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button size='sm' onClick={onCloseUser} mr={3}>
                    Hủy
                  </Button>
                  <Button
                    size='sm'
                    colorScheme='teal'
                    type='submit'
                    isLoading={props.isSubmitting}>
                    Tạo mới
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
