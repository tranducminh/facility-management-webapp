/* eslint-disable @typescript-eslint/no-empty-function */
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import ManagerDashboard from '../../../layouts/ManagerDashboard'
import ApproveRequest from './components/ApproveRequest'
import RequestByDate from './components/RequestByDate'
import ExpiredRequest from './components/ExpiredRequest'
import PendingRequest from './components/PendingRequest'
import RejectRequest from './components/RejectRequest'

export default function Request() {
  return (
    <ManagerDashboard isRequest>
      <Tabs size='md' variant='enclosed' colorScheme='teal' defaultIndex={3}>
        <TabList>
          <Tab textStyle='bold-md'>Requests by date</Tab>
          <Tab textStyle='bold-md'>Expired requests</Tab>
          <Tab textStyle='bold-md'>Approved</Tab>
          <Tab textStyle='bold-md'>Pending</Tab>
          <Tab textStyle='bold-md'>Rejected</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <RequestByDate />
          </TabPanel>
          <TabPanel>
            <ExpiredRequest />
          </TabPanel>
          <TabPanel>
            <ApproveRequest />
          </TabPanel>
          <TabPanel>
            <PendingRequest />
          </TabPanel>
          <TabPanel>
            <RejectRequest />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </ManagerDashboard>
  )
}
