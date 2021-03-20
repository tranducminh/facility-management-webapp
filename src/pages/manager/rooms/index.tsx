import React from 'react'
import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  Spacer,
  InputGroup,
  InputLeftElement,
  Input,
  Grid,
  GridItem,
  Tooltip,
  Icon,
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { SiGoogleclassroom } from 'react-icons/si'
import ManagerDashboard from '../../../layouts/ManagerDashboard'
import { Link } from '../../../../i18n'
import { useColor } from '../../../theme/useColorMode'

export default function Rooms() {
  const { hoverTextColor, hoverBgColor } = useColor()
  return (
    <ManagerDashboard isRoom>
      <Flex mb={5} alignItems='center'>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href='/manager/rooms'>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>Rooms</Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
        </Breadcrumb>
        <Spacer />
        <InputGroup maxW='30%'>
          <InputLeftElement pointerEvents='none'>
            <Search2Icon color='gray.300' />
          </InputLeftElement>
          <Input type='text' placeholder='Search room or building' />
        </InputGroup>
      </Flex>
      <Grid templateColumns='repeat(5, 1fr)' gap={4}>
        {[...Array(20)].map((value, index) => (
          <Link href='/manager/rooms/room-123'>
            <GridItem colSpan={1}>
              <Tooltip hasArrow label="Hey, I'm here!" aria-label='A tooltip'>
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
                    Room {index + 1}
                  </Text>
                </Flex>
              </Tooltip>
            </GridItem>
          </Link>
        ))}
      </Grid>
    </ManagerDashboard>
  )
}
