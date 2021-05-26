import {
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  Flex,
  Box,
  Button,
  GridItem,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { ChevronDownIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { Link } from '../../../../../../../i18n'
import AdminDashboard from '../../../../../../layouts/AdminDashboard'
import { useColor } from '../../../../../../theme/useColorMode'
import FacilityList from '../../../components/FacilityList'
import axios from '../../../../../../utils/axios'
import {
  BUILDING,
  EMPLOYEE,
  FACILITY,
  FLOOR,
  ROOM,
} from '../../../../../../types'
import { setCurrentRoom } from '../../../../../../redux/actions/arrangement.action'

export default function Room() {
  const [groupByText, setGroupByText] = useState('Cán bộ')
  const [groupBy, setGroupBy] = useState('user')
  const { hoverTextColor, hoverBgColor, selectBgColor } = useColor()
  const [floor, setFloor] = useState<FLOOR>({})
  const [building, setBuilding] = useState<BUILDING>({})
  const [room, setRoom] = useState<ROOM>({})
  const [employees, setEmployees] = useState<EMPLOYEE[]>([])
  const router = useRouter()

  const [currentEmployee, setCurrentEmployee] = useState<EMPLOYEE>({})
  const [currentFacilityType, setCurrentFacilityType] = useState<string>(
    'computer'
  )
  const [
    currentFacilityTypeText,
    setCurrentFacilityTypeText,
  ] = useState<string>('Máy tính')
  const [currentFacilities, setCurrentFacilities] = useState<
    FACILITY[] | undefined
  >([])

  const dispatch = useDispatch()
  const handoverFacility = () => {
    dispatch(setCurrentRoom({ roomId: room?.id }))
    router.push('/admin/arrangement')
  }

  const refreshData = () => {
    const buildingName = router.query['building-name'] as string
    const floorName = router.query['floor-name'] as string
    const roomName = router.query['room-name'] as string
    axios
      .get(
        // eslint-disable-next-line prettier/prettier
        `/buildings/${buildingName.split('-')[1]}/floors/${floorName.split('-')[1]
        }/rooms/${roomName.split('-')[1]}`
      )
      .then((res) => {
        setBuilding(res.data.room.floor.building)
        setFloor(res.data.room.floor)
        setEmployees(res.data.room.employees)
        setRoom(res.data.room)
        setCurrentEmployee(res.data.room.employees[0] || {})
        setCurrentFacilities(res.data.room.employees[0]?.facilities)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const onChangeEmployee = (id?: number) => {
    const employee_ = employees.filter((item: EMPLOYEE) => item.id === id)[0]
    setCurrentEmployee(employee_)
    setCurrentFacilities(employee_?.facilities)
  }

  useEffect(() => {
    refreshData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (groupBy === 'facility') {
      switch (currentFacilityType) {
        case 'computer':
          setCurrentFacilityTypeText('Máy tính')
          break
        case 'printer':
          setCurrentFacilityTypeText('Máy in')
          break
        case 'fax':
          setCurrentFacilityTypeText('Máy fax')
          break
        case 'node':
          setCurrentFacilityTypeText('Nút mạng')
          break
        default:
          break
      }
      axios
        .get(`/facilities?room_id=${room.id}&type=${currentFacilityType}`)
        .then((response) => {
          setCurrentFacilities(response.data.facilities)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [currentFacilityType])

  return (
    <AdminDashboard isBuilding>
      <Flex justifyContent='space-between' alignItems='center' mb={5}>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href='/admin/buildings'>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>Tòa nhà</Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link href={`/admin/buildings/building-${building.name}`}>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>Tòa nhà {building.name}</Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link
              href={`/admin/buildings/building-${building.name}/floor-${floor.name}`}>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>Tầng {floor.name}</Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link
              href={`/admin/buildings/building-${building.name}/floor-${floor.name}/room-${room.name}`}>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>Phòng {room.name}</Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Menu variant='ghost'>
              <MenuButton size='sm' as={Button} rightIcon={<ChevronDownIcon />}>
                <Text textStyle='bold-sm'>Thiết bị</Text>
              </MenuButton>
              <MenuList>
                <MenuItemOption
                  value='user'
                  onClick={() => {
                    router.push(
                      `/admin/buildings/building-${building.name}/floor-${floor.name}/room-${room.name}/employees`
                    )
                  }}>
                  <Text textStyle='bold-sm'>Cán bộ</Text>
                </MenuItemOption>
                <MenuItemOption value='facility'>
                  <Text textStyle='bold-sm'>Thiết bị</Text>
                </MenuItemOption>
              </MenuList>
            </Menu>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent='flex-start' alignItems='center'>
          <Text textStyle='bold-sm' mr='3'>
            Sắp xếp theo:
          </Text>
          <Menu>
            <MenuButton size='sm' as={Button} rightIcon={<ChevronDownIcon />}>
              <Text textStyle='bold-sm'>{groupByText}</Text>
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                defaultValue='user'
                title='Sắp xếp theo'
                type='radio'
                onChange={(value) => setGroupBy(value.toString())}>
                <MenuItemOption
                  value='user'
                  onClick={() => setGroupByText('Cán bộ')}>
                  <Text textStyle='bold-sm'>Cán bộ</Text>
                </MenuItemOption>
                <MenuItemOption
                  value='facility'
                  onClick={() => setGroupByText('Thiết bị')}>
                  <Text textStyle='bold-sm'>Thiết bị</Text>
                </MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      <Grid templateColumns='repeat(15, 1fr)' gap={4}>
        <GridItem colSpan={groupBy === 'user' ? 12 : 13}>
          {currentEmployee?.id ? (
            <>
              <Text textStyle='bold-md' mb='5'>
                {groupBy === 'user'
                  ? `#${currentEmployee.identity} - ${currentEmployee.name}`
                  : currentFacilityTypeText}
              </Text>
              <FacilityList
                employee={currentEmployee}
                facilities={currentFacilities}
              />
            </>
          ) : (
            <Alert
              status='info'
              variant='subtle'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
              textAlign='center'
              height='200px'>
              <AlertIcon boxSize='40px' mr={0} />
              <AlertTitle mt={4} mb={1} fontSize='lg'>
                Phòng {room.name} chưa có cán bộ nào
              </AlertTitle>
              <AlertDescription maxWidth='sm'>
                <Button
                  rightIcon={<ArrowRightIcon fontSize='xs' />}
                  colorScheme='teal'
                  variant='ghost'
                  size='sm'
                  onClick={handoverFacility}
                  mt='5'>
                  <Text textStyle='bold-sm' mt='0.1rem'>
                    Phân bổ cán bộ ngay
                  </Text>
                </Button>
              </AlertDescription>
            </Alert>
          )}
        </GridItem>
        {groupBy === 'user' ? (
          <GridItem
            colSpan={3}
            pl='1em'
            borderLeftWidth='1px'
            borderLeftColor='gray.100'
            overflow='auto'
            maxH='80vh'
            className='scrollbar'>
            {employees.map((item: EMPLOYEE, index: number) => (
              <Box
                key={index}
                p={2}
                mb={4}
                cursor='pointer'
                color={item.id === currentEmployee.id ? hoverTextColor : ''}
                backgroundColor={
                  item.id === currentEmployee.id ? selectBgColor : ''
                }
                borderRadius='0.5em'
                _hover={{
                  color: hoverTextColor,
                  backgroundColor: hoverBgColor,
                  borderRadius: '0.5em',
                }}
                onClick={() => onChangeEmployee(item.id)}>
                <Text textAlign='center' textStyle='bold-sm' noOfLines={1}>
                  {item.name}
                </Text>
              </Box>
            ))}
          </GridItem>
        ) : (
          <GridItem
            colSpan={2}
            pl='1em'
            borderLeftWidth='1px'
            borderLeftColor='gray.100'
            overflow='auto'
            maxH='80vh'
            className='scrollbar'>
            <Box
              p={2}
              mb={4}
              cursor='pointer'
              color={currentFacilityType === 'computer' ? hoverTextColor : ''}
              backgroundColor={
                currentFacilityType === 'computer' ? selectBgColor : ''
              }
              borderRadius='0.5em'
              _hover={{
                color: hoverTextColor,
                backgroundColor: hoverBgColor,
                borderRadius: '0.5em',
              }}
              onClick={() => setCurrentFacilityType('computer')}>
              <Text textAlign='center' textStyle='bold-sm' noOfLines={1}>
                Máy tính
              </Text>
            </Box>
            <Box
              p={2}
              mb={4}
              cursor='pointer'
              color={currentFacilityType === 'printer' ? hoverTextColor : ''}
              backgroundColor={
                currentFacilityType === 'printer' ? selectBgColor : ''
              }
              borderRadius='0.5em'
              _hover={{
                color: hoverTextColor,
                backgroundColor: hoverBgColor,
                borderRadius: '0.5em',
              }}
              onClick={() => setCurrentFacilityType('printer')}>
              <Text textAlign='center' textStyle='bold-sm' noOfLines={1}>
                Máy in
              </Text>
            </Box>
            <Box
              p={2}
              mb={4}
              cursor='pointer'
              color={currentFacilityType === 'fax' ? hoverTextColor : ''}
              backgroundColor={
                currentFacilityType === 'fax' ? selectBgColor : ''
              }
              borderRadius='0.5em'
              _hover={{
                color: hoverTextColor,
                backgroundColor: hoverBgColor,
                borderRadius: '0.5em',
              }}
              onClick={() => setCurrentFacilityType('fax')}>
              <Text textAlign='center' textStyle='bold-sm' noOfLines={1}>
                Máy fax
              </Text>
            </Box>
            <Box
              p={2}
              mb={4}
              cursor='pointer'
              color={currentFacilityType === 'node' ? hoverTextColor : ''}
              backgroundColor={
                currentFacilityType === 'node' ? selectBgColor : ''
              }
              borderRadius='0.5em'
              _hover={{
                color: hoverTextColor,
                backgroundColor: hoverBgColor,
                borderRadius: '0.5em',
              }}
              onClick={() => setCurrentFacilityType('node')}>
              <Text textAlign='center' textStyle='bold-sm' noOfLines={1}>
                Nút mạng
              </Text>
            </Box>
          </GridItem>
        )}
      </Grid>
    </AdminDashboard>
  )
}
