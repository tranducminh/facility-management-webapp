/* eslint-disable react/destructuring-assignment */
import AdminHeader from './components/AdminHeader'

export default function AdminLayout(props: any) {
  return <AdminHeader>{props.children}</AdminHeader>
}
