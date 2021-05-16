/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-nested-ternary */
import { Box, Text, Grid, GridItem, Divider, Flex } from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'
import {
  EMPLOYEE,
  FACILITY,
  HISTORY,
  REPLACEMENT,
  REQUEST,
} from '../../../../types'

export default function TaskDetail({ history = {} }: { history?: HISTORY }) {
  const [employee, setEmployee] = useState<EMPLOYEE>({})
  const [facility, setFacility] = useState<FACILITY>({})
  const [request, setRequest] = useState<REQUEST>({})

  useEffect(() => {
    setRequest(history?.request || {})
    setEmployee(history.request?.employee || {})
    setFacility(history.request?.facility || {})
  }, [history])

  const convertName = (name?: string) => {
    switch (name) {
      case 'cpu':
        return 'CPU'
      case 'mainboard':
        return 'Main board'
      case 'hardDrive':
        return 'Ổ cứng'
      case 'ram':
        return 'Bộ nhớ'
      case 'vga':
        return 'Card màn hình'
      case 'psu':
        return 'Nguồn'
      case 'monitor':
        return 'Màn hình'
      case 'keyboard':
        return 'Bàn phím'
      case 'mouse':
        return 'Chuột'
      case 'headPhone':
        return 'Tai nghe'
      case 'fanCase':
        return 'Tản nhiệt'
      case 'webcam':
        return 'Webcam'
      case 'cardReader':
        return 'Đầu đọc thẻ'
      case 'model':
        return 'Model'
      case 'paperSize':
        return 'Khay giấy'
      case 'printInk':
        return 'Mực in'
      case 'communication':
        return 'Cổng giao tiếp'
      default:
        break
    }
  }

  return (
    <Box pl='5' pb='5'>
      <Box>
        <Text textStyle='bold-md'>Thông tin cán bộ yêu cầu</Text>
        <Grid templateColumns='repeat(2, 1fr)' gap={9} pl='5' pt='5'>
          <GridItem colSpan={1}>
            <Grid templateColumns='repeat(3, 1fr)' gap={4}>
              <GridItem colSpan={1}>
                <Text textStyle='bold-sm'>Tên cán bộ:</Text>
              </GridItem>
              <GridItem colSpan={2}>
                <Text>{employee.name}</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Text textStyle='bold-sm'>Số điện thoại:</Text>
              </GridItem>
              <GridItem colSpan={2}>
                <Text>{employee.phone}</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Text textStyle='bold-sm'>Email:</Text>
              </GridItem>
              <GridItem colSpan={2}>
                <Text>{employee.email}</Text>
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem colSpan={1}>
            <Grid templateColumns='repeat(3, 1fr)' gap={4}>
              <GridItem colSpan={1}>
                <Text textStyle='bold-sm'>Tòa nhà:</Text>
              </GridItem>
              <GridItem colSpan={2}>
                <Text>{employee.room?.floor?.building?.name}</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Text textStyle='bold-sm'>Phòng:</Text>
              </GridItem>
              <GridItem colSpan={2}>
                <Text>{employee.room?.name}</Text>
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
                  <Text textStyle='bold-sm'>VGA:</Text>
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
      <Divider my='5' />

      <Box>
        <Text textStyle='bold-md'>Vấn đề</Text>
        <Grid templateColumns='repeat(9, 1fr)' gap={9} pl='5' pt='5'>
          <GridItem colSpan={1}>
            <Text textStyle='bold-sm'>Mô tả: </Text>
          </GridItem>
          <GridItem colSpan={8}>
            <Text>{request.problem}</Text>
          </GridItem>
        </Grid>
      </Box>
      <Divider my='5' />
      {history.status === 'completed' ? (
        <>
          <Box>
            <Text textStyle='bold-md'>Giải pháp</Text>
            <Grid templateColumns='repeat(9, 1fr)' gap={9} pl='5' pt='5'>
              <GridItem colSpan={1}>
                <Text textStyle='bold-sm'>Mô tả: </Text>
              </GridItem>
              <GridItem colSpan={8}>
                <Text textStyle='bold-sm'>{request.solution}</Text>
              </GridItem>
              <GridItem colSpan={9}>
                <Text textStyle='bold-sm' mb='5'>
                  Thay thế linh kiện:
                </Text>
                <Grid templateColumns='repeat(9, 1fr)' gap={4} pl='10'>
                  {request.replacements &&
                    request.replacements.map((replacement: REPLACEMENT) => (
                      <>
                        <GridItem colSpan={9}>
                          <Text textStyle='bold-sm'>
                            {convertName(replacement.component)}:
                          </Text>
                        </GridItem>
                        <GridItem colSpan={4}>
                          <Flex alignItems='center' h='100%'>
                            <Text pl='10'>{replacement.source}</Text>
                          </Flex>
                        </GridItem>
                        <GridItem colSpan={1}>
                          <Flex
                            justifyContent='center'
                            alignItems='center'
                            h='100%'>
                            <ArrowRightIcon w={3} h={3} />
                          </Flex>
                        </GridItem>
                        <GridItem colSpan={4}>
                          <Flex alignItems='center' h='100%'>
                            <Text>{replacement.target}</Text>
                          </Flex>
                        </GridItem>
                      </>
                    ))}
                </Grid>
              </GridItem>
            </Grid>
          </Box>
        </>
      ) : (
        <Box>
          <Text textStyle='bold-md'>Lý do không hoàn thành:</Text>
          <Grid templateColumns='repeat(9, 1fr)' gap={9} pl='5' pt='5'>
            <GridItem colSpan={1}>
              <Text textStyle='bold-sm'>Mô tả: </Text>
            </GridItem>
            <GridItem colSpan={8}>
              <Text>{history.uncompletedReason}</Text>
            </GridItem>
          </Grid>
        </Box>
      )}
    </Box>
  )
}
