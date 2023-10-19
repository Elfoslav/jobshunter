'use client'

import { useGetUserById } from '@/services/users/UsersService'
import UserProfileForm from '../components/UserProfileForm'
import { Container } from 'react-bootstrap'

export default function UserEdit() {
  const { data: user, isLoading } = useGetUserById('1')

  return (
    <div>
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
