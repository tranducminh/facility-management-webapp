/* eslint-disable prettier/prettier */
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
  Tag,
  HStack,
  Badge
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AdminDashboard from '../../../../layouts/AdminDashboard'
import { Link } from '../../../../../i18n'
import RepairmanDetailComponent from '../components/RepairmanDetail'
import HistoryDetail from '../components/HistoryDetail'
import axios from '../../../../utils/axios'
import { REPAIRMAN, HISTORY } from '../../../../types'

export default function RepairmanDetail() {
  const router = useRouter()
  const [repairman, setRepairman] = useState<REPAIRMAN>({})
  const refresh = () => {
    axios
      .get(`/repairman/${router.query['repairman-id']}`)
      .then((response) => {
        setRepairman(response.data.repairman)
        debugger
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
    <AdminDashboard isRepairman>
      <Flex justifyContent='space-between' alignItems='center' mb={5}>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href='/admin/repairman'>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>Kỹ thuật viên</Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link href='/admin/repairman/211196'>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>
                  #{repairman.identity} - {repairman.name}
                </Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>

      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          <AccordionButton>
            <Flex justifyContent='space-between' alignItems='center' w='100%'>
              <Text textStyle='bold-md'>Thông tin kỹ thuật viên</Text>
              <AccordionIcon />
            </Flex>
          </AccordionButton>
          <AccordionPanel py={5}>
            <RepairmanDetailComponent repairman={repairman} />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Flex justifyContent='space-between' alignItems='center' w='100%'>
              <Text textStyle='bold-md'>Lịch sử nhiệm vụ</Text>
              <AccordionIcon />
            </Flex>
          </AccordionButton>
          <AccordionPanel py={5}>
            <Accordion allowMultiple>
              {!repairman.histories
                ? null
                : repairman.histories.map((history: HISTORY, index: number) => (
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
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </AdminDashboard>
  )
}
