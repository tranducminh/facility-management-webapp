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
  Badge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Spinner,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import AdminDashboard from '../../../../layouts/AdminDashboard'
import RepairmanDetailComponent from '../components/RepairmanDetail'
import HistoryDetail from '../components/HistoryDetail'
import axios from '../../../../utils/axios'
import { REPAIRMAN, HISTORY } from '../../../../types'

export default function RepairmanDetail() {
  const router = useRouter()
  const [repairman, setRepairman] = useState<REPAIRMAN>({})
  const [histories, setHistories] = useState<HISTORY[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const refresh = (repairmanId?: string) => {
    axios
      .get(
        `/repairman/${repairmanId || router.query['repairman-id']?.toString()}`
      )
      .then((res) => {
        setRepairman(res.data.repairman)
        setHistories(res.data.repairman.histories)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(router.query['repairman-id'])
        if (error.response?.status === 404) {
          setIsError(true)
        }
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

  if (isError) {
    return (
      <AdminDashboard isRepairman title={repairman?.name || 'Kỹ thuật viên'}>
        <Alert
          status='error'
          variant='subtle'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
          height='200px'>
          <AlertIcon boxSize='40px' mr={0} />
          <AlertTitle mt={4} mb={1} fontSize='lg'>
            Không tìm thấy kỹ thuật viên với mã nhân viên #
            {router.query['repairman-id']}
          </AlertTitle>
          <AlertDescription maxWidth='sm' mt='3'>
            <Link href='/admin/repairman'>
              <Button size='sm' variant='ghost' colorScheme='teal'>
                Trở về trang danh sách kỹ thuật viên
              </Button>
            </Link>
          </AlertDescription>
        </Alert>
      </AdminDashboard>
    )
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
            {isLoading ? (
              <Spinner size='sm' />
            ) : (
              <Link href={`/admin/repairman/${repairman?.identity}`}>
                <BreadcrumbLink>
                  <Text textStyle='bold-md'>
                    #{repairman.identity} - {repairman.name}
                  </Text>
                </BreadcrumbLink>
              </Link>
            )}
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>
      {isLoading ? (
        <Spinner size='md' />
      ) : (
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            <AccordionButton>
              <Flex justifyContent='space-between' alignItems='center' w='100%'>
                <Text textStyle='bold-md'>Thông tin kỹ thuật viên</Text>
                <AccordionIcon />
              </Flex>
            </AccordionButton>
            <AccordionPanel py={5}>
              <RepairmanDetailComponent
                repairman={repairman}
                refresh={refresh}
              />
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
                {histories.map((history: HISTORY, index: number) => (
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
  - ${new Date(history.createdAt).getFullYear()} `}
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
      )}
    </AdminDashboard>
  )
}
