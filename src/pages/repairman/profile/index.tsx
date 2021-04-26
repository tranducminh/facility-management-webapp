import { useState } from 'react'
import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
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
import RepairmanDashboard from '../../../layouts/RepairmanDashboard'
import { Link } from '../../../../i18n'

export default function RepairmanDetail() {
  const [focused, setFocused] = useState<boolean>(false)
  const [selectedDate, handleDateChange] = useState<moment.Moment | null>(
    moment()
  )
  return (
    <RepairmanDashboard isProfile>
      <Flex justifyContent='space-between' alignItems='center' mb={5}>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href='/repairman/profile'>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>Profile</Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>
      <Grid templateColumns='repeat(5, 1fr)' gap={4}>
        <GridItem colSpan={3}>
          <FormControl id='identity'>
            <FormLabel>Identity</FormLabel>
            <Input type='text' value='#211196' disabled />
          </FormControl>
          <FormControl id='name' mt='5'>
            <FormLabel>Name</FormLabel>
            <Input type='text' value='Tran Duc Minh' disabled />
          </FormControl>
          <FormControl id='unit' mt='5'>
            <FormLabel>Unit</FormLabel>
            <Input type='text' value='' disabled />
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
          <FormControl id='phone' mt='5'>
            <FormLabel>Specialize</FormLabel>
            <Box pl='5'>
              <Checkbox defaultIsChecked colorScheme='teal'>
                <Text textStyle='bold-sm'>Computer</Text>
              </Checkbox>
              <Textarea mt='1' placeholder='Here is a sample placeholder' />
            </Box>
            <Box pl='5' mt='4'>
              <Checkbox defaultIsChecked colorScheme='teal'>
                <Text textStyle='bold-sm'>Printer</Text>
              </Checkbox>
              <Textarea mt='1' placeholder='Here is a sample placeholder' />
            </Box>
            <Box pl='5' mt='4'>
              <Checkbox defaultIsChecked colorScheme='teal'>
                <Text textStyle='bold-sm'>Fax</Text>
              </Checkbox>
              <Textarea mt='1' placeholder='Here is a sample placeholder' />
            </Box>
            <Box pl='5' mt='4'>
              <Checkbox defaultIsChecked colorScheme='teal'>
                <Text textStyle='bold-sm'>Router</Text>
              </Checkbox>
              <Textarea mt='1' placeholder='Here is a sample placeholder' />
            </Box>
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
    </RepairmanDashboard>
  )
}
