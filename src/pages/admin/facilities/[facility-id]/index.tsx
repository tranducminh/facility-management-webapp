/* eslint-disable no-nested-ternary */
import {
  Box,
  Text,
  Grid,
  GridItem,
  Divider,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Button,
} from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AdminDashboard from '../../../../layouts/AdminDashboard'
import { BUILDING, EMPLOYEE, FACILITY, ROOM } from '../../../../types'
import axios from '../../../../utils/axios'

export default function FacilityDetail() {
  const router = useRouter()
  const [facility, setFacility] = useState<FACILITY>()
  const [employee, setEmployee] = useState<EMPLOYEE>()
  const [room, setRoom] = useState<ROOM>()
  const [building, setBuilding] = useState<BUILDING>()
  useEffect(() => {
    const facilityId = router.query['facility-id']
    axios
      .get(`/facilities/${facilityId}`)
      .then((response) => {
        debugger
        setFacility(response.data.facility)
        setEmployee(response.data.facility.employee)
        setRoom(response.data.facility.employee.room)
        setBuilding(response.data.facility.employee.room.floor.building)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  return (
    <AdminDashboard isFacility>
      <Flex justifyContent='space-between' alignItems='center' mb={5}>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href='/admin/facilities'>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>Thiết bị</Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link href='/admin/facilities/new'>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>
                  #{facility?.id} - {facility?.name}
                </Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
        </Breadcrumb>
        <Link href={`/admin/facilities/${facility?.id}/edit`}>
          <Button
            rightIcon={<ArrowRightIcon fontSize='xs' />}
            colorScheme='teal'
            variant='ghost'
            size='sm'>
            Chỉnh sửa thiết bị
          </Button>
        </Link>
      </Flex>
      <Box pl='5' pb='5'>
        <Box>
          <Text textStyle='bold-md'>Thông tin cán bộ bàn giao</Text>
          <Grid templateColumns='repeat(2, 1fr)' gap={9} pl='5' pt='5'>
            <GridItem colSpan={1}>
              <Grid templateColumns='repeat(3, 1fr)' gap={4}>
                <GridItem colSpan={1}>
                  <Text textStyle='bold-sm'>Tên:</Text>
                </GridItem>
                <GridItem colSpan={2}>
                  <Text>{employee?.name}</Text>
                </GridItem>
                <GridItem colSpan={1}>
                  <Text textStyle='bold-sm'>Số điện thoại:</Text>
                </GridItem>
                <GridItem colSpan={2}>
                  <Text>{employee?.phone}</Text>
                </GridItem>
                <GridItem colSpan={1}>
                  <Text textStyle='bold-sm'>Email:</Text>
                </GridItem>
                <GridItem colSpan={2}>
                  <Text>{employee?.email}</Text>
                </GridItem>
              </Grid>
            </GridItem>
            <GridItem colSpan={1}>
              <Grid templateColumns='repeat(3, 1fr)' gap={4}>
                <GridItem colSpan={1}>
                  <Text textStyle='bold-sm'>Tòa nhà:</Text>
                </GridItem>
                <GridItem colSpan={2}>
                  <Text>{building?.name}</Text>
                </GridItem>
                <GridItem colSpan={1}>
                  <Text textStyle='bold-sm'>Phòng:</Text>
                </GridItem>
                <GridItem colSpan={2}>
                  <Text>{room?.name}</Text>
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
        </Box>
        <Divider my='5' />

        {/* Facility information */}
        <Box>
          <Text textStyle='bold-md'>Thông tin thiết bị</Text>
          {facility?.facilityType?.name === 'computer' ? (
            <Grid templateColumns='repeat(2, 1fr)' gap={9} pl='5' pt='5'>
              <GridItem colSpan={1}>
                <Grid templateColumns='repeat(4, 1fr)' gap={4}>
                  <GridItem colSpan={1}>
                    <Text textStyle='bold-sm'>CPU:</Text>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Text>{facility.configuration?.cpu}</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text textStyle='bold-sm'>Main board:</Text>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Text>{facility.configuration?.mainboard}</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text textStyle='bold-sm'>Ổ cứng:</Text>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Text>{facility.configuration?.hardDrive}</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text textStyle='bold-sm'>Bộ nhớ:</Text>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Text>{facility.configuration?.ram}</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text textStyle='bold-sm'>Card màn hình:</Text>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Text>{facility.configuration?.vga}</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text textStyle='bold-sm'>Nguồn:</Text>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Text>{facility.configuration?.psu}</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text textStyle='bold-sm'>Màn hình:</Text>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Text>{facility.configuration?.monitor}</Text>
                  </GridItem>
                </Grid>
              </GridItem>
              <GridItem colSpan={1}>
                <Grid templateColumns='repeat(4, 1fr)' gap={4}>
                  <GridItem colSpan={1}>
                    <Text textStyle='bold-sm'>Bàn phím:</Text>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Text>{facility.configuration?.keyboard}</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text textStyle='bold-sm'>Chuột:</Text>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Text>{facility.configuration?.mouse}</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text textStyle='bold-sm'>Tai nghe:</Text>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Text>{facility.configuration?.headPhone}</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text textStyle='bold-sm'>Tản nhiệt:</Text>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Text>{facility.configuration?.fanCase}</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text textStyle='bold-sm'>Webcam:</Text>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Text>{facility.configuration?.webcam}</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text textStyle='bold-sm'>Đầu đọc thẻ:</Text>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Text>{facility.configuration?.cardReader}</Text>
                  </GridItem>
                </Grid>
              </GridItem>
            </Grid>
          ) : facility?.facilityType?.name === 'printer' ? (
            <Grid templateColumns='repeat(2, 1fr)' gap={9} pl='5' pt='5'>
              <GridItem colSpan={1}>
                <Grid templateColumns='repeat(4, 1fr)' gap={4}>
                  <GridItem colSpan={1}>
                    <Text textStyle='bold-sm'>Model:</Text>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Text>{facility.configuration?.model}</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text textStyle='bold-sm'>Độ phân giải:</Text>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Text>{facility.configuration?.resolution}</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text textStyle='bold-sm'>Khay giấy:</Text>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Text>{facility.configuration?.paperSize}</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text textStyle='bold-sm'>In đảo mặt:</Text>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Text>{facility.configuration?.duplexPrint}</Text>
                  </GridItem>
                </Grid>
              </GridItem>
              <GridItem colSpan={1}>
                <Grid templateColumns='repeat(4, 1fr)' gap={4}>
                  <GridItem colSpan={1}>
                    <Text textStyle='bold-sm'>Tốc độ in:</Text>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Text>{facility.configuration?.printSpeed}</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text textStyle='bold-sm'>Bộ nhớ:</Text>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Text>{facility.configuration?.ram}</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text textStyle='bold-sm'>Mực in:</Text>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Text>{facility.configuration?.printInk}</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text textStyle='bold-sm'>Cổng giao tiếp:</Text>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Text>{facility.configuration?.communication}</Text>
                  </GridItem>
                </Grid>
              </GridItem>
            </Grid>
          ) : facility?.facilityType?.name === 'fax' ? (
            <Grid templateColumns='repeat(2, 1fr)' gap={9} pl='5' pt='5'>
              <GridItem colSpan={1}>
                <Grid templateColumns='repeat(4, 1fr)' gap={4}>
                  <GridItem colSpan={1}>
                    <Text textStyle='bold-sm'>Model:</Text>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Text>{facility.configuration?.model}</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text textStyle='bold-sm'>Độ phân giải:</Text>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Text>{facility.configuration?.resolution}</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text textStyle='bold-sm'>Khay giấy:</Text>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Text>{facility.configuration?.paperSize}</Text>
                  </GridItem>
                </Grid>
              </GridItem>
              <GridItem colSpan={1}>
                <Grid templateColumns='repeat(4, 1fr)' gap={4}>
                  <GridItem colSpan={1}>
                    <Text textStyle='bold-sm'>Tốc độ fax:</Text>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Text>{facility.configuration?.faxSpeed}</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text textStyle='bold-sm'>Bộ nhớ:</Text>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Text>{facility.configuration?.ram}</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text textStyle='bold-sm'>Mực in:</Text>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Text>{facility.configuration?.printInk}</Text>
                  </GridItem>
                </Grid>
              </GridItem>
            </Grid>
          ) : facility?.facilityType?.name === 'node' ? (
            <Grid templateColumns='repeat(2, 1fr)' gap={9} pl='5' pt='5'>
              <GridItem colSpan={1}>
                <Grid templateColumns='repeat(4, 1fr)' gap={4}>
                  <GridItem colSpan={1}>
                    <Text textStyle='bold-sm'>Nút mạng:</Text>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Text>{facility.configuration?.nodeName}</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text textStyle='bold-sm'>Độ phân giải:</Text>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Text>{facility.configuration?.resolution}</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text textStyle='bold-sm'>Khay giấy:</Text>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Text>{facility.configuration?.paperSize}</Text>
                  </GridItem>
                </Grid>
              </GridItem>
              <GridItem colSpan={1}>
                <Grid templateColumns='repeat(4, 1fr)' gap={4}>
                  <GridItem colSpan={1}>
                    <Text textStyle='bold-sm'>Tốc độ fax:</Text>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Text>{facility.configuration?.faxSpeed}</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text textStyle='bold-sm'>Bộ nhớ:</Text>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Text>{facility.configuration?.ram}</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text textStyle='bold-sm'>Mực in:</Text>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Text>{facility.configuration?.printInk}</Text>
                  </GridItem>
                </Grid>
              </GridItem>
            </Grid>
          ) : null}
        </Box>
      </Box>
    </AdminDashboard>
  )
}
