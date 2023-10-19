'use client'

import { useGetUserById } from '@/services/users/UsersService'
import Link from 'next/link'
import { Container } from 'react-bootstrap'

export default function UserShow() {
  const { data: user, isLoading } = useGetUserById('1')

  return (
    <Container>
      <h2>Your profile</h2>
      <div>This page is not ready, yet.</div>
      <div>
        But you can edit your profile&nbsp;
        <Link href="/profile/edit">
          here
        </Link>
        .
      </div>
    </Container>
  )
}
