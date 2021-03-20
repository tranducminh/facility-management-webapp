import { useState } from 'react'
import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  Spacer,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Textarea,
  Box,
} from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons'
import Head from 'next/head'
import { SingleDatePicker } from 'react-dates'
import moment from 'moment'
import ManagerDashboard from '../../../../layouts/ManagerDashboard'
import { Link } from '../../../../../i18n'
import Timeline from '../../../../components/Timeline'

export default function RoomSchedule() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedDate, handleDateChange] = useState<moment.Moment | null>(
    moment()
  )
  const [focused, setFocused] = useState<boolean>(false)
  return (
    <ManagerDashboard isRoom>
      <Head>
        <title>
          Room 123 - Building A1 - Ho Chi Minh National Academy of Politics -
          Facility management system
        </title>
      </Head>

      <Flex mb={5} alignItems='center'>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href='/manager/rooms'>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>Rooms</Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            {/* <Link> */}
            <BreadcrumbLink display='flex'>
              <Text textStyle='bold-md'>Room 123 ~</Text>
              <SingleDatePicker
                date={selectedDate}
                onDateChange={(date) => handleDateChange(date)}
                focused={focused}
                onFocusChange={({ focused }) => setFocused(focused)}
                displayFormat='DD/MM/yyyy'
                enableOutsideDays
                isOutsideRange={() => false}
                // minDate={moment()}
                id='your_unique_id'
              />
            </BreadcrumbLink>
            {/* </Link> */}
          </BreadcrumbItem>
        </Breadcrumb>
        <Spacer />
        <Button
          rightIcon={<ArrowRightIcon fontSize='xs' />}
          colorScheme='teal'
          variant='ghost'
          size='md'
          onClick={onOpen}>
          <Text textStyle='bold-md'>New request</Text>
        </Button>
      </Flex>
      <Box>
        <Timeline />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>21-11-1999</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Time start</FormLabel>
              <Input
                colorScheme='teal'
                type='time'
                min='08:00'
                placeholder='First name'
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Time end</FormLabel>
              <Input type='time' placeholder='First name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Reason</FormLabel>
              <Textarea placeholder='Reason' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ManagerDashboard>
  )
}
