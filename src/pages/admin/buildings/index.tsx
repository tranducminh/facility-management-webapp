import {
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Flex,
  Grid,
  FormControl,
  FormLabel,
  useDisclosure,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'
import AdminDashboard from '../../../layouts/AdminDashboard'
import { Link } from '../../../../i18n'
import BuildingItem from './components/BuildingItem'
import axios from '../../../utils/axios'
import { BUILDING, FLOOR } from '../../../types'

export default function Building() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [buildings, setBuildings] = useState<BUILDING[]>([{}])
  const [newBuildingName, setNewBuildingName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    axios
      .get('/buildings')
      .then((result) => {
        setBuildings(result.data.buildings)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const createBuilding = () => {
    setIsLoading(true)
    axios
      .post('/buildings', { name: newBuildingName })
      .then((result) => {
        const building_ = result.data.building as BUILDING
        setBuildings([...buildings, building_])
        onClose()
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }

  const calculateRoomQuantity = (floors: FLOOR[] = []): number => {
    let roomQuantity = 0
    floors.forEach((floor: FLOOR) => {
      roomQuantity += floor?.rooms?.length || 0
    })
    return roomQuantity
  }

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
        </Breadcrumb>
        <Button
          rightIcon={<ArrowRightIcon fontSize='xs' />}
          colorScheme='teal'
          variant='ghost'
          size='sm'
          onClick={onOpen}>
          <Text textStyle='bold-sm'>Tạo tòa nhà mới</Text>
        </Button>
      </Flex>
      <Grid templateColumns='repeat(5, 1fr)' gap={4}>
        {buildings.map((building, index) => (
          <BuildingItem
            key={index}
            buildingName={building.name}
            totalFloor={building?.floors?.length || 0}
            totalRoom={calculateRoomQuantity(building?.floors)}
            totalRequest={0}
          />
        ))}
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tạo tòa nhà mới</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Tên tòa nhà</FormLabel>
              <Input
                colorScheme='teal'
                placeholder='Tên tòa nhà'
                onChange={(event) => {
                  setNewBuildingName(event.target.value)
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button size='sm' onClick={onClose} mr={3}>
              Hủy
            </Button>
            <Button
              size='sm'
              colorScheme='teal'
              onClick={createBuilding}
              disabled={isLoading}>
              Tạo mới
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </AdminDashboard>
  )
}
