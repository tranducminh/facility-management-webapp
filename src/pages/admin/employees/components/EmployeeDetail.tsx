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
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import { SingleDatePicker } from 'react-dates'
import moment from 'moment'
import axios from '../../../../utils/axios'
import { getBase64 } from '../../../../utils/file'
import { EMPLOYEE } from '../../../../types'

export default function EmployeeDetail({ employee }: { employee: EMPLOYEE }) {
  const [focused, setFocused] = useState<boolean>(false)
  const [selectedDate, handleDateChange] = useState<moment.Moment | null>(
    moment()
  )
  const [identity, setIdentity] = useState(employee.identity)
  const [name, setName] = useState(employee.name)
  const [unit, setUnit] = useState(employee.unit)
  const [email, setEmail] = useState(employee.email)
  const [phone, setPhone] = useState(employee.phone)
  const [avatar, setAvatar] = useState<File | null>()
  const [avatarUrl, setAvatarUrl] = useState<string>()

  const onHandleUpdate = async () => {
    if (avatar) {
      axios
        .put(`/employees/${employee.id}`, {
          identity,
          name,
          unit,
          email,
          phone,
          dateOfBirth: selectedDate !== null ? selectedDate?.toDate() : null,
          avatar: await getBase64(avatar),
        })
        .then(() => {
          alert('success')
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      axios
        .put(`/employees/${employee.id}`, {
          identity,
          name,
          unit,
          email,
          phone,
          dateOfBirth: selectedDate !== null ? selectedDate?.toDate() : null,
        })
        .then(() => {
          alert('success')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  useEffect(() => {
    setIdentity(employee.identity)
    setName(employee.name)
    setUnit(employee.unit)
    setEmail(employee.email)
    setPhone(employee.phone)
    setAvatarUrl(employee.avatar)
  }, [employee])
  return (
    <Grid templateColumns='repeat(5, 1fr)' gap={4}>
      <GridItem colSpan={3}>
        <FormControl id='identity'>
          <FormLabel>Mã nhân viên</FormLabel>
          <Input
            type='text'
            defaultValue={employee.identity}
            onChange={(event) => {
              setIdentity(event.target.value)
            }}
          />
        </FormControl>
        <FormControl id='name' mt='5'>
          <FormLabel>Tên</FormLabel>
          <Input
            type='text'
            defaultValue={employee.name}
            onChange={(event) => {
              setName(event.target.value)
            }}
          />
        </FormControl>
        <FormControl id='unit' mt='5'>
          <FormLabel>Đơn vị</FormLabel>
          <Input
            type='text'
            defaultValue={employee.unit}
            onChange={(event) => {
              setUnit(event.target.value)
            }}
          />
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
          <Input
            type='email'
            defaultValue={employee.email}
            onChange={(event) => {
              setEmail(event.target.value)
            }}
          />
        </FormControl>
        <FormControl id='phone' mt='5'>
          <FormLabel>Số điện thoại</FormLabel>
          <Input
            type='text'
            defaultValue={employee.phone}
            onChange={(event) => {
              setPhone(event.target.value)
            }}
          />
        </FormControl>

        <Button
          colorScheme='teal'
          size='sm'
          my='5'
          float='right'
          onClick={onHandleUpdate}>
          Cập nhật thay đổi
        </Button>
      </GridItem>
      <GridItem colSpan={2}>
        <Center>
          <Avatar
            name={`${employee.name}`}
            w='12rem'
            h='12rem'
            src={`${avatarUrl}`}
          />
        </Center>
        <Center mt={5}>
          <FormControl id='avatar'>
            <FormLabel
              display='flex'
              justifyContent='center'
              alignItems='center'
              cursor='pointer'>
              {/* <Button
                size='sm'
                variant='outline'
                leftIcon={<EditIcon />}
                colorScheme='teal'> */}
              <EditIcon colorScheme='teal' />
              <Text ml='3' colorScheme='teal' textStyle='bold-sm'>
                Chỉnh sửa
              </Text>
              {/* </Button> */}
            </FormLabel>
            <Input
              type='file'
              display='none'
              onChange={(event: any) => {
                setAvatarUrl(URL.createObjectURL(event.target?.files[0]))
                setAvatar(event.target?.files[0])
              }}
            />
          </FormControl>
        </Center>
      </GridItem>
    </Grid>
  )
}
