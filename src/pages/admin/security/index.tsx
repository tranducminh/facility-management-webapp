import AdminDashboard from '../../../layouts/AdminDashboard'
import Title from '../../../components/Title'

export default function Security() {
  return (
    <AdminDashboard isSecurity>
      <Title title='Change password' />
    </AdminDashboard>
  )
}
