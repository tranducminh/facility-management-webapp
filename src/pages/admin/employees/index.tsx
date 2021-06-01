import AdminDashboard from '../../../layouts/AdminDashboard'
import EmployeeList from './components/EmployeeList'

export default function User() {
  return (
    <AdminDashboard isUser title='Nhân viên'>
      <EmployeeList />
    </AdminDashboard>
  )
}
