import {
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  useDisclosure,
} from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Link } from '../../../../../i18n'
import AdminDashboard from '../../../../layouts/AdminDashboard'
import axios from '../../../../utils/axios'
import { BUILDING } from '../../../../types'

export default function Building() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const [building, setBuilding] = useState<BUILDING>({})
  const [newFloorName, setNewFloorName] = useState('')
  useEffect(() => {
    const buildingName = router.query['building-name'] as string
    axios
      .get(`buildings/${buildingName.split('-')[1]}`)
      .then((result) => {
        const building_ = result.data.building
        setBuilding(building_)
        debugger
        if (building_.floors.length > 0) {
          debugger
          router.push(
            `/admin/buildings/${buildingName}/floor-${building_.floors[0].name}`
          )
        }
      })
      .catch((error) => {
        console.log(error)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const createNewFloor = () => {
    axios
      .post('/floors', { name: newFloorName, buildingId: building.id })
      .then((response) => {
        const floor_ = response.data.floor
        router.push(
          `/admin/buildings/building-${building.name}/floor-${floor_.name}`
        )
      })
      .catch((error) => {
        console.log(error)
      })
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
          <BreadcrumbItem>
            <Link href='/admin/buildings/building-a1'>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>Tòa nhà {building?.name}</Text>
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
          <Text textStyle='bold-sm' mt='0.1rem'>
            Tạo tầng mới
          </Text>
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tạo tầng mới</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Tên tầng</FormLabel>
              <Input
                colorScheme='teal'
                placeholder='Tên tầng'
                onChange={(event) => setNewFloorName(event.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button size='sm' onClick={onClose} mr={3}>
              Hủy
            </Button>
            <Button size='sm' colorScheme='teal' onClick={createNewFloor}>
              Tạo mới
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </AdminDashboard>
  )
}
