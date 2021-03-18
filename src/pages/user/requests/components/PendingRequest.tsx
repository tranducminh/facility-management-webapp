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
} from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import ReactPaginate from 'react-paginate'

export default function PendingRequest() {
  return (
    <div>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>
              <Text>ID</Text>
            </Th>
            <Th>Facility</Th>
            <Th>Time</Th>
            <Th>Status</Th>
            <Th isNumeric>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {[...Array(5)].map((value, index) => (
            <Tr>
              <Td>211196</Td>
              <Td>Room A01</Td>
              <Td>21/11/2021 8:00 - 15:00</Td>
              <Td>
                <HStack spacing={4}>
                  <Tag
                    size='sm'
                    key='status'
                    variant='solid'
                    colorScheme={index % 2 === 0 ? 'teal' : 'yellow'}>
                    {index % 2 === 0 ? 'Approved' : 'Pending'}
                  </Tag>
                </HStack>
              </Td>
              <Td isNumeric>
                <Button colorScheme='teal' variant='ghost'>
                  Show
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>
              <Text>ID</Text>
            </Th>
            <Th>Facility</Th>
            <Th>Time</Th>
            <Th>Status</Th>
            <Th isNumeric>Actions</Th>
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
