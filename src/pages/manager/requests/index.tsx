/* eslint-disable @typescript-eslint/no-empty-function */
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import ManagerDashboard from '../../../layouts/ManagerDashboard'
import ApproveRequest from './components/ApproveRequest'
import TodayRequest from './components/TodayRequest'
import PendingRequest from './components/PendingRequest'
import RejectRequest from './components/RejectRequest'

export default function Request() {
  return (
    <ManagerDashboard isRequest>
      <Tabs size='md' variant='enclosed' colorScheme='teal'>
        <TabList>
          <Tab textStyle='bold-md'>Today requests</Tab>
          <Tab textStyle='bold-md'>Approved</Tab>
          <Tab textStyle='bold-md'>Pending</Tab>
          <Tab textStyle='bold-md'>Rejected</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TodayRequest />
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
