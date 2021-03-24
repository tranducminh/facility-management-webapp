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
  InputGroup,
  InputLeftElement,
  Input,
  Flex,
  Grid,
  GridItem,
  useDisclosure,
} from '@chakra-ui/react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Search2Icon,
} from '@chakra-ui/icons'
import ReactPaginate from 'react-paginate'

export default function ExpiredRequest() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenContact,
    onOpen: onOpenContact,
    onClose: onCloseContact,
  } = useDisclosure()

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
            <Th>
              <Text>ID</Text>
            </Th>
            <Th>Facility</Th>
            <Th>Time</Th>
            <Th textAlign='center'>Quantity</Th>
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
              <Td textAlign='center'>{index + 1}</Td>
              <Td>
                <HStack spacing={4}>
                  <Tag size='sm' key='status' variant='solid' colorScheme='red'>
                    Expired
                  </Tag>
                </HStack>
              </Td>
              <Td isNumeric>
                <Button colorScheme='teal' variant='ghost' onClick={onOpen}>
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
            <Th>Quantity</Th>
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

      <Modal isOpen={isOpen} size='lg' onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>#211196</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns='repeat(12, 1fr)' gap={15}>
              <GridItem colStart={2} colEnd={6}>
                <Text textStyle='bold-md'>Requester ID</Text>
              </GridItem>
              <GridItem colStart={6} colEnd={12}>
                <Text>#211199</Text>
              </GridItem>
              <GridItem colStart={2} colEnd={6}>
                <Text textStyle='bold-md'>Requester name</Text>
              </GridItem>
              <GridItem colStart={6} colEnd={12}>
                <Text>Nguyễn Thị Hương Trà</Text>
              </GridItem>
              <GridItem colStart={2} colEnd={6}>
                <Text textStyle='bold-md'>Role</Text>
              </GridItem>
              <GridItem colStart={6} colEnd={12}>
                <Text>Student</Text>
              </GridItem>
              <GridItem colStart={2} colEnd={6}>
                <Text textStyle='bold-md'>Facility</Text>
              </GridItem>
              <GridItem colStart={6} colEnd={12}>
                <Text>Room A01</Text>
              </GridItem>
              <GridItem colStart={2} colEnd={6}>
                <Text textStyle='bold-md'>Time start</Text>
              </GridItem>
              <GridItem colStart={6} colEnd={12}>
                <Text>21/11/2021 8:00</Text>
              </GridItem>
              <GridItem colStart={2} colEnd={6}>
                <Text textStyle='bold-md'>Time end</Text>
              </GridItem>
              <GridItem colStart={6} colEnd={12}>
                <Text>21/11/2021 15:00</Text>
              </GridItem>
              <GridItem colStart={2} colEnd={6}>
                <Text textStyle='bold-md'>Reason</Text>
              </GridItem>
              <GridItem colStart={6} colEnd={12}>
                <Text>thich thi muon phong thoi co duoc khoong</Text>
              </GridItem>
              <GridItem colStart={2} colEnd={6}>
                <Text textStyle='bold-md'>Status</Text>
              </GridItem>
              <GridItem colStart={6} colEnd={12}>
                <HStack spacing={4}>
                  <Tag size='sm' key='status' variant='solid' colorScheme='red'>
                    Expired
                  </Tag>
                </HStack>
              </GridItem>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='gray' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='teal' mr={3} onClick={onClose}>
              Done
            </Button>
            <Button colorScheme='blue' mr={3} onClick={onOpenContact}>
              Contact
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenContact} size='lg' onClose={onCloseContact}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contact detail</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns='repeat(12, 1fr)' gap={15}>
              <GridItem colStart={2} colEnd={6}>
                <Text textStyle='bold-md'>ID</Text>
              </GridItem>
              <GridItem colStart={6} colEnd={12}>
                <Text>#211199</Text>
              </GridItem>
              <GridItem colStart={2} colEnd={6}>
                <Text textStyle='bold-md'>Name</Text>
              </GridItem>
              <GridItem colStart={6} colEnd={12}>
                <Text>Nguyễn Thị Hương Trà</Text>
              </GridItem>
              <GridItem colStart={2} colEnd={6}>
                <Text textStyle='bold-md'>Role</Text>
              </GridItem>
              <GridItem colStart={6} colEnd={12}>
                <Text>Student</Text>
              </GridItem>
              <GridItem colStart={2} colEnd={6}>
                <Text textStyle='bold-md'>Email</Text>
              </GridItem>
              <GridItem colStart={6} colEnd={12}>
                <Text>huongtrauet@gmail.com</Text>
              </GridItem>
              <GridItem colStart={2} colEnd={6}>
                <Text textStyle='bold-md'>Phone number</Text>
              </GridItem>
              <GridItem colStart={6} colEnd={12}>
                <Text>0972403331</Text>
              </GridItem>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='gray' mr={3} onClick={onCloseContact}>
              Close
            </Button>
            <Button colorScheme='blue' mr={3} onClick={onCloseContact}>
              Send mail to remind
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
