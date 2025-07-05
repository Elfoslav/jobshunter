'use client';

import { useSearchParams } from 'next/navigation';
import { Container } from 'react-bootstrap';
import ApplicantsList from './ApplicantsList';
import Loading from '@/app/components/Loading';
import {
  useGetApplicants,
  useGetApplicantsCount,
} from '@/services/users/UsersService';

export default function ApplicantsContent() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page') || '1';
  const searchParam = searchParams.get('search') || '';
  const skillsParam = searchParams.get('skills') || '';
  const skillsParamArray = skillsParam ? skillsParam.split(',') : [];
  const page = parseInt(pageParam);
  const { data: applicants, isLoading } = useGetApplicants(
    page,
    searchParam,
    skillsParamArray
  );
  const { data: applicantsTotalCount } = useGetApplicantsCount();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : applicants?.length === 0 ? (
        <div>No applicants.</div>
      ) : (
        <h4>{applicantsTotalCount} Applicants found</h4>
      )}

      <ApplicantsList
        applicants={applicants || []}
        totalCount={applicantsTotalCount || 0}
        page={page}
      />
    </>
  );
}
