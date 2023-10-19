'use client'

import { useGetUserById } from '@/services/users/UsersService'
import UserProfileForm from './components/UserProfileForm'

export default function UserShow() {
  const { data: user, isLoading } = useGetUserById('1')

  return (
    <div>
      <h2 className="ms-2">Your profile</h2>
      TODO
    </div>
  )
}
