'use client'

import { useGetUserById } from '@/services/users/UsersService'
import UserProfileForm from '../components/UserProfileForm'
import { Container } from 'react-bootstrap'
import Breadcrumbs from '@/app/components/Breadcrumbs'

export default function UserEdit() {
  const { data: user, isLoading } = useGetUserById('1')
  const breadcrumbs = [
    { link: '/profile', title: 'Profile' },
    { title: 'Edit profile' }
  ]

  return (
    <div>
      <Breadcrumbs items={breadcrumbs} />

      <Container>
        <h2>Your profile</h2>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          !user && <p>User not found.</p>
        )}

      </Container>

      {user && <UserProfileForm user={user} />}
    </div>
  )
}
