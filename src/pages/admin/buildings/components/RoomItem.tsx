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
  Tag,
} from '@chakra-ui/react'
import { BsBuilding } from 'react-icons/bs'
import { RiComputerLine } from 'react-icons/ri'
import { BiPrinter } from 'react-icons/bi'
import { FcIpad } from 'react-icons/fc'
import { GiWifiRouter } from 'react-icons/gi'
import { useColor } from '../../../../theme/useColorMode'
import { Link } from '../../../../../i18n'
import { BUILDING, FLOOR } from '../../../../types'

export default function RoomItem({
  roomName,
  building,
  floor,
}: {
  roomName?: string
  building: BUILDING
  floor: FLOOR
}) {
  const { hoverTextColor, hoverBgColor } = useColor()

  return (
    <Popover trigger='hover' size='xl'>
      <PopoverTrigger>
        <GridItem colSpan={1}>
          <Link
            href={`/admin/buildings/building-${building.name}/floor-${floor.name}/room-${roomName}`}>
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
                Phòng {roomName}
              </Text>
            </Flex>
          </Link>
        </GridItem>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader mt='2' fontWeight='bold' border='0' fontSize='16px'>
          Phòng {roomName}
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton mt='2' />
        <PopoverBody>
          <Grid templateColumns='repeat(10, 1fr)' gap={2}>
            <GridItem colSpan={10}>
              <Flex alignItems='center'>
                <Text textStyle='bold-sm' mr='2'>
                  Yêu cầu:
                </Text>
                <Text mt='0.5' mr='1' textStyle='bold-sm'>
                  20
                </Text>
                <Tag colorScheme='red' size='sm' mr='5'>
                  Mới
                </Tag>
                <Text mt='0.5' mr='1' textStyle='bold-sm'>
                  10
                </Text>
                <Tag colorScheme='yellow' size='sm'>
                  Đang xử lý
                </Tag>
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
                  20
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
                  5
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
                  5
                </Text>
                <Icon as={FcIpad} fontSize='1.2em' />
              </Flex>
            </GridItem>
            <GridItem colSpan={5}>
              <Flex alignItems='center'>
                <Text textStyle='bold-sm' mr='2'>
                  Nút mạng:
                </Text>
                <Text mt='0.5' mr='2' textStyle='bold-sm'>
                  5
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
          <Link href='/admin/buildings/building-a1/room-101'>
            <Button size='xs' colorScheme='green'>
              Chi tiết
            </Button>
          </Link>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}
