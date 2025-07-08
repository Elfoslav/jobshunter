'use client';

import { use } from 'react';
import ApplicantProfile from '../components/ApplicantProfile';
import { useGetApplicantById } from '@/services/users/UsersService';
import Loading from '@/app/components/Loading';

type PageProps = {
  params: {
    id: string;
  };
};

export default function ApplicantProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: applicant, error, isLoading } = useGetApplicantById(id);

  if (isLoading) return <Loading />;
  if (error) return <p>Error loading applicant</p>;
  if (!applicant) return <p>Applicant not found</p>;

  return <ApplicantProfile applicant={applicant} />;
}
