import { useEffect, useState } from 'react'
import {
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Button,
  Avatar,
  Center,
  Box,
  Checkbox,
  Textarea,
  Text,
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import { SingleDatePicker } from 'react-dates'
import moment from 'moment'
import { REPAIRMAN } from '../../../../types'

export default function RepairmanDetail({
  repairman,
}: {
  repairman: REPAIRMAN
}) {
  const [focused, setFocused] = useState<boolean>(false)
  const [selectedDate, handleDateChange] = useState<moment.Moment | null>(
    moment()
  )
  const [isCheckComputer, setIsCheckComputer] = useState<boolean>(false)
  const [computerDescription, setComputerDescription] = useState<string>('')
  const [isCheckPrinter, setIsCheckPrinter] = useState<boolean>(false)
  const [printerDescription, setPrinterDescription] = useState<string>('')
  const [isCheckFax, setIsCheckFax] = useState<boolean>(false)
  const [faxDescription, setFaxDescription] = useState<string>('')

  useEffect(() => {
    repairman.specializes?.forEach((specialize) => {
      switch (specialize.facilityType?.name) {
        case 'computer':
          setIsCheckComputer(true)
          setComputerDescription(specialize.description || '')
          break
        case 'printer':
          setIsCheckPrinter(true)
          setPrinterDescription(specialize.description || '')
          break
        case 'fax':
          debugger
          setIsCheckFax(true)
          setFaxDescription(specialize.description || '')
          break
        default:
          break
      }
    })
  }, [repairman])

  return (
    <Grid templateColumns='repeat(5, 1fr)' gap={4}>
      <GridItem colSpan={3}>
        <FormControl id='identity'>
          <FormLabel>Mã nhân viên</FormLabel>
          <Input type='text' value={repairman.identity} />
        </FormControl>
        <FormControl id='name' mt='5'>
          <FormLabel>Tên</FormLabel>
          <Input type='text' value={repairman.name} />
        </FormControl>
        <FormControl id='unit' mt='5'>
          <FormLabel>Đơn vị</FormLabel>
          <Input type='text' value={repairman.unit} />
        </FormControl>
        <FormControl id='date_of_birth' mt='5'>
          <FormLabel>Ngày sinh</FormLabel>
          <SingleDatePicker
            date={selectedDate}
            onDateChange={(date) => handleDateChange(date)}
            focused={focused}
            onFocusChange={({ focused }: { focused: boolean }) => {
              setFocused(focused)
            }}
            displayFormat='DD/MM/yyyy'
            enableOutsideDays
            isOutsideRange={() => false}
            numberOfMonths={1}
            id='room-date'
          />
        </FormControl>
        <FormControl id='email' mt='5'>
          <FormLabel>Email</FormLabel>
          <Input type='email' value='ducminh@gmail.com' />
        </FormControl>
        <FormControl id='phone' mt='5'>
          <FormLabel>Số điện thoại</FormLabel>
          <Input type='text' value={repairman.phone} />
        </FormControl>
        <FormControl id='phone' mt='5'>
          <FormLabel>Chuyên môn</FormLabel>
          <Box pl='5'>
            <Checkbox isChecked={isCheckComputer} colorScheme='teal'>
              <Text textStyle='bold-sm' value={computerDescription}>
                Máy tính
              </Text>
            </Checkbox>
            <Textarea mt='1' placeholder='Mô tả' />
          </Box>
          <Box pl='5' mt='4'>
            <Checkbox isChecked={isCheckPrinter} colorScheme='teal'>
              <Text textStyle='bold-sm' value={printerDescription}>
                Máy in
              </Text>
            </Checkbox>
            <Textarea mt='1' placeholder='Mô tả' />
          </Box>
          <Box pl='5' mt='4'>
            <Checkbox isChecked={isCheckFax} colorScheme='teal'>
              <Text textStyle='bold-sm' value={faxDescription}>
                Máy fax
              </Text>
            </Checkbox>
            <Textarea mt='1' placeholder='Mổ tả' />
          </Box>
        </FormControl>

        <Button colorScheme='teal' size='sm' my='5' float='right'>
          Cập nhật thông tin
        </Button>
      </GridItem>
      <GridItem colSpan={2}>
        <Center>
          <Avatar
            name='Dan Abrahmov'
            w='12rem'
            h='12rem'
            src='https://bit.ly/dan-abramov'
          />
        </Center>
        <Center mt={5}>
          <Button
            size='sm'
            variant='outline'
            leftIcon={<EditIcon />}
            colorScheme='teal'>
            Chỉnh sửa
          </Button>
        </Center>
      </GridItem>
    </Grid>
  )
}
