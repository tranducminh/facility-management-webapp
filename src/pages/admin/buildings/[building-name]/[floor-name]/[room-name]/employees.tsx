import {
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  Flex,
  Button,
  GridItem,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import Link from 'next/link'
import AdminDashboard from '../../../../../../layouts/AdminDashboard'
import EmployeeItem from '../../../components/EmployeeItem'
import axios from '../../../../../../utils/axios'
import { BUILDING, EMPLOYEE, FLOOR, ROOM } from '../../../../../../types'

export default function Room() {
  const [floor, setFloor] = useState<FLOOR>({})
  const [building, setBuilding] = useState<BUILDING>({})
  const [room, setRoom] = useState<ROOM>({})
  const [employees, setEmployees] = useState<EMPLOYEE[]>([])
  const router = useRouter()

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
      .then((response) => {
        setBuilding(response.data.room.floor.building)
        setFloor(response.data.room.floor)
        setEmployees(response.data.room.employees)
        setRoom(response.data.room)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    refreshData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AdminDashboard
      isBuilding
      title={`Nhân viên | Phòng ${building?.name}/${room?.name}`}>
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
                <Text textStyle='bold-sm'>Cán bộ</Text>
              </MenuButton>
              <MenuList>
                <MenuItemOption value='user'>
                  <Text textStyle='bold-sm'>Cán bộ</Text>
                </MenuItemOption>
                <MenuItemOption
                  value='facility'
                  onClick={() => {
                    router.push(
                      `/admin/buildings/building-${building.name}/floor-${floor.name}/room-${room.name}`
                    )
                  }}>
                  <Text textStyle='bold-sm'>Thiết bị</Text>
                </MenuItemOption>
              </MenuList>
            </Menu>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>
      <Grid templateColumns='repeat(3, 1fr)' gap={4}>
        {employees.map((employee: EMPLOYEE, index: number) => (
          <GridItem colSpan={1} kry={index}>
            <EmployeeItem employee={employee} />
          </GridItem>
        ))}
      </Grid>
    </AdminDashboard>
  )
}
