/* eslint-disable @typescript-eslint/no-empty-function */
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import UserDashboard from '../../../layouts/UserDashboard'
import ApproveRequest from './components/ApproveRequest'
import PendingRequest from './components/PendingRequest'
import RejectRequest from './components/RejectRequest'

export default function Request() {
  return (
    <UserDashboard isRequest>
      <Tabs size='md' variant='enclosed' colorScheme='teal'>
        <TabList>
          <Tab textStyle='bold-md'>Approved</Tab>
          <Tab textStyle='bold-md'>Pending</Tab>
          <Tab textStyle='bold-md'>Rejected</Tab>
        </TabList>
        <TabPanels>
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
    </UserDashboard>
  )
}
