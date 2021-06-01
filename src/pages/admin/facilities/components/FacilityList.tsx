/* eslint-disable @typescript-eslint/ban-types */
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
  Box,
  Text,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
} from '@chakra-ui/react'
import { ViewIcon, EditIcon } from '@chakra-ui/icons'
import Link from 'next/link'
import { MdDelete } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { FACILITY } from '../../../../types'
import axios from '../../../../utils/axios'
import { NotificationStatus } from '../../../../redux/types/notification.type'
import {
  pushNotification,
  resetNotification,
} from '../../../../redux/actions/notification.action'
import Empty from '../../../../components/Empty'

export default function FacilityList({
  facilities,
  refresh,
}: {
  facilities: FACILITY[]
  refresh: Function
}) {
  const dispatch = useDispatch()
  const removeFacility = (id?: number) => {
    axios
      .delete(`/facilities/${id}`)
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

  if (facilities.length <= 0) return <Empty title='Không có thiết bị ' />

  return (
    <Box>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Thiết bị</Th>
            <Th>Cán bộ</Th>
            <Th>Loại thiết bi</Th>
            <Th>Trạng thái</Th>
            <Th isNumeric>Hành động</Th>
          </Tr>
        </Thead>
        <Tbody>
          {facilities.map((facility: FACILITY, index: number) => (
            <Tr key={index}>
              <Td>{facility.id}</Td>
              <Td maxW='11rem'>
                <Text isTruncated>{facility.name}</Text>
              </Td>
              <Td
                maxW='11rem'
                cursor='pointer'
                _hover={{ color: 'teal', fontWeight: 'bold' }}>
                <Link href={`/admin/employees/${facility.employee?.identity}`}>
                  <Text isTruncated>{facility.employee?.name}</Text>
                </Link>
              </Td>
              <Td>
                <Tag size='sm' key='status' variant='solid' colorScheme='gray'>
                  {facility.facilityType?.name === 'computer'
                    ? 'MÁY TÍNH'
                    : facility.facilityType?.name === 'printer'
                      ? 'MÁY IN'
                      : 'MÁY FAX'}
                </Tag>
              </Td>
              <Td>
                {facility.status === 'ready' ? (
                  <Tag
                    size='sm'
                    key='status'
                    variant='solid'
                    colorScheme='teal'>
                    Sẵn sàng
                  </Tag>
                ) : facility.status === 'error' ? (
                  <Tag size='sm' key='status' variant='solid' colorScheme='red'>
                    Đang hỏng
                  </Tag>
                ) : facility.status === 'repairing' ? (
                  <Tag
                    size='sm'
                    key='status'
                    variant='solid'
                    colorScheme='blue'>
                    Đang sửa chữa
                  </Tag>
                ) : null}
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
                      <Text textAlign='left'>Xóa thiết bị</Text>
                    </PopoverHeader>
                    <PopoverArrow />
                    <PopoverCloseButton mt='2' />
                    <PopoverBody>
                      <Text textAlign='left'>
                        Bạn có chắc muốn xóa thiết bị <b>{facility.name}</b>
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
                        onClick={() => removeFacility(facility.id)}>
                        Đồng ý
                      </Button>
                    </PopoverFooter>
                  </PopoverContent>
                </Popover>
                <Link href={`/admin/facilities/${facility?.id}/edit`}>
                  <IconButton
                    colorScheme='yellow'
                    aria-label='Edit facility'
                    variant='outline'
                    size='sm'
                    icon={<EditIcon />}
                    mr='2'
                  />
                </Link>
                <Link href={`/admin/facilities/${facility?.id}`}>
                  <IconButton
                    colorScheme='teal'
                    aria-label='View facility'
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
            <Th>ID</Th>
            <Th>Thiết bị</Th>
            <Th>Cán bộ</Th>
            <Th>Loại thiết bi</Th>
            <Th>Trạng thái</Th>
            <Th isNumeric>Hành động</Th>
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  )
}
