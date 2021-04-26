import { Text } from '@chakra-ui/react'
import EmployeeDashboard from '../../../layouts/EmployeeDashboard'

export default function Security() {
  return (
    <EmployeeDashboard isSecurity>
      <Text textStyle='bold-2xl'>Change password</Text>
    </EmployeeDashboard>
  )
}
