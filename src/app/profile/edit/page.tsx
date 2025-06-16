'use client';

import { Container } from 'react-bootstrap';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import UserProfileForm from '../components/UserProfileForm';
import { useUser } from '@/app/context/UserContext';

export default function UserEdit() {
  const { user, isLoading } = useUser();
  const breadcrumbs = [
    { link: '/profile', title: 'Profile' },
    { title: 'Edit profile' },
  ];

  return (
    <div className="mb-4">
      <Breadcrumbs items={breadcrumbs} />

      <Container>
        <h2>Your profile</h2>

        {isLoading ? <p>Loading...</p> : !user && <p>User not found.</p>}
      </Container>

      {user && <UserProfileForm user={user} />}
    </div>
  );
}
