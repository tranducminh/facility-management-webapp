/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Badge,
  Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AdminDashboard from '../../../layouts/AdminDashboard'
import axios from '../../../utils/axios'
import AssignRequest from './components/AssignRequestList'
import PendingRequest from './components/PendingRequestList'
import CompletedRequest from './components/CompletedRequestList'
import UnCompletedRequest from './components/UnCompletedRequestList'
import InProcessRequest from './components/InProcessRequestList'
import RejectRequest from './components/RejectRequestList'
import { REQUEST } from '../../../types'

export default function Request() {
  const [pendingRequest, setPendingRequest] = useState<REQUEST[]>([])
  const [assignedRequest, setAssignedRequest] = useState<REQUEST[]>([])
  const [inProcessRequest, setInProcessRequest] = useState<REQUEST[]>([])
  const [completedRequest, setCompletedRequest] = useState<REQUEST[]>([])
  const [unCompletedRequest, setUnCompletedRequest] = useState<REQUEST[]>([])
  const [rejectedRequest, setRejectedRequest] = useState<REQUEST[]>([])
  const [defaultTab, setDefaultTab] = useState<number>(0)
  const router = useRouter()

  const refresh = () => {
    axios.get('/requests').then((response) => {
      const requests = response.data.requests || []
      setPendingRequest(
        requests.filter((request: REQUEST) => request.status === 'pending')
      )
      setAssignedRequest(
        requests.filter((request: REQUEST) => request.status === 'assigned')
      )
      setInProcessRequest(
        requests.filter((request: REQUEST) => request.status === 'inprocess')
      )
      setCompletedRequest(
        requests.filter((request: REQUEST) => request.status === 'completed')
      )
      setUnCompletedRequest(
        requests.filter((request: REQUEST) => request.status === 'uncompleted')
      )
      setRejectedRequest(
        requests.filter((request: REQUEST) => request.status === 'rejected')
      )
    })
  }
  useEffect(() => {
    const type = router.query.type || 'pending'
    switch (type) {
      case 'pending':
        setDefaultTab(0)
        break
      case 'assigned':
        setDefaultTab(1)
        break
      case 'inprocess':
        setDefaultTab(2)
        break
      case 'completed':
        setDefaultTab(3)
        break
      case 'uncompleted':
        setDefaultTab(4)
        break
      case 'rejected':
        setDefaultTab(5)
        break

      default:
        break
    }
    refresh()
  }, [])
  return (
    <AdminDashboard isRequest title='Yêu cầu'>
      <Tabs
        size='md'
        variant='enclosed'
        colorScheme='teal'
        defaultIndex={0}
        index={defaultTab}
        onChange={(index: number) => setDefaultTab(index)}>
        <TabList>
          <Tab>
            <Text textStyle='bold-sm'>Đang chờ</Text>
            {pendingRequest.length > 0 ? (
              <Badge ml='2' colorScheme='red'>
                {pendingRequest.length}
              </Badge>
            ) : null}
          </Tab>
          <Tab>
            <Text textStyle='bold-sm'>Đã bàn giao</Text>
            {assignedRequest.length > 0 ? (
              <Badge ml='2' colorScheme='red'>
                {assignedRequest.length}
              </Badge>
            ) : null}
          </Tab>
          <Tab>
            <Text textStyle='bold-sm'>Đang sửa chữa</Text>
            {inProcessRequest.length > 0 ? (
              <Badge ml='2' colorScheme='red'>
                {inProcessRequest.length}
              </Badge>
            ) : null}
          </Tab>
          <Tab>
            <Text textStyle='bold-sm'>Hoàn thành</Text>
            {completedRequest.length > 0 ? (
              <Badge ml='2' colorScheme='red'>
                {completedRequest.length}
              </Badge>
            ) : null}
          </Tab>
          <Tab>
            <Text textStyle='bold-sm'>Không hoàn thành</Text>
            {unCompletedRequest.length > 0 ? (
              <Badge ml='2' colorScheme='red'>
                {unCompletedRequest.length}
              </Badge>
            ) : null}
          </Tab>
          <Tab>
            <Text textStyle='bold-sm'>Đã từ chối</Text>
            {rejectedRequest.length > 0 ? (
              <Badge ml='2' colorScheme='red'>
                {rejectedRequest.length}
              </Badge>
            ) : null}
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <PendingRequest requests={pendingRequest} refresh={refresh} />
          </TabPanel>
          <TabPanel>
            <AssignRequest requests={assignedRequest} />
          </TabPanel>
          <TabPanel>
            <InProcessRequest requests={inProcessRequest} />
          </TabPanel>
          <TabPanel>
            <CompletedRequest requests={completedRequest} />
          </TabPanel>
          <TabPanel>
            <UnCompletedRequest
              requests={unCompletedRequest}
              refresh={refresh}
            />
          </TabPanel>
          <TabPanel>
            <RejectRequest requests={rejectedRequest} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </AdminDashboard>
  )
}
