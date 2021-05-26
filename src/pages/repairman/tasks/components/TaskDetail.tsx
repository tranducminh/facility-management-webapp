/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-nested-ternary */
import {
  Box,
  Text,
  Grid,
  GridItem,
  Divider,
  Textarea,
  Button,
  Flex,
  CheckboxGroup,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { EMPLOYEE, FACILITY, REQUEST } from '../../../../types'
import axios from '../../../../utils/axios'
import { NotificationStatus } from '../../../../redux/types/notification.type'
import {
  pushNotification,
  resetNotification,
} from '../../../../redux/actions/notification.action'

export default function TaskDetail({
  request = {},
  refresh,
}: {
  request?: REQUEST
  refresh: Function
}) {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenReason,
    onOpen: onOpenReason,
    onClose: onCloseReason,
  } = useDisclosure()

  const [employee, setEmployee] = useState<EMPLOYEE>({})
  const [facility, setFacility] = useState<FACILITY>({})
  const [solution, setSolution] = useState<string>('')
  const [options, setOptions] = useState<(string | number)[]>([])
  const [replacement, setReplacement] = useState<{ [name: string]: string }>({})
  const [reason, setReason] = useState<string>('')

  useEffect(() => {
    setEmployee(request.employee || {})
    setFacility(request.facility || {})
  }, [request])

  const processRequest = () => {
    axios
      .put(`/requests/${request.id}/process`)
      .then((res) => {
        dispatch(
          pushNotification({
            title: res.data.message,
            description: res.data.description,
            status: NotificationStatus.SUCCESS,
          })
        )
        dispatch(resetNotification())
        refresh()
      })
      .catch((error) => {
        dispatch(
          pushNotification({
            title: error.response.data.message,
            description: error.response.data.description,
            status: NotificationStatus.ERROR,
          })
        )
        dispatch(resetNotification())
      })
  }

  const completeRequest = () => {
    axios
      .put(`/requests/${request.id}/complete`, { solution })
      .then((res) => {
        dispatch(
          pushNotification({
            title: res.data.message,
            description: res.data.description,
            status: NotificationStatus.SUCCESS,
          })
        )
        dispatch(resetNotification())
        refresh()
      })
      .catch((error) => {
        dispatch(
          pushNotification({
            title: error.response.data.message,
            description: error.response.data.description,
            status: NotificationStatus.ERROR,
          })
        )
        dispatch(resetNotification())
      })
    options.forEach((option: string | number) => {
      const configuration = facility.configuration as { [name: string]: string }
      if (configuration[option.toString()] && replacement[option.toString()]) {
        axios
          .post('/replacements', {
            facilityId: facility.id,
            requestId: request.id,
            component: option,
            source: configuration[option.toString()],
            target: replacement[option.toString()],
          })
          .then((res) => {
            dispatch(
              pushNotification({
                title: res.data.message,
                description: res.data.description,
                status: NotificationStatus.SUCCESS,
              })
            )
            dispatch(resetNotification())
          })
          .catch((error) => {
            dispatch(
              pushNotification({
                title: error.response.data.message,
                description: error.response.data.description,
                status: NotificationStatus.ERROR,
              })
            )
            dispatch(resetNotification())
          })
      }
    })
  }

  const unCompleteRequest = () => {
    axios
      .put(`/requests/${request.id}/uncomplete`, { uncompletedReason: reason })
      .then((res) => {
        dispatch(
          pushNotification({
            title: res.data.message,
            description: res.data.description,
            status: NotificationStatus.SUCCESS,
          })
        )
        dispatch(resetNotification())
        refresh()
      })
      .catch((error) => {
        dispatch(
          pushNotification({
            title: error.response.data.message,
            description: error.response.data.description,
            status: NotificationStatus.ERROR,
          })
        )
        dispatch(resetNotification())
      })
  }

  const convertName = (name: string | number) => {
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
      {request.status === 'inprocess' ? (
        <>
          <Box>
            <Text textStyle='bold-md'>Giải pháp</Text>
            <Grid templateColumns='repeat(9, 1fr)' gap={9} pl='5' pt='5'>
              <GridItem colSpan={1}>
                <Text textStyle='bold-sm'>Mô tả: </Text>
              </GridItem>
              <GridItem colSpan={8}>
                <Textarea
                  mt='1'
                  placeholder='Giải pháp'
                  onChange={(event) => setSolution(event.target.value)}
                />
              </GridItem>
              <GridItem colSpan={1}>
                <Text textStyle='bold-sm'>Thay thế linh kiện: </Text>
              </GridItem>
              <GridItem colSpan={8}>
                <Grid templateColumns='repeat(9, 1fr)' gap={4}>
                  {options &&
                    options.map((option: string | number) => {
                      const configuration = facility.configuration as {
                        [name: string]: string
                      }
                      return (
                        <>
                          <GridItem colSpan={9}>
                            <Text textStyle='bold-sm'>
                              {convertName(option)}:
                            </Text>
                          </GridItem>
                          <GridItem colSpan={4}>
                            <Flex alignItems='center' h='100%'>
                              <Text pl='4'>
                                {configuration &&
                                  configuration[option.toString()]}
                              </Text>
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
                            <Textarea
                              name={option.toString()}
                              onChange={(event) => {
                                setReplacement({
                                  ...replacement,
                                  [event.target.name]: event.target.value,
                                })
                              }}
                            />
                          </GridItem>
                        </>
                      )
                    })}
                </Grid>
                <Button size='sm' mt='5' onClick={onOpen}>
                  Chọn linh kiện cần thay thế
                </Button>
              </GridItem>
            </Grid>
          </Box>
          <Divider my='5' />
        </>
      ) : null}
      {request.status === 'inprocess' ? (
        <>
          <Button
            size='sm'
            colorScheme='teal'
            float='right'
            onClick={completeRequest}>
            Hoàn thành
          </Button>
          <Button
            size='sm'
            colorScheme='red'
            float='right'
            mr='5'
            onClick={onOpenReason}>
            Không hoàn thành
          </Button>
        </>
      ) : (
        <>
          <Button
            size='sm'
            colorScheme='teal'
            float='right'
            onClick={processRequest}>
            Bắt đầu
          </Button>
          <Button
            size='sm'
            colorScheme='red'
            float='right'
            mr='5'
            onClick={onOpenReason}>
            Từ chối
          </Button>
        </>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chọn linh kiện cần thay thế</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CheckboxGroup
              colorScheme='green'
              value={options}
              onChange={(value: (string | number)[]) => setOptions(value)}>
              <Grid templateColumns='repeat(3, 1fr)' gap={2}>
                {facility.facilityType?.name === 'computer' ? (
                  <>
                    <GridItem colSpan={1}>
                      <Checkbox value='cpu'>CPU</Checkbox>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Checkbox value='mainBoard'>Main board</Checkbox>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Checkbox value='hardDrive'>Ổ cứng</Checkbox>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Checkbox value='ram'>Bộ nhớ</Checkbox>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Checkbox value='vga'>Card màn hình</Checkbox>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Checkbox value='psu'>Nguồn</Checkbox>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Checkbox value='monitor'>Màn hình</Checkbox>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Checkbox value='keyboard'>Bàn phím</Checkbox>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Checkbox value='mouse'>Chuột</Checkbox>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Checkbox value='headPhone'>Tai nghe</Checkbox>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Checkbox value='fanCase'>Tản nhiệt</Checkbox>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Checkbox value='cardReader'>Đầu đọc thẻ</Checkbox>
                    </GridItem>
                  </>
                ) : facility.facilityType?.name === 'printer' ? (
                  <>
                    <GridItem colSpan={1}>
                      <Checkbox value='model'>Model</Checkbox>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Checkbox value='ram'>Bộ nhớ</Checkbox>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Checkbox value='paperSize'>Khay giấy</Checkbox>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Checkbox value='printInk'>Mực in</Checkbox>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Checkbox value='communication'>Cổng giao tiếp</Checkbox>
                    </GridItem>
                  </>
                ) : facility.facilityType?.name === 'printer' ? (
                  <>
                    <GridItem colSpan={1}>
                      <Checkbox value='communication'>Cổng giao tiếp</Checkbox>
                    </GridItem>
                  </>
                ) : null}
              </Grid>
            </CheckboxGroup>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' size='sm' onClick={onClose}>
              Lưu
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenReason} onClose={onCloseReason}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Không hoàn thành nhiệm vụ</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              name='reason'
              placeholder='Lý do không hoàn thành'
              onChange={(event) => setReason(event.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' size='sm' onClick={unCompleteRequest}>
              Gửi
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
