/* eslint-disable no-nested-ternary */
/* eslint-disable prettier/prettier */
import { RiCommunityLine } from 'react-icons/ri'
import { FaBirthdayCake } from 'react-icons/fa'
import { IoMdPricetag } from 'react-icons/io'
import { SiOrigin } from 'react-icons/si'
import {
  Box,
  Grid,
  GridItem,
  Divider,
  Flex,
  Text,
  Badge,
  Tag
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import axios from '../../../../utils/axios'
import { EMPLOYEE, FACILITY } from '../../../../types'
import { useColor } from '../../../../theme/useColorMode'

export default function EmployeeFacilityMode() {
  const { hoverTextColor, hoverBgColor, selectBgColor } = useColor()
  const [activeEmployee, setActiveEmployee] = useState<EMPLOYEE>()
  const [employees, setEmployees] = useState<EMPLOYEE[]>([])
  const [facilities, setFacilities] = useState<FACILITY[]>([])
  const [currentEmployee, setCurrentEmployee] = useState<string>('')
  useEffect(() => {
    axios
      .get('/employees')
      .then((response) => {
        setEmployees(response.data.employees)
      })
      .catch((error) => {
        console.log(error)
      })
    axios
      .get('/facilities/employee/null')
      .then((response) => {
        setFacilities(response.data.facilities)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const chooseEmployee = (id?: number) => {
    setActiveEmployee(
      employees.filter((employee: EMPLOYEE) => employee.id === id)[0]
    )
  }

  function allowDropEmployee(ev: any) {
    ev.preventDefault()
  }

  async function dragEmployee(ev: any) {
    await setCurrentEmployee(ev.target.id)
  }

  function dropEmployee(ev: any) {
    ev.preventDefault()
    document
      .querySelector('#employees')
      ?.appendChild(document?.getElementById(currentEmployee) as Node)
  }
  return (
    <Grid templateColumns='repeat(9, 1fr)' gap={4}>
      <GridItem colSpan={2} h='100vh' overflow='auto'>
        {employees &&
          employees.map((employee: EMPLOYEE, index: number) => (
            <Box
              key={index}
              borderWidth='1px'
              borderRadius='lg'
              overflow='hidden'
              p='3'
              mb='5'
              _hover={{
                color: hoverTextColor,
                backgroundColor: hoverBgColor,
                borderRadius: '0.5em',
              }}
              cursor='pointer'
              onClick={() => chooseEmployee(employee.id)}
              backgroundColor={employee.id === activeEmployee?.id ? selectBgColor : ''}
              color={employee.id === activeEmployee?.id ? hoverTextColor : ''}>
              <Text textStyle='bold-sm'>#{employee.identity}</Text>
              <Text isTruncated textStyle='bold-sm'>
                {employee.name}
              </Text>
              <Divider my='2' />
              <Flex alignItems='center'>
                <RiCommunityLine />
                <Text ml='2'>{employee.unit}</Text>
              </Flex>
              <Flex alignItems='center' mt='2'>
                <FaBirthdayCake />
                {employee.dateOfBirth ? (
                  <Text ml='2'>
                    {new Date(employee.dateOfBirth).getDate()}/
                    {new Date(employee.dateOfBirth).getMonth() + 1}/
                    {new Date(employee.dateOfBirth).getFullYear()}
                  </Text>
                ) : (
                  <Text ml='2'>Chưa cập nhật</Text>
                )}
              </Flex>
            </Box>
          ))}
      </GridItem>
      <GridItem colSpan={5} borderRadius='lg' backgroundColor='#1c2531' p='3' h='100vh' overflow='auto'>
        <div
          id='active-room'
          onDrop={(e) => dropEmployee(e)}
          onDragOver={(e) => allowDropEmployee(e)}>
          <Flex justifyContent='space-between' w='100%' mb='5'>
            <Text textStyle='bold-xl'>{activeEmployee?.name}</Text>
            <Text textStyle='bold-xl'>#{activeEmployee?.identity}</Text>
          </Flex>
          <Grid templateColumns='repeat(2, 1fr)' gap={4} id='employees'>
            {activeEmployee?.facilities &&
              activeEmployee?.facilities.map(
                (facility: FACILITY, index: number) => (
                  <GridItem colSpan={1} overflow='hidden'>
                    <Box
                      key={index}
                      borderWidth='1px'
                      borderRadius='lg'
                      overflow='hidden'
                      p='3'>
                      <Text textStyle='bold-sm'>#{facility.id}</Text>
                      <Text isTruncated textStyle='bold-sm'>
                        {facility.name}
                      </Text>
                      <Divider my='2' />
                      <Flex justifyContent='space-between' mb='2'>
                        <Badge borderRadius='full' colorScheme='teal'>
                          {facility.facilityType?.name === 'computer'
                            ? 'Máy tính'
                            : facility.facilityType?.name === 'printer'
                              ? 'Máy in'
                              : facility.facilityType?.name === 'fax'
                                ? 'Máy fax'
                                : null}
                        </Badge>
                        {facility.status === 'ready' ? (
                          <Tag size='sm' key='status' variant='solid' colorScheme='teal'>
                            Sẵn sàng
                          </Tag>
                        ) : facility.status === 'ready' ? (
                          <Tag size='sm' key='status' variant='solid' colorScheme='yellow'>
                            Đang sửa chữa
                          </Tag>
                        ) : (
                          <Tag size='sm' key='status' variant='solid' colorScheme='red'>
                            Đang hỏng
                          </Tag>
                        )}
                      </Flex>
                      <Flex alignItems='center' mb='1'>
                        <SiOrigin />
                        <Text isTruncated ml='2'>{facility.origin}</Text>
                      </Flex>
                      <Flex alignItems='center'>
                        <IoMdPricetag />
                        <Text isTruncated ml='2'>{facility.price}</Text>
                      </Flex>
                    </Box>
                  </GridItem>
                )
              )}
          </Grid>
        </div>
      </GridItem>
      <GridItem colSpan={2} h='100vh' overflow='auto'>
        {facilities &&
          facilities.map((facility: FACILITY, index: number) => (
            <GridItem
              colSpan={1}
              draggable='true'
              className='student'
              overflow='hidden'
              id={`${facility.id}`}
              onDragStart={(e) => dragEmployee(e)}>
              <Box
                key={index}
                borderWidth='1px'
                borderRadius='lg'
                overflow='hidden'
                p='3'
                mb='5'
                _hover={{
                  color: hoverTextColor,
                  backgroundColor: hoverBgColor,
                  borderRadius: '0.5em',
                }}
                cursor='pointer'>
                <Text textStyle='bold-sm'>#{facility.id}</Text>
                <Text isTruncated textStyle='bold-sm'>
                  {facility.name}
                </Text>
                <Divider my='2' />
                <Flex justifyContent='space-between' mb='2'>
                  {facility.facilityType?.name === 'computer'
                    ? <Badge borderRadius='full' colorScheme='teal'>Máy tính</Badge>
                    : facility.facilityType?.name === 'printer'
                      ? <Badge borderRadius='full' colorScheme='teal'>Máy in</Badge>
                      : facility.facilityType?.name === 'fax'
                        ? <Badge borderRadius='full' colorScheme='teal'>Máy fax</Badge>
                        : null}
                  {facility.status === 'ready' ? (
                    <Tag size='sm' key='status' variant='solid' colorScheme='teal'>
                      Sẵn sàng
                    </Tag>
                  ) : facility.status === 'ready' ? (
                    <Tag size='sm' key='status' variant='solid' colorScheme='yellow'>
                      Đang sửa chữa
                    </Tag>
                  ) : (
                    <Tag size='sm' key='status' variant='solid' colorScheme='red'>
                      Đang hỏng
                    </Tag>
                  )}
                </Flex>
                <Flex alignItems='center' mb='1'>
                  <SiOrigin />
                  <Text isTruncated ml='2'>{facility.origin}</Text>
                </Flex>
                <Flex alignItems='center'>
                  <IoMdPricetag />
                  <Text isTruncated ml='2'>{facility.price}</Text>
                </Flex>
              </Box>
            </GridItem>
          ))}
      </GridItem>
    </Grid>
  )
}
