/* eslint-disable no-nested-ternary */
import React from 'react'
import {
  Box,
  Badge,
  Grid,
  GridItem,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { EditIcon, ViewIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import { EMPLOYEE } from '../../../../types'

export default function FacilityItem({ employee }: { employee: EMPLOYEE }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()

  return (
    <Box w='100%' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Box p='5'>
        <Box d='flex' alignItems='center' justifyContent='space-between' mb='1'>
          <Box
            fontWeight='bold'
            letterSpacing='wide'
            fontSize='md'
            textTransform='uppercase'>
            #{employee.identity}
          </Box>
        </Box>

        <Box fontWeight='semibold' as='h2' lineHeight='tight' isTruncated>
          <Text textStyle='bold-md' maxW='100%' noOfLines={1}>
            {employee.name}
          </Text>
        </Box>

        <Grid templateColumns='repeat(4, 1fr)' gap={3} mt={3}>
          <GridItem
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='13px'
            colSpan={2}>
            Đơn vị
          </GridItem>
          <GridItem
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='13px'
            colSpan={2}>
            {employee.unit}
          </GridItem>
          <GridItem
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='13px'
            colSpan={2}>
            Số lượng thiết bị
          </GridItem>
          <GridItem
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='13px'
            colSpan={2}>
            {employee.facilities?.length || 0}
          </GridItem>
        </Grid>

        <Box d='flex' alignItems='center' justifyContent='space-between' mt={5}>
          <Button
            leftIcon={<EditIcon />}
            colorScheme='blue'
            variant='link'
            size='sm'
            onClick={() => {
              router.push(`/admin/employees/${employee.identity}`)
            }}>
            <Text pt='0.15rem' fontSize='13px'>
              Chỉnh sửa
            </Text>
          </Button>
          <Button
            leftIcon={<ViewIcon />}
            colorScheme='teal'
            variant='link'
            size='sm'
            onClick={onOpen}>
            <Text pt='0.15rem' fontSize='13px'>
              Chi tiết
            </Text>
          </Button>
        </Box>
      </Box>

      <Modal isOpen={isOpen} size='xl' onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>#{employee.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns='repeat(12, 1fr)' gap={15}>
              <GridItem colStart={2} colEnd={5}>
                <Text textStyle='bold-md'>Mã nhân viên</Text>
              </GridItem>
              <GridItem colStart={5} colEnd={12}>
                <Text>{employee.identity}</Text>
              </GridItem>
              <GridItem colStart={2} colEnd={5}>
                <Text textStyle='bold-md'>Đơn vị</Text>
              </GridItem>
              <GridItem colStart={5} colEnd={12}>
                <Text>{employee.unit}</Text>
              </GridItem>
              <GridItem colStart={2} colEnd={5}>
                <Text textStyle='bold-md'>Ngày sinh</Text>
              </GridItem>
              <GridItem colStart={5} colEnd={12}>
                <Text>{employee.dateOfBirth}</Text>
              </GridItem>
              <GridItem colStart={2} colEnd={5}>
                <Text textStyle='bold-md'>Email</Text>
              </GridItem>
              <GridItem colStart={5} colEnd={12}>
                <Text>{employee.email}</Text>
              </GridItem>
              <GridItem colStart={2} colEnd={5}>
                <Text textStyle='bold-md'>Số điện thoại</Text>
              </GridItem>
              <GridItem colStart={5} colEnd={12}>
                <Text>{employee.phone}</Text>
              </GridItem>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button size='sm' colorScheme='gray' mr={3} onClick={onClose}>
              Đóng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
