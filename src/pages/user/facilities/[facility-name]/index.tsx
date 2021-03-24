import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  Grid,
  GridItem,
  Icon,
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
  Textarea,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import moment from 'moment'
import {
  SingleDatePicker,
  DateRangePicker,
  FocusedInputShape,
} from 'react-dates'
import Head from 'next/head'
import { MdDateRange } from 'react-icons/md'
import UserDashboard from '../../../../layouts/UserDashboard'
import { useColor } from '../../../../theme/useColorMode'
import { Link } from '../../../../../i18n'

export default function FacilityDetail() {
  const { hoverTextColor, hoverBgColor } = useColor()
  const {
    isOpen: isOpenSingleDate,
    onOpen: onOpenSingleDate,
    onClose: onCloseSingleDate,
  } = useDisclosure()
  const {
    isOpen: isOpenMultipleDate,
    onOpen: onOpenMultipleDate,
    onClose: onCloseMultipleDate,
  } = useDisclosure()
  const [singleDate, setSingleDate] = useState<moment.Moment | null>(moment())
  const [startRangeDate, setStartRangeDate] = useState<moment.Moment | null>(
    moment()
  )
  const [endRangeDate, setEndRangeDate] = useState<moment.Moment | null>(
    moment()
  )
  const [focusedSingleDate, setFocusedSingleDate] = useState<boolean>(false)
  const [
    focusedRangeDate,
    setFocusedRangeDate,
  ] = useState<FocusedInputShape | null>(null)

  const handleRangeDatesChange = (arg: {
    startDate: moment.Moment | null
    endDate: moment.Moment | null
  }) => {
    setStartRangeDate(arg.startDate)
    setEndRangeDate(arg.endDate)
  }

  const handleFocusRangeDateChange = (arg: FocusedInputShape | null) => {
    setFocusedRangeDate(arg)
  }
  console.log(moment(startRangeDate).format('DD/MM/YYYY'))
  return (
    <UserDashboard isFacility>
      <Head>
        <title>
          Room 123 - Building A1 - Ho Chi Minh National Academy of Politics -
          Facility management system
        </title>
      </Head>

      <Flex mb={5} alignItems='center'>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href='/user/facilities'>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>Facilities</Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link href='/user/facilities/ipad'>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>Ipad</Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>
      <Grid templateColumns='repeat(10, 1fr)' gap={4}>
        <GridItem colStart={2} colEnd={3}>
          <Text textStyle='bold-md'>Name:</Text>
        </GridItem>
        <GridItem colStart={3} colEnd={4}>
          <Text textStyle='bold-md'>Ipad pro</Text>
        </GridItem>
        <GridItem colStart={6} colEnd={7}>
          <Text textStyle='bold-md'>Quantity: </Text>
        </GridItem>
        <GridItem colStart={7} colEnd={8}>
          <Text textStyle='bold-md'>10</Text>
        </GridItem>
        <GridItem colStart={2} colEnd={3}>
          <Text textStyle='bold-md'>Description:</Text>
        </GridItem>
      </Grid>
      <Grid templateColumns='repeat(10, 1fr)' gap={4} mt='8'>
        <GridItem colStart={2} colEnd={5}>
          <Flex
            borderWidth='2px'
            borderRadius='lg'
            flexDirection='row'
            alignItems='center'
            // w='30%'
            p={4}
            cursor='pointer'
            _hover={{
              color: hoverTextColor,
              backgroundColor: hoverBgColor,
              borderColor: hoverBgColor,
            }}
            onClick={onOpenSingleDate}>
            <Icon as={MdDateRange} fontSize='2xl' />
            <Text textAlign='center' textStyle='bold-md' ml='5'>
              In day
            </Text>
          </Flex>
        </GridItem>
        <GridItem colStart={6} colEnd={9}>
          <Flex
            borderWidth='2px'
            borderRadius='lg'
            flexDirection='row'
            alignItems='center'
            // w='30%'
            p={4}
            cursor='pointer'
            _hover={{
              color: hoverTextColor,
              backgroundColor: hoverBgColor,
              borderColor: hoverBgColor,
            }}
            onClick={onOpenMultipleDate}>
            <Icon as={MdDateRange} fontSize='2xl' />
            <Text textAlign='center' textStyle='bold-md' ml='5'>
              Multiple day
            </Text>
          </Flex>
        </GridItem>
      </Grid>

      <Modal isOpen={isOpenSingleDate} onClose={onCloseSingleDate}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <SingleDatePicker
              date={singleDate}
              onDateChange={(date) => setSingleDate(date)}
              focused={focusedSingleDate}
              onFocusChange={({ focused }: { focused: boolean }) => {
                setFocusedSingleDate(focused)
              }}
              displayFormat='DD/MM/yyyy'
              enableOutsideDays
              isOutsideRange={() => false}
              numberOfMonths={1}
              id='room-date'
            />
          </ModalHeader>
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
            <Button colorScheme='teal' mr={3}>
              Save
            </Button>
            <Button onClick={onCloseSingleDate}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenMultipleDate} onClose={onCloseMultipleDate}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <DateRangePicker
              startDate={startRangeDate}
              startDateId='your_unique_start_date_id'
              endDate={endRangeDate}
              endDateId='your_unique_end_date_id'
              onDatesChange={handleRangeDatesChange}
              focusedInput={focusedRangeDate}
              onFocusChange={handleFocusRangeDateChange}
              displayFormat='DD/MM/yyyy'
            />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>
                Time start for {moment(startRangeDate).format('DD/MM/YYYY')}
              </FormLabel>
              <Input
                colorScheme='teal'
                type='time'
                min='08:00'
                placeholder='First name'
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>
                Time end for {moment(endRangeDate).format('DD/MM/YYYY')}
              </FormLabel>
              <Input type='time' placeholder='First name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Reason</FormLabel>
              <Textarea placeholder='Reason' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' mr={3}>
              Save
            </Button>
            <Button onClick={onCloseMultipleDate}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </UserDashboard>
  )
}
