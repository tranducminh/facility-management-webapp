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
  Text,
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import { SingleDatePicker } from 'react-dates'
import moment from 'moment'
import EmployeeDashboard from '../../../layouts/EmployeeDashboard'

export default function Profile() {
  const [focused, setFocused] = useState<boolean>(false)
  const [selectedDate, handleDateChange] = useState<moment.Moment | null>(
    moment()
  )
  return (
    <EmployeeDashboard isProfile>
      <Text textStyle='bold-2xl'>Profile</Text>
      <Grid templateColumns='repeat(5, 1fr)' gap={4} mt='5'>
        <GridItem colSpan={3}>
          <FormControl id='identity'>
            <FormLabel>Identity</FormLabel>
            <Input type='text' isDisabled value='#211196' />
          </FormControl>
          <FormControl id='name' mt='5'>
            <FormLabel>Name</FormLabel>
            <Input type='text' isDisabled value='Tran Duc Minh' />
          </FormControl>
          <FormControl id='unit' mt='5'>
            <FormLabel>Unit</FormLabel>
            <Input type='text' isDisabled value='' />
          </FormControl>
          <FormControl id='date_of_birth' mt='5'>
            <FormLabel>Date of birth</FormLabel>
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
            <FormLabel>Phone</FormLabel>
            <Input type='text' value='0968168302' />
          </FormControl>

          <Button colorScheme='teal' size='sm' my='5' float='right'>
            Save changes
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
              Edit
            </Button>
          </Center>
        </GridItem>
      </Grid>
    </EmployeeDashboard>
  )
}
