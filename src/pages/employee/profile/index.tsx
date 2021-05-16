import { useState, useEffect } from 'react'
import {
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Button,
  Avatar,
  Center,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import { SingleDatePicker } from 'react-dates'
import moment from 'moment'
import EmployeeDashboard from '../../../layouts/EmployeeDashboard'
import axios from '../../../utils/axios'
import { EMPLOYEE } from '../../../types'

export default function Profile() {
  const [focused, setFocused] = useState<boolean>(false)
  const [selectedDate, handleDateChange] = useState<moment.Moment | null>(
    moment()
  )
  const [employee, setEmployee] = useState<EMPLOYEE>({})
  useEffect(() => {
    axios
      .get('/employees/me')
      .then((res) => {
        setEmployee(res.data.employee)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  return (
    <EmployeeDashboard isProfile>
      <Text textStyle='bold-xl'>Thông tin phòng</Text>
      <Grid templateColumns='repeat(5, 1fr)' gap={4} mt='5'>
        <GridItem colSpan={3}>
          {employee.room ? (
            <>
              <FormControl id='identity'>
                <FormLabel>Tòa nhà</FormLabel>
                <Input
                  type='text'
                  isDisabled
                  value={employee.room?.floor?.building?.name}
                />
              </FormControl>
              <FormControl id='name' mt='5'>
                <FormLabel>Tầng</FormLabel>
                <Input
                  type='text'
                  isDisabled
                  value={employee.room?.floor?.name}
                />
              </FormControl>
              <FormControl id='unit' mt='5'>
                <FormLabel>Phòng</FormLabel>
                <Input type='text' isDisabled value={employee.room?.name} />
              </FormControl>
            </>
          ) : (
            <Alert
              status='info'
              variant='subtle'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
              textAlign='center'
              height='200px'>
              <AlertIcon boxSize='40px' mr={0} />
              <AlertTitle mt={4} mb={1} fontSize='lg'>
                Bạn chưa có phòng
              </AlertTitle>
              <AlertDescription maxWidth='sm'>
                Liên hệ quản trị viên để biết thêm thông tin chi tiết
              </AlertDescription>
            </Alert>
          )}
        </GridItem>
        <GridItem colSpan={2} />
      </Grid>

      <Text textStyle='bold-xl' mt='5'>
        Thông tin cá nhân
      </Text>
      <Grid templateColumns='repeat(5, 1fr)' gap={4} mt='5'>
        <GridItem colSpan={3}>
          <FormControl id='identity'>
            <FormLabel>Mã nhân viên</FormLabel>
            <Input type='text' isDisabled value={employee.identity} />
          </FormControl>
          <FormControl id='name' mt='5'>
            <FormLabel>Tên</FormLabel>
            <Input type='text' isDisabled value={employee.name} />
          </FormControl>
          <FormControl id='unit' mt='5'>
            <FormLabel>Đơn vị</FormLabel>
            <Input type='text' isDisabled value={employee.unit} />
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
            <Input type='email' value={employee.email} />
          </FormControl>
          <FormControl id='phone' mt='5'>
            <FormLabel>Số điện thoại</FormLabel>
            <Input type='text' value={employee.phone} />
          </FormControl>

          <Button colorScheme='teal' size='sm' my='5' float='right'>
            Lưu thay đổi
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
    </EmployeeDashboard>
  )
}
