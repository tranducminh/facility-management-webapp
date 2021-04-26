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
} from '@chakra-ui/react'
import { BsBuilding } from 'react-icons/bs'
import { SiGoogleclassroom } from 'react-icons/si'
import { GoGitPullRequest } from 'react-icons/go'
import { useColor } from '../../../../theme/useColorMode'
import { Link } from '../../../../../i18n'

export default function BuildingItem({
  buildingName,
  totalRequest = 0,
  totalRoom = 0,
  totalFloor = 0,
}: {
  buildingName?: string
  totalRequest?: number
  totalRoom?: number
  totalFloor?: number
}) {
  const { hoverTextColor, hoverBgColor } = useColor()

  return (
    <Popover trigger='hover' size='xl'>
      <PopoverTrigger>
        <GridItem colSpan={1}>
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
                  Số yêu cầu:
                </Text>
                <Text mt='0.5' mr='2' textStyle='bold-md'>
                  {totalRequest}
                </Text>
                <Icon as={GoGitPullRequest} fontSize='1.2em' />
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
          </Grid>
        </PopoverBody>
        <PopoverFooter
          border='0'
          d='flex'
          alignItems='center'
          justifyContent='flex-end'
          pb={4}>
          <Link href={`/admin/buildings/building-${buildingName}`}>
            <Button size='xs' colorScheme='green'>
              Chi tiết
            </Button>
          </Link>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}
