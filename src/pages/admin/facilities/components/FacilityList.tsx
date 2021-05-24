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
} from '@chakra-ui/react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ViewIcon,
  EditIcon,
} from '@chakra-ui/icons'
import ReactPaginate from 'react-paginate'
import Link from 'next/link'
import { MdDelete } from 'react-icons/md'
import { FACILITY } from '../../../../types'

export default function FacilityList({
  facilities,
}: {
  facilities: FACILITY[]
}) {
  return (
    <div>
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
              <Td>{facility.name}</Td>
              <Td
                cursor='pointer'
                _hover={{ color: 'teal', fontWeight: 'bold' }}>
                <Link href={`/admin/employees/${facility.employee?.identity}`}>
                  <Text>{facility.employee?.name}</Text>
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
                <IconButton
                  colorScheme='red'
                  aria-label='Remove facility'
                  variant='outline'
                  size='sm'
                  icon={<MdDelete />}
                  mr='2'
                />
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
    </div>
  )
}
