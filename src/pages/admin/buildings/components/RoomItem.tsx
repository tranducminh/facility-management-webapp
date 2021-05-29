/* eslint-disable @typescript-eslint/ban-types */
import {
  GridItem,
  Icon,
  Text,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Grid,
  Divider,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { SiGoogleclassroom } from 'react-icons/si'
import { GoGitPullRequest } from 'react-icons/go'
import { WarningTwoIcon } from '@chakra-ui/icons'
import { RiComputerLine } from 'react-icons/ri'
import { BiPrinter } from 'react-icons/bi'
import { FaFax } from 'react-icons/fa'
import { GiWifiRouter } from 'react-icons/gi'
import Link from 'next/link'
import { FiUsers } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { useColor } from '../../../../theme/useColorMode'
import {
  BUILDING,
  EMPLOYEE,
  FACILITY,
  FLOOR,
  REQUEST,
  ROOM,
} from '../../../../types'
import axios from '../../../../utils/axios'
import { NotificationStatus } from '../../../../redux/types/notification.type'
import {
  pushNotification,
  resetNotification,
} from '../../../../redux/actions/notification.action'

export default function RoomItem({
  room,
  building,
  floor,
  refresh,
}: {
  room: ROOM
  building: BUILDING
  floor: FLOOR
  refresh: Function
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { hoverTextColor, hoverBgColor } = useColor()
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const onRemove = () => {
    setIsLoading(true)
    axios
      .delete(`/rooms/${room.id}`)
      .then((res) => {
        setIsLoading(false)
        onClose()
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

  const calculateRequestQuantity = () => {
    let requestQuantity = 0
    room.employees?.forEach((employee: EMPLOYEE) => {
      employee.requests?.forEach((request: REQUEST) => {
        if (request.status === 'pending') {
          requestQuantity += 1
        }
      })
    })
    return requestQuantity
  }

  const calculateFacilityQuantity = (type?: string) => {
    let facilityQuantity = 0
    room.employees?.forEach((employee: EMPLOYEE) => {
      employee.facilities?.forEach((facility: FACILITY) => {
        if (facility.facilityType?.name === type) {
          facilityQuantity += 1
        }
      })
    })
    return facilityQuantity
  }

  return (
    <>
      <Popover trigger='hover' size='xl'>
        <PopoverTrigger>
          <GridItem colSpan={1} position='relative'>
            <Link
              href={`/admin/buildings/building-${building.name}/floor-${floor.name}/room-${room.name}`}>
              <Flex
                borderWidth='2px'
                borderRadius='lg'
                flexDirection='column'
                alignItems='center'
                p={4}
                cursor='pointer'
                _hover={{
                  color: hoverTextColor,
                  backgroundColor: hoverBgColor,
                  borderColor: hoverBgColor,
                }}>
                <Icon as={SiGoogleclassroom} fontSize='5xl' />
                <Text textAlign='center' textStyle='bold-md'>
                  Phòng {room.name}
                </Text>
              </Flex>
            </Link>
            {calculateRequestQuantity() > 0 ? (
              <Box position='absolute' right='3' top='3'>
                <WarningTwoIcon color='red.400' w={5} h={5} />
              </Box>
            ) : null}
          </GridItem>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader mt='2' fontWeight='bold' border='0' fontSize='16px'>
            Phòng {room.name}
          </PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton mt='2' />
          <PopoverBody>
            <Grid templateColumns='repeat(10, 1fr)' gap={2}>
              <GridItem colSpan={10}>
                <Flex alignItems='center'>
                  <Text textStyle='bold-md' mr='2'>
                    Số yêu cầu chưa xử lý:
                  </Text>
                  <Text mt='0.5' mr='2' textStyle='bold-md'>
                    {calculateRequestQuantity()}
                  </Text>
                  <Icon as={GoGitPullRequest} fontSize='1.2em' />
                </Flex>
              </GridItem>
              <GridItem colSpan={10}>
                <Flex alignItems='center'>
                  <Text textStyle='bold-md' mr='2'>
                    Số cán bộ:
                  </Text>
                  <Text mt='0.5' mr='2' textStyle='bold-md'>
                    {room.employees?.length}
                  </Text>
                  <Icon as={FiUsers} fontSize='1.2em' />
                </Flex>
              </GridItem>
              <GridItem colSpan={10}>
                <Divider />
              </GridItem>
              <GridItem colSpan={5}>
                <Flex alignItems='center'>
                  <Text textStyle='bold-sm' mr='2'>
                    Máy tính:
                  </Text>
                  <Text mt='0.5' mr='2' textStyle='bold-sm'>
                    {calculateFacilityQuantity('computer')}
                  </Text>
                  <Icon as={RiComputerLine} fontSize='1.2em' />
                </Flex>
              </GridItem>
              <GridItem colSpan={5}>
                <Flex alignItems='center'>
                  <Text textStyle='bold-sm' mr='2'>
                    Máy in:
                  </Text>
                  <Text mt='0.5' mr='2' textStyle='bold-sm'>
                    {calculateFacilityQuantity('printer')}
                  </Text>
                  <Icon as={BiPrinter} fontSize='1.2em' />
                </Flex>
              </GridItem>
              <GridItem colSpan={5}>
                <Flex alignItems='center'>
                  <Text textStyle='bold-sm' mr='2'>
                    Máy fax:
                  </Text>
                  <Text mt='0.5' mr='2' textStyle='bold-sm'>
                    {calculateFacilityQuantity('fax')}
                  </Text>
                  <Icon as={FaFax} fontSize='1.2em' />
                </Flex>
              </GridItem>
              <GridItem colSpan={5}>
                <Flex alignItems='center'>
                  <Text textStyle='bold-sm' mr='2'>
                    Nút mạng:
                  </Text>
                  <Text mt='0.5' mr='2' textStyle='bold-sm'>
                    {calculateFacilityQuantity('node')}
                  </Text>
                  <Icon as={GiWifiRouter} fontSize='1.2em' />
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
            {calculateRequestQuantity() > 0 ? (
              <Button size='xs' colorScheme='yellow' mr='3'>
                Xử lý yêu cầu
              </Button>
            ) : null}
            <Button size='xs' colorScheme='red' onClick={onOpen} mr='3'>
              Xóa phòng
            </Button>
            <Link
              href={`/admin/buildings/building-${building.name}/floor-${floor.name}/room-${room.name}`}>
              <Button size='xs' colorScheme='green'>
                Chi tiết
              </Button>
            </Link>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
      <Modal
        onClose={onClose}
        size='sm'
        isCentered
        colorScheme='teal'
        isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Xóa phòng {room.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Các cán bộ trực thuộc phòng sẽ trở về phòng chờ</ModalBody>
          <ModalFooter>
            <Button size='sm' onClick={onClose} mr='3'>
              Hủy
            </Button>
            <Button
              size='sm'
              colorScheme='teal'
              onClick={onRemove}
              isLoading={isLoading}>
              Đồng ý
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
