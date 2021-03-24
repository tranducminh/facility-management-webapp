import { useState } from 'react'
import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import Head from 'next/head'
import { SingleDatePicker } from 'react-dates'
import moment from 'moment'
import ManagerDashboard from '../../../../layouts/ManagerDashboard'
import { Link } from '../../../../../i18n'
import Timeline from '../../../../components/Timeline'
import FacilityItem from '../components/FacilityItem'

export default function RoomSchedule() {
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
            <Link href='/manager/rooms'>
              <BreadcrumbLink display='flex'>
                <Text textStyle='bold-md'>Room 123</Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>
      <Box>
        <Tabs size='md' variant='enclosed' colorScheme='teal'>
          <TabList>
            <Tab textStyle='bold-md'>
              <Flex>
                <Text textStyle='bold-md'>Schedule ~</Text>
                <SingleDatePicker
                  date={selectedDate}
                  onDateChange={(date) => handleDateChange(date)}
                  focused={focused}
                  onFocusChange={({ focused }: { focused: boolean }) => {
                    setFocused(focused)
                  }}
                  displayFormat='DD/MM/yyyy'
                  enableOutsideDays
                  isOutsideRange={() => false}
                  id='room-date'
                />
              </Flex>
            </Tab>
            <Tab textStyle='bold-md'>Facilities</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Timeline />
            </TabPanel>
            <TabPanel>
              <Grid templateColumns='repeat(3, 1fr)' gap={4}>
                {[...Array(30)].map((value, index) => (
                  <Link href='/user/facilities/table'>
                    <GridItem colSpan={1}>
                      <FacilityItem />
                    </GridItem>
                  </Link>
                ))}
              </Grid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </ManagerDashboard>
  )
}
