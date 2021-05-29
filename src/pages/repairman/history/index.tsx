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
import Link from 'next/link'
import RepairmanDashboard from '../../../layouts/RepairmanDashboard'
import HistoryDetail from './components/HistoryDetail'
import axios from '../../../utils/axios'
import { HISTORY } from '../../../types'

export default function Task() {
  const [histories, setHistories] = useState<HISTORY[]>([])

  const refresh = () => {
    axios
      .get('/repairman/me/histories')
      .then((response) => {
        setHistories(response.data.repairman.histories)
      })
      .catch((error) => {
        console.log(error)
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
    <RepairmanDashboard isHistory>
      <Flex justifyContent='space-between' alignItems='center' mb={5}>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href='/repairman/tasks'>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>Lịch sử làm việc</Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>

      <Accordion allowMultiple>
        {histories &&
          histories.map((history: HISTORY, index: number) => (
            <AccordionItem key={index}>
              <AccordionButton>
                <Flex
                  justifyContent='space-between'
                  alignItems='center'
                  w='100%'>
                  <Flex alignItems='center'>
                    <Text textStyle='bold-md'>
                      #{history.id} - {history.request?.facility?.name}
                    </Text>
                    <HStack spacing={4} ml='4'>
                      <Badge borderRadius='full' colorScheme='teal'>
                        {convertFacilityName(
                          history.request?.facility?.facilityType?.name
                        )}
                      </Badge>
                      {history.request?.status === 'completed' ? (
                        <Tag
                          size='sm'
                          key='status'
                          variant='solid'
                          colorScheme='green'>
                          Hoàn thành
                        </Tag>
                      ) : (
                        <Tag
                          size='sm'
                          key='status'
                          variant='solid'
                          colorScheme='red'>
                          Không hoàn thành
                        </Tag>
                      )}
                      {history.createdAt ? (
                        <Tag
                          size='sm'
                          key='status'
                          variant='solid'
                          colorScheme='gray'>
                          {`
                        ${new Date(history.createdAt).getDate()}
                        - ${new Date(history.createdAt).getMonth() + 1}
                        - ${new Date(history.createdAt).getFullYear()}`}
                        </Tag>
                      ) : null}
                    </HStack>
                  </Flex>
                </Flex>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel py={5}>
                <HistoryDetail history={history} />
              </AccordionPanel>
            </AccordionItem>
          ))}
      </Accordion>
    </RepairmanDashboard>
  )
}
