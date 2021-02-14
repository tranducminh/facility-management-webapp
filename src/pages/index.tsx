import UserLayout from '../layouts/user-layout'

export default function Home() {
  return <UserLayout />
}

Home.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})
