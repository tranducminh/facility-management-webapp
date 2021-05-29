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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
} from '@chakra-ui/react'
import { WarningTwoIcon } from '@chakra-ui/icons'
import { BsBuilding } from 'react-icons/bs'
import { SiGoogleclassroom } from 'react-icons/si'
import { GoGitPullRequest } from 'react-icons/go'
import { FiUsers } from 'react-icons/fi'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { useColor } from '../../../../theme/useColorMode'
import axios from '../../../../utils/axios'
import { NotificationStatus } from '../../../../redux/types/notification.type'
import {
  pushNotification,
  resetNotification,
} from '../../../../redux/actions/notification.action'

export default function BuildingItem({
  buildingId,
  buildingName,
  totalRequest = 0,
  totalRoom = 0,
  totalFloor = 0,
  totalEmployee = 0,
  refresh,
}: {
  buildingId?: number
  buildingName?: string
  totalRequest?: number
  totalRoom?: number
  totalFloor?: number
  totalEmployee?: number
  refresh: Function
}) {
  const { hoverTextColor, hoverBgColor } = useColor()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const onRemove = () => {
    setIsLoading(true)
    axios
      .delete(`/buildings/${buildingId}`)
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
  return (
    <>
      <Popover trigger='hover' size='xl'>
        <PopoverTrigger>
          <GridItem colSpan={1} position='relative'>
            <Link href={`/admin/buildings/building-${buildingName}`}>
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
                <Icon as={BsBuilding} fontSize='5xl' />
                <Text textAlign='center' textStyle='bold-md'>
                  Tòa nhà {buildingName}
                </Text>
              </Flex>
            </Link>
            {totalRequest > 0 ? (
              <Box position='absolute' right='3' top='3'>
                <WarningTwoIcon color='red.400' w={5} h={5} />
              </Box>
            ) : null}
          </GridItem>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader mt='2' fontWeight='bold' border='0'>
            Tòa nhà {buildingName}
          </PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton mt='2' />
          <PopoverBody>
            <Grid templateColumns='repeat(10, 1fr)' gap={2}>
              <GridItem colSpan={5}>
                <Flex alignItems='center'>
                  <Text textStyle='bold-md' mr='2'>
                    Số tầng:
                  </Text>
                  <Text mt='0.5' mr='2' textStyle='bold-md'>
                    {totalFloor}
                  </Text>
                  <Icon as={SiGoogleclassroom} fontSize='1.2em' />
                </Flex>
              </GridItem>
              <GridItem colSpan={5}>
                <Flex alignItems='center'>
                  <Text textStyle='bold-md' mr='2'>
                    Số phòng:
                  </Text>
                  <Text mt='0.5' mr='2' textStyle='bold-md'>
                    {totalRoom}
                  </Text>
                  <Icon as={SiGoogleclassroom} fontSize='1.2em' />
                </Flex>
              </GridItem>
              <GridItem colSpan={10}>
                <Flex alignItems='center'>
                  <Text textStyle='bold-md' mr='2'>
                    Số cán bộ:
                  </Text>
                  <Text mt='0.5' mr='2' textStyle='bold-md'>
                    {totalEmployee}
                  </Text>
                  <Icon as={FiUsers} fontSize='1.2em' />
                </Flex>
              </GridItem>
              <GridItem colSpan={10}>
                <Flex alignItems='center'>
                  <Text textStyle='bold-md' mr='2'>
                    Số yêu cầu chưa xử lý:
                  </Text>
                  <Text mt='0.5' mr='2' textStyle='bold-md'>
                    {totalRequest}
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
            {totalRequest > 0 ? (
              <Link href='/admin/requests?type=pending'>
                <Button size='xs' colorScheme='yellow' mr='3'>
                  Xử lý yêu cầu
                </Button>
              </Link>
            ) : null}
            <Button size='xs' colorScheme='red' onClick={onOpen} mr='3'>
              Xóa tòa nhà
            </Button>
            <Link href={`/admin/buildings/building-${buildingName}`}>
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
          <ModalHeader>Xóa tòa nhà {buildingName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Các cán bộ trực thuộc tòa nhà sẽ trở về phòng chờ
          </ModalBody>
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
