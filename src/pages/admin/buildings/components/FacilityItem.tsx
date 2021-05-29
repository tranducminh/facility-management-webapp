/* eslint-disable no-nested-ternary */
import React from 'react'
import {
  Box,
  Badge,
  Grid,
  GridItem,
  HStack,
  Tag,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Divider,
  useDisclosure,
} from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
import { FACILITY } from '../../../../types'

export default function FacilityItem({ facility }: { facility: FACILITY }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  // const {
  //   isOpen: isOpenReport,
  //   onOpen: onOpenReport,
  //   onClose: onCloseReport,
  // } = useDisclosure()

  return (
    <Box w='100%' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Box p='5'>
        <Box d='flex' alignItems='center' justifyContent='space-between' mb='1'>
          <Box
            fontWeight='bold'
            letterSpacing='wide'
            fontSize='md'
            textTransform='uppercase'>
            #{facility.id}
          </Box>
          {facility.facilityType?.name === 'printer' ? (
            <Badge borderRadius='full' colorScheme='teal'>
              Máy in
            </Badge>
          ) : facility.facilityType?.name === 'computer' ? (
            <Badge borderRadius='full' colorScheme='teal'>
              Máy tính
            </Badge>
          ) : facility.facilityType?.name === 'fax' ? (
            <Badge borderRadius='full' colorScheme='teal'>
              Máy fax
            </Badge>
          ) : null}
        </Box>

        <Box fontWeight='semibold' as='h2' lineHeight='tight' isTruncated>
          <Text textStyle='bold-md' maxW='100%' noOfLines={1}>
            {facility.name}
          </Text>
        </Box>

        <Grid templateColumns='repeat(4, 1fr)' gap={3} mt={3}>
          <GridItem
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='13px'
            colSpan={2}>
            Ngày cấp:
          </GridItem>
          <GridItem
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='13px'
            colSpan={2}>
            21/11/2022
          </GridItem>
          <GridItem
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='13px'
            colSpan={2}>
            Tình trạng:
          </GridItem>
          <GridItem colSpan={2} margin='auto 0'>
            {facility.status === 'ready' ? (
              <Tag size='sm' key='status' variant='solid' colorScheme='teal'>
                Sẵn sàng
              </Tag>
            ) : facility.status === 'repairing' ? (
              <Tag size='sm' key='status' variant='solid' colorScheme='blue'>
                Đang sửa chữa
              </Tag>
            ) : facility.status === 'error' ? (
              <Tag size='sm' key='status' variant='solid' colorScheme='red'>
                Đang hỏng
              </Tag>
            ) : null}
          </GridItem>
        </Grid>

        <Box d='flex' alignItems='center' justifyContent='space-between' mt={5}>
          {/* <Button
            leftIcon={<WarningTwoIcon />}
            colorScheme='red'
            variant='link'
            size='sm'
            onClick={onOpenReport}>
            <Text pt='0.15rem' fontSize='13px'>
              Báo hỏng
            </Text>
          </Button> */}
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
          <ModalHeader>#{facility.id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns='repeat(12, 1fr)' gap={15}>
              <GridItem colStart={2} colEnd={5}>
                <Text textStyle='bold-md'>Tên thiết bị</Text>
              </GridItem>
              <GridItem colStart={5} colEnd={12}>
                <Text>{facility.name}</Text>
              </GridItem>
              <GridItem colStart={2} colEnd={5}>
                <Text textStyle='bold-md'>Nguồn gốc</Text>
              </GridItem>
              <GridItem colStart={5} colEnd={12}>
                <Text>{facility.origin}</Text>
              </GridItem>
              <GridItem colStart={2} colEnd={5}>
                <Text textStyle='bold-md'>Giá trị</Text>
              </GridItem>
              <GridItem colStart={5} colEnd={12}>
                <Text>{facility.price} VND</Text>
              </GridItem>
              <GridItem colStart={2} colEnd={5}>
                <Text textStyle='bold-md'>Ngày cấp</Text>
              </GridItem>
              <GridItem colStart={5} colEnd={12}>
                <Text>21/11/2022</Text>
              </GridItem>
              <GridItem colStart={2} colEnd={5}>
                <Text textStyle='bold-md'>Trạng thái</Text>
              </GridItem>
              <GridItem colStart={5} colEnd={12}>
                {facility.status === 'ready' ? (
                  <Tag
                    size='sm'
                    key='status'
                    variant='solid'
                    colorScheme='teal'>
                    Sẵn sàng
                  </Tag>
                ) : facility.status === 'repairing' ? (
                  <Tag
                    size='sm'
                    key='status'
                    variant='solid'
                    colorScheme='blue'>
                    Đang sửa chữa
                  </Tag>
                ) : facility.status === 'error' ? (
                  <Tag size='sm' key='status' variant='solid' colorScheme='red'>
                    Đang hỏng
                  </Tag>
                ) : null}
              </GridItem>
              <GridItem colStart={1} colEnd={13}>
                <Divider colorScheme='teal' />
              </GridItem>
              {facility.facilityType?.name === 'computer' ? (
                <>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>CPU</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{facility.configuration?.cpu}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Main board</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{facility.configuration?.mainboard}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Ổ đĩa</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{facility.configuration?.hardDrive}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Bộ nhớ</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{facility.configuration?.ram}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Card màn hình</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{facility.configuration?.vga}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Nguồn</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{facility.configuration?.psu}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Màn hình</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{facility.configuration?.monitor}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Bàn phím</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{facility.configuration?.keyboard}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Chuột</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{facility.configuration?.mouse}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Tai nghe</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{facility.configuration?.headPhone}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Micro</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text />
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Tản nhiệt</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{facility.configuration?.fanCase}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Webcam</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{facility.configuration?.webcam}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Đầu đọc thẻ</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{facility.configuration?.cardReader}</Text>
                  </GridItem>
                </>
              ) : facility.facilityType?.name === 'printer' ? (
                <>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Model</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{facility.configuration?.model}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Tốc độ in</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{facility.configuration?.printSpeed}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Độ phân giải</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{facility.configuration?.resolution}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Bộ nhớ</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{facility.configuration?.ram}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Khay giấy</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{facility.configuration?.paperSize}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Mực in</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{facility.configuration?.printInk}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>In đảo mặt</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{facility.configuration?.duplexPrint}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Cổng giao tiếp</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{facility.configuration?.communication}</Text>
                  </GridItem>
                </>
              ) : facility.facilityType?.name === 'fax' ? (
                <>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Model</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{facility.configuration?.model}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Tốc độ fax</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{facility.configuration?.faxSpeed}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Độ phân giải</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{facility.configuration?.resolution}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Bộ nhớ</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{facility.configuration?.ram}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Khay giấy</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{facility.configuration?.paperSize}</Text>
                  </GridItem>
                  <GridItem colStart={2} colEnd={5}>
                    <Text textStyle='bold-md'>Mực in</Text>
                  </GridItem>
                  <GridItem colStart={5} colEnd={12}>
                    <Text>{facility.configuration?.printInk}</Text>
                  </GridItem>
                </>
              ) : null}
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
