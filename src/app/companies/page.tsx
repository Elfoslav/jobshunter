'use client';

import { useSearchParams } from 'next/navigation';
import { Container } from 'react-bootstrap';
import CompaniesList from './components/CompaniesList';
import {
  useGetCompanies,
  useGetCompaniesCount,
} from '@/services/companies/CompaniesService';
import Loading from '../components/Loading';

export default function JobsContent() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page') || '1';
  const searchParam = searchParams.get('search') || '';
  const skillsParam = searchParams.get('skills') || '';
  const skillsParamArray = skillsParam ? skillsParam.split(',') : [];
  const page = parseInt(pageParam);
  const { data: companies, isLoading } = useGetCompanies(
    page,
    searchParam,
    skillsParamArray
  );
  const { data: companiesCount } = useGetCompaniesCount(
    searchParam,
    skillsParamArray
  );

  return (
    <div>
      <Container>
        {isLoading ? (
          <Loading />
        ) : (
          companies?.length === 0 && <div>No companies.</div>
        )}
      </Container>

      <CompaniesList
        companies={companies || []}
        totalCount={companiesCount || 0}
        page={page}
      />
    </div>
  );
}
