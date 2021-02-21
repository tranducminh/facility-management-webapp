import Head from 'next/head'
import UserDashboard from '../layouts/UserDashboard'

export default function Dashboard() {
  return (
    <UserDashboard>
      <Head>
        <title>
          Dashboard - Ho Chi Minh National Academy of Politics - Facility
          management system
        </title>
      </Head>
    </UserDashboard>
  )
}
