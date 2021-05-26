/* eslint-disable @typescript-eslint/ban-types */
import { SiGoogleclassroom } from 'react-icons/si'
import { GoGitPullRequest } from 'react-icons/go'
import { FiUsers } from 'react-icons/fi'
import { BsTools } from 'react-icons/bs'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Text,
  Grid,
  GridItem,
  Flex,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { BUILDING, FLOOR, ROOM, EMPLOYEE, REQUEST } from '../../../../types'
import { useColor } from '../../../../theme/useColorMode'
import axios from '../../../../utils/axios'
import { NotificationStatus } from '../../../../redux/types/notification.type'
import {
  pushNotification,
  resetNotification,
} from '../../../../redux/actions/notification.action'

export default function FloorItem({
  building,
  floor,
  currentFloor,
  refresh,
}: {
  building: BUILDING
  floor: FLOOR
  currentFloor: FLOOR
  refresh: Function
}) {
  const { hoverTextColor, hoverBgColor, selectBgColor } = useColor()
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const {
    isOpen: isOpenRemoveFloor,
    onOpen: onOpenRemoveFloor,
    onClose: onCloseRemoveFloor,
  } = useDisclosure()
  const onRemove = (floorId?: number) => {
    setIsLoading(true)
    axios
      .delete(`/floors/${floorId}`)
      .then((res) => {
        setIsLoading(false)
        onCloseRemoveFloor()
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
  const calculateRequestQuantity = (floor_: FLOOR): number => {
    let requestQuantity = 0
    floor_.rooms?.forEach((room_: ROOM) => {
      room_.employees?.forEach((employee: EMPLOYEE) => {
        employee.requests?.forEach((request: REQUEST) => {
          if (request.status === 'pending') {
            requestQuantity += 1
          }
        })
      })
    })
    return requestQuantity
  }

  const calculateFacilityQuantity = (floor_: FLOOR): number => {
    let facilityQuantity = 0
    floor_.rooms?.forEach((room_: ROOM) => {
      room_.employees?.forEach((employee: EMPLOYEE) => {
        facilityQuantity += employee.facilities?.length || 0
      })
    })
    return facilityQuantity
  }

  const calculateEmployeeQuantity = (floor_: FLOOR): number => {
    let employeeQuantity = 0
    floor_.rooms?.forEach((room_: ROOM) => {
      employeeQuantity += room_.employees?.length || 0
    })
    return employeeQuantity
  }
  return (
    <>
      <Popover trigger='hover' size='xl'>
        <PopoverTrigger>
          <Box>
            <Link
              href={`/admin/buildings/building-${building?.name}/floor-${floor.name}`}
              replace>
              <Box
                p={1.5}
                mb={4}
                cursor='pointer'
                color={currentFloor.id === floor.id ? hoverTextColor : ''}
                backgroundColor={
                  currentFloor.id === floor.id ? selectBgColor : ''
                }
                borderRadius='0.5em'
                _hover={{
                  color: hoverTextColor,
                  backgroundColor: hoverBgColor,
                  borderRadius: '0.5em',
                }}>
                <Text textAlign='center' textStyle='bold-sm'>
                  Tầng {floor.name}
                </Text>
              </Box>
            </Link>
          </Box>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader mt='2' fontWeight='bold' border='0'>
            Tầng {floor.name}
          </PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton mt='2' />
          <PopoverBody>
            <Grid templateColumns='repeat(10, 1fr)' gap={2}>
              <GridItem colSpan={5}>
                <Flex alignItems='center'>
                  <Text textStyle='bold-md' mr='2'>
                    Số phòng:
                  </Text>
                  <Text mt='0.5' mr='2' textStyle='bold-md'>
                    {floor.rooms?.length || 0}
                  </Text>
                  <Icon as={SiGoogleclassroom} fontSize='1.2em' />
                </Flex>
              </GridItem>
              <GridItem colSpan={5}>
                <Flex alignItems='center'>
                  <Text textStyle='bold-md' mr='2'>
                    Số cán bộ:
                  </Text>
                  <Text mt='0.5' mr='2' textStyle='bold-md'>
                    {calculateEmployeeQuantity(floor)}
                  </Text>
                  <Icon as={FiUsers} fontSize='1.2em' />
                </Flex>
              </GridItem>
              <GridItem colSpan={5}>
                <Flex alignItems='center'>
                  <Text textStyle='bold-md' mr='2'>
                    Số thiết bị:
                  </Text>
                  <Text mt='0.5' mr='2' textStyle='bold-md'>
                    {calculateFacilityQuantity(floor)}
                  </Text>
                  <Icon as={BsTools} fontSize='1.2em' />
                </Flex>
              </GridItem>
              <GridItem colSpan={10}>
                <Flex alignItems='center'>
                  <Text textStyle='bold-md' mr='2'>
                    Số yêu cầu chưa xử lý:
                  </Text>
                  <Text mt='0.5' mr='2' textStyle='bold-md'>
                    {calculateRequestQuantity(floor)}
                  </Text>
                  <Icon as={GoGitPullRequest} fontSize='1.2em' />
                </Flex>
              </GridItem>
            </Grid>
          </PopoverBody>
          <PopoverFooter
            border='0'
            d='flex'
            alignItems='center'
            justifyContent='flex-end'
            pb={4}>
            {calculateRequestQuantity(floor) > 0 ? (
              <Link href='/admin/requests?type=pending'>
                <Button size='xs' colorScheme='yellow' mr='3'>
                  Xử lý yêu cầu
                </Button>
              </Link>
            ) : null}
            <Button
              size='xs'
              colorScheme='red'
              onClick={onOpenRemoveFloor}
              mr='3'>
              Xóa tòa nhà
            </Button>
            <Link
              href={`/admin/buildings/building-${building?.name}/floor-${floor.name}`}>
              <Button size='xs' colorScheme='green'>
                Chi tiết
              </Button>
            </Link>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
      <Modal
        onClose={onCloseRemoveFloor}
        size='sm'
        isCentered
        colorScheme='teal'
        isOpen={isOpenRemoveFloor}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Xóa tầng {floor.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Các cán bộ trực thuộc tầng sẽ trở về phòng chờ</ModalBody>
          <ModalFooter>
            <Button size='sm' onClick={onCloseRemoveFloor} mr='3'>
              Hủy
            </Button>
            <Button
              size='sm'
              colorScheme='teal'
              onClick={() => onRemove(floor.id)}
              isLoading={isLoading}>
              Đồng ý
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
