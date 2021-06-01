import {
  Grid,
  GridItem,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Text,
} from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { EMPLOYEE, FACILITY } from '../../../../types'
import FacilityItem from './FacilityItem'
import { setCurrentEmployee } from '../../../../redux/actions/arrangement.action'

export default function FacilityList({
  groupBy,
  facilities = [],
  employee,
}: {
  groupBy: string
  facilities?: FACILITY[]
  employee?: EMPLOYEE
}) {
  const dispatch = useDispatch()
  const router = useRouter()
  const handoverFacility = () => {
    dispatch(setCurrentEmployee({ employeeId: employee?.id }))
    router.push('/admin/arrangement/employee-facility')
  }
  if (employee && facilities && facilities.length === 0) {
    return (
      <Alert
        status='info'
        variant='subtle'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        height='200px'>
        <AlertIcon boxSize='40px' mr={0} />
        {groupBy === 'user' ? (
          <>
            <AlertTitle mt={4} mb={1} fontSize='lg'>
              {employee.name} chưa được bàn giao thiết bị
            </AlertTitle>
            <AlertDescription maxWidth='sm'>
              <Button
                rightIcon={<ArrowRightIcon fontSize='xs' />}
                colorScheme='teal'
                variant='ghost'
                size='sm'
                onClick={handoverFacility}
                mt='5'>
                <Text textStyle='bold-sm' mt='0.1rem'>
                  Bàn giao thiết bị ngay
                </Text>
              </Button>
            </AlertDescription>
          </>
        ) : (
          <AlertTitle mt={4} mb={1} fontSize='lg'>
            Không có thiết bị
          </AlertTitle>
        )}
      </Alert>
    )
  }
  return (
    <Grid templateColumns='repeat(3, 1fr)' gap={3}>
      {!facilities
        ? null
        : facilities.map((facility: FACILITY, index: number) => (
          <GridItem key={index} colSpan={1} overflow='hidden'>
            <FacilityItem facility={facility} />
          </GridItem>
        ))}
    </Grid>
  )
}
