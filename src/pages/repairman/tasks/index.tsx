import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Badge,
  Tag,
  HStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import RepairmanDashboard from '../../../layouts/RepairmanDashboard'
import TaskDetail from './components/TaskDetail'
import { Link } from '../../../../i18n'
import axios from '../../../utils/axios'
import { REQUEST } from '../../../types'

export default function Task() {
  const [requests, setRequests] = useState<REQUEST[]>([])

  const refresh = () => {
    axios.get('/repairman/me/requests').then((response) => {
      setRequests(
        // eslint-disable-next-line array-callback-return
        response.data.repairman.requests.filter((item: REQUEST) => {
          return item.status === 'assigned' || item.status === 'inprocess'
        })
      )
    })
  }
  useEffect(() => {
    refresh()
  }, [])

  const convertFacilityName = (name?: string) => {
    switch (name) {
      case 'computer':
        return 'Máy tính'
      case 'printer':
        return 'Máy in'
      case 'fax':
        return 'Máy fax'
      case 'node':
        return 'Nút mạng'
      default:
        break
    }
  }

  return (
    <RepairmanDashboard isTask>
      <Flex justifyContent='space-between' alignItems='center' mb={5}>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href='/repairman/tasks'>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>Nhiệm vụ</Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>

      <Accordion defaultIndex={[0]} allowMultiple>
        {requests.map((request: REQUEST, index: number) => (
          <AccordionItem key={index}>
            <AccordionButton>
              <Flex justifyContent='space-between' alignItems='center' w='100%'>
                <Flex alignItems='center'>
                  <Text textStyle='bold-md'>
                    #{request.id} - {request.facility?.name}
                  </Text>
                  <HStack spacing={4} ml='4'>
                    <Badge borderRadius='full' colorScheme='teal'>
                      {convertFacilityName(
                        request.facility?.facilityType?.name
                      )}
                    </Badge>
                    {request.status === 'assigned' ? (
                      <Tag
                        size='sm'
                        key='status'
                        variant='solid'
                        colorScheme='yellow'>
                        Đã bàn giao
                      </Tag>
                    ) : (
                      <Tag
                        size='sm'
                        key='status'
                        variant='solid'
                        colorScheme='blue'>
                        Đang sửa chữa
                      </Tag>
                    )}
                  </HStack>
                </Flex>
              </Flex>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel py={5}>
              <TaskDetail request={request} refresh={refresh} />
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </RepairmanDashboard>
  )
}
