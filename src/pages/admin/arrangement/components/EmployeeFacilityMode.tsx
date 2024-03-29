/* eslint-disable radix */
/* eslint-disable no-nested-ternary */
import { RiCommunityLine } from 'react-icons/ri'
import { SiGoogleclassroom, SiOrigin } from 'react-icons/si'
import { IoMdPricetag } from 'react-icons/io'

import {
  Box,
  Grid,
  GridItem,
  Divider,
  Flex,
  Text,
  Badge,
  Tag,
  Input,
  Select,
  useColorMode,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import axios from '../../../../utils/axios'
import { EMPLOYEE, FACILITY } from '../../../../types'
import { ReducersType } from '../../../../redux/reducers'
import { useColor } from '../../../../theme/useColorMode'
import {
  pushNotification,
  resetNotification,
} from '../../../../redux/actions/notification.action'
import { NotificationStatus } from '../../../../redux/types/notification.type'
import { setCurrentEmployee } from '../../../../redux/actions/arrangement.action'

export default function EmployeeFacilityMode() {
  const { hoverTextColor, hoverBgColor, selectBgColor } = useColor()
  const [activeEmployee, setActiveEmployee] = useState<EMPLOYEE>()
  const [employees, setEmployees] = useState<EMPLOYEE[]>([])
  const [currentEmployees, setCurrentEmployees] = useState<EMPLOYEE[]>([])
  const [facilities, setFacilities] = useState<FACILITY[]>([])
  const [currentFacilities, setCurrentFacilities] = useState<FACILITY[]>([])
  const [currentFacility, setCurrentFacility] = useState<string>('')
  const dispatch = useDispatch()
  const useTypedSelector: TypedUseSelectorHook<ReducersType> = useSelector
  const arrangement = useTypedSelector((state) => state.arrangement)
  const { colorMode } = useColorMode()

  useEffect(() => {
    if (arrangement.currentEmployeeId && employees.length > 0) {
      chooseEmployee(arrangement.currentEmployeeId)
      dispatch(setCurrentEmployee({ employeeId: undefined }))
    }
  }, [arrangement, employees])

  const refreshEmployee = () => {
    axios
      .get('/employees/all')
      .then((response) => {
        setEmployees(response.data.employees)
        setCurrentEmployees(response.data.employees)
        if (activeEmployee?.id) {
          setActiveEmployee(
            response.data.employees.filter(
              (employee: EMPLOYEE) => employee.id === activeEmployee?.id
            )[0]
          )
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const refreshFacility = () => {
    axios
      .get('/facilities/employee/null')
      .then((response) => {
        setFacilities(response.data.facilities)
        setCurrentFacilities(response.data.facilities)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  useEffect(() => {
    refreshEmployee()
    refreshFacility()
  }, [])

  const onChangeCurrentEmployee = (identity: string) => {
    setCurrentEmployees(
      employees.filter((employee) => employee.identity?.includes(identity))
    )
  }

  const onChangeCurrentFacility = (type: string) => {
    setCurrentFacilities(
      facilities.filter((facility) => {
        if (type) return facility.facilityType?.name === type
        return true
      })
    )
  }

  const chooseEmployee = (id?: number) => {
    setActiveEmployee(
      employees.filter((employee: EMPLOYEE) => employee.id === id)[0]
    )
  }

  function allowDropFacility(ev: any) {
    ev.preventDefault()
  }

  async function dragFacility(ev: any) {
    await setCurrentFacility(ev.target.id)
  }

  function dropEmployee(ev: any) {
    ev.preventDefault()
    if (
      activeEmployee?.facilities?.filter(
        (facility) => facility.id?.toString() === currentFacility
      ).length === 0
    ) {
      axios
        .put(`/facilities/${currentFacility}/owner`, {
          employeeId: activeEmployee?.id,
        })
        .then((res) => {
          refreshEmployee()
          refreshFacility()
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
  }

  function dropRevertFacility(ev: any) {
    ev.preventDefault()
    if (
      facilities?.filter(
        (facility) => facility.id?.toString() === currentFacility
      ).length === 0
    ) {
      axios
        .delete(`/facilities/${currentFacility}/owner`)
        .then((res) => {
          refreshEmployee()
          refreshFacility()
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
  }

  const generateFacilityTypeName = (facilityType?: string) => {
    switch (facilityType) {
      case 'computer':
        return 'Máy tính'
      case 'printer':
        return 'Máy in'
      case 'fax':
        return 'Máy fax'
      default:
        return null
    }
  }

  return (
    <Grid templateColumns='repeat(9, 1fr)' gap={4}>
      <GridItem colSpan={2} h='100vh' overflow='auto'>
        <Input
          placeholder='Nhập mã cán bô'
          mb='3'
          onChange={(event) => {
            onChangeCurrentEmployee(event.target.value)
          }}
        />
        {currentEmployees &&
          currentEmployees.map((employee: EMPLOYEE, index: number) => (
            <Box
              key={index}
              borderWidth='1px'
              borderRadius='lg'
              overflow='hidden'
              p='3'
              mb='5'
              _hover={{
                color: hoverTextColor,
                backgroundColor: hoverBgColor,
                borderRadius: '0.5em',
              }}
              cursor='pointer'
              onClick={() => chooseEmployee(employee.id)}
              backgroundColor={
                employee.id === activeEmployee?.id ? selectBgColor : ''
              }
              color={employee.id === activeEmployee?.id ? hoverTextColor : ''}>
              <Text textStyle='bold-sm'>#{employee.identity}</Text>
              <Text isTruncated textStyle='bold-sm'>
                {employee.name}
              </Text>
              <Divider my='2' />
              <Flex alignItems='center'>
                <RiCommunityLine />
                <Text ml='2'>{employee.unit}</Text>
              </Flex>
              <Flex alignItems='center' mt='2'>
                <SiGoogleclassroom />
                {employee.hasRoom === 'true' ? (
                  <Text ml='2'>
                    {employee?.room?.floor?.building?.name} /
                    {employee?.room?.name}
                  </Text>
                ) : (
                  <Tag
                    size='sm'
                    key='status'
                    variant='solid'
                    colorScheme='yellow'
                    ml='2'>
                    Chưa có phòng
                  </Tag>
                )}
              </Flex>
            </Box>
          ))}
      </GridItem>
      <GridItem
        colSpan={5}
        borderRadius='lg'
        backgroundColor={colorMode === 'dark' ? '#1c2531' : '#fbfbfb'}
        p='3'
        h='100vh'
        overflow='auto'>
        <div
          id='active-room'
          onDrop={(e) => dropEmployee(e)}
          onDragOver={(e) => allowDropFacility(e)}>
          <Flex justifyContent='space-between' w='100%' mb='5'>
            <Text textStyle='bold-xl'>{activeEmployee?.name}</Text>
            <Text textStyle='bold-xl'>#{activeEmployee?.identity}</Text>
          </Flex>
          <Grid templateColumns='repeat(2, 1fr)' gap={4} id='facilities'>
            {activeEmployee?.facilities &&
              activeEmployee?.facilities.map(
                (facility: FACILITY, index: number) => (
                  <GridItem
                    colSpan={1}
                    overflow='hidden'
                    draggable='true'
                    onDragStart={(e) => dragFacility(e)}
                    id={facility.id?.toString()}>
                    <Box
                      key={index}
                      borderWidth='1px'
                      borderRadius='lg'
                      overflow='hidden'
                      p='3'>
                      <Text textStyle='bold-sm'>#{facility.id}</Text>
                      <Text isTruncated textStyle='bold-sm'>
                        {facility.name}
                      </Text>
                      <Divider my='2' />
                      <Flex justifyContent='space-between' mb='2'>
                        <Badge borderRadius='full' colorScheme='teal'>
                          {generateFacilityTypeName(
                            facility.facilityType?.name
                          )}
                        </Badge>
                        {facility.status === 'ready' ? (
                          <Tag
                            size='sm'
                            key='status'
                            variant='solid'
                            colorScheme='teal'>
                            Sẵn sàng
                          </Tag>
                        ) : facility.status === 'repairing' ? (
                          <Tag
                            size='sm'
                            key='status'
                            variant='solid'
                            colorScheme='blue'>
                            Đang sửa chữa
                          </Tag>
                        ) : (
                          <Tag
                            size='sm'
                            key='status'
                            variant='solid'
                            colorScheme='red'>
                            Đang hỏng
                          </Tag>
                        )}
                      </Flex>
                      <Flex alignItems='center' mb='1'>
                        <SiOrigin />
                        <Text isTruncated ml='2'>
                          {facility.origin}
                        </Text>
                      </Flex>
                      <Flex alignItems='center'>
                        <IoMdPricetag />
                        <Text isTruncated ml='2'>
                          {facility.price}
                        </Text>
                      </Flex>
                    </Box>
                  </GridItem>
                )
              )}
          </Grid>
        </div>
      </GridItem>
      <GridItem
        colSpan={2}
        h='100vh'
        overflow='auto'
        onDrop={(e) => dropRevertFacility(e)}
        onDragOver={(e) => allowDropFacility(e)}
        id='pending-facilities'>
        <Select
          placeholder='Chọn loại thiết bị'
          onChange={(event) => {
            onChangeCurrentFacility(event.target.value)
          }}
          mb='3'>
          <option key='computer' value='computer'>
            Máy tính
          </option>
          <option key='printer' value='printer'>
            Máy in
          </option>
          <option key='fax' value='fax'>
            Máy fax
          </option>
        </Select>
        {currentFacilities &&
          currentFacilities.map((facility: FACILITY, index: number) => (
            <GridItem
              colSpan={1}
              draggable='true'
              className='student'
              overflow='hidden'
              id={`${facility.id}`}
              onDragStart={(e) => dragFacility(e)}>
              <Box
                key={index}
                borderWidth='1px'
                borderRadius='lg'
                overflow='hidden'
                p='3'
                mb='5'
                _hover={{
                  color: hoverTextColor,
                  backgroundColor: hoverBgColor,
                  borderRadius: '0.5em',
                }}
                cursor='pointer'>
                <Text textStyle='bold-sm'>#{facility.id}</Text>
                <Text isTruncated textStyle='bold-sm'>
                  {facility.name}
                </Text>
                <Divider my='2' />
                <Flex justifyContent='space-between' mb='2'>
                  {facility.facilityType?.name === 'computer' ? (
                    <Badge borderRadius='full' colorScheme='teal'>
                      Máy tính
                    </Badge>
                  ) : facility.facilityType?.name === 'printer' ? (
                    <Badge borderRadius='full' colorScheme='teal'>
                      Máy in
                    </Badge>
                  ) : facility.facilityType?.name === 'fax' ? (
                    <Badge borderRadius='full' colorScheme='teal'>
                      Máy fax
                    </Badge>
                  ) : null}
                  {facility.status === 'ready' ? (
                    <Tag
                      size='sm'
                      key='status'
                      variant='solid'
                      colorScheme='teal'>
                      Sẵn sàng
                    </Tag>
                  ) : facility.status === 'repairing' ? (
                    <Tag
                      size='sm'
                      key='status'
                      variant='solid'
                      colorScheme='yellow'>
                      Đang sửa chữa
                    </Tag>
                  ) : (
                    <Tag
                      size='sm'
                      key='status'
                      variant='solid'
                      colorScheme='red'>
                      Đang hỏng
                    </Tag>
                  )}
                </Flex>
                <Flex alignItems='center' mb='1'>
                  <SiOrigin />
                  <Text isTruncated ml='2'>
                    {facility.origin}
                  </Text>
                </Flex>
                <Flex alignItems='center'>
                  <IoMdPricetag />
                  <Text isTruncated ml='2'>
                    {facility.price}
                  </Text>
                </Flex>
              </Box>
            </GridItem>
          ))}
      </GridItem>
    </Grid>
  )
}
