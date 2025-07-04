'use client';

import { Container } from 'react-bootstrap';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import ApplicantProfileForm from '../components/ApplicantProfileForm';
import { useApplicantUser } from '@/app/context/UserContext';
import Loading from '@/app/components/Loading';

export default function UserEdit() {
  const { user, isLoading, isInitialized } = useApplicantUser();
  const breadcrumbs = [
    { link: '/profile', title: 'Profile' },
    { title: 'Edit profile' },
  ];

  if (!isInitialized || isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Container>No user found.</Container>;
  }

  return (
    <div className="mb-4">
      <Breadcrumbs items={breadcrumbs} />
      {user && <ApplicantProfileForm user={user} />}
    </div>
  );
}
