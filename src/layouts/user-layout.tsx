import UserHeader from '../components/layouts/user-header'

/* eslint-disable react/destructuring-assignment */
export default function UserLayout(props: any) {
  return (
    <div>
      <UserHeader />
      {props.children}
    </div>
  )
}
