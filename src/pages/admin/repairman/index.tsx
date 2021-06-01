import AdminDashboard from '../../../layouts/AdminDashboard'
import RepairmanComponent from './components/Repairman'

export default function Repairman() {
  return (
    <AdminDashboard isRepairman title='Kỹ thuật viên'>
      <RepairmanComponent />
    </AdminDashboard>
  )
}
