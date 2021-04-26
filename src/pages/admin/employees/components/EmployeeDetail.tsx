import { useState } from 'react'
import {
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Button,
  Avatar,
  Center,
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import { SingleDatePicker } from 'react-dates'
import moment from 'moment'

export default function EmployeeDetail(props: any) {
  const { employee } = props
  const [focused, setFocused] = useState<boolean>(false)
  const [selectedDate, handleDateChange] = useState<moment.Moment | null>(
    moment()
  )
  return (
    <Grid templateColumns='repeat(5, 1fr)' gap={4}>
      <GridItem colSpan={3}>
        <FormControl id='identity'>
          <FormLabel>Mã nhân viên</FormLabel>
          <Input type='text' value={`${employee.identity}`} />
        </FormControl>
        <FormControl id='name' mt='5'>
          <FormLabel>Tên</FormLabel>
          <Input type='text' value={`${employee.name}`} />
        </FormControl>
        <FormControl id='unit' mt='5'>
          <FormLabel>Đơn vị</FormLabel>
          <Input type='text' value={`${employee.unit}`} />
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
          <Input type='email' value={`${employee.email || ''}`} />
        </FormControl>
        <FormControl id='phone' mt='5'>
          <FormLabel>Số điện thoại</FormLabel>
          <Input type='text' value={`${employee.phone || ''}`} />
        </FormControl>

        <Button colorScheme='teal' size='sm' my='5' float='right'>
          Cập nhật thay đổi
        </Button>
      </GridItem>
      <GridItem colSpan={2}>
        <Center>
          <Avatar
            name={`${employee.name}`}
            w='12rem'
            h='12rem'
            src={`${employee.avatar}`}
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
