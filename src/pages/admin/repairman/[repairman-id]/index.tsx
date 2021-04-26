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
  Grid,
  GridItem,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AdminDashboard from '../../../../layouts/AdminDashboard'
import { Link } from '../../../../../i18n'
import RepairmanDetailComponent from '../components/RepairmanDetail'
import HistoryItem from '../components/HistoryItem'
import axios from '../../../../utils/axios'
import { REPAIRMAN } from '../../../../types'

export default function RepairmanDetail() {
  const router = useRouter()
  const [repairman, setRepairman] = useState<REPAIRMAN>({})
  useEffect(() => {
    axios
      .get(`/repairman/${router.query['repairman-id']}`)
      .then((response) => {
        setRepairman(response.data.repairman)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
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
            <Grid templateColumns='repeat(3, 1fr)' gap={4}>
              {[...Array(18)].map((value, index) => (
                <GridItem colSpan={1}>
                  <HistoryItem />
                </GridItem>
              ))}
            </Grid>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </AdminDashboard>
  )
}
