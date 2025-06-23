'use client';

import { Container } from 'react-bootstrap';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import ApplicantProfileForm from '../components/ApplicantProfileForm';
import { useApplicantUser } from '@/app/context/UserContext';

export default function UserEdit() {
  const { user, isLoading } = useApplicantUser();
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

      {user && <ApplicantProfileForm user={user} />}
    </div>
  );
}
