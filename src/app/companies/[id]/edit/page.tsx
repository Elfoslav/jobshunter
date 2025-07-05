'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import {
  useGetCompanyById,
  useUpdateCompany,
} from '@/services/companies/CompaniesService';
import CompanyForm from '@/app/companies/components/CompanyForm';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { ExistingCompany } from '@/models/Company';
import Loading from '@/app/components/Loading';

export default function EditCompanyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { data: company, isLoading } = useGetCompanyById(id);
  const {
    mutateAsync: updateCompany,
    isPending: isUpdating,
    error: updateError,
  } = useUpdateCompany();

  const handleSubmit = async (values: ExistingCompany) => {
    try {
      await updateCompany(values);
      router.push(`/companies/${id}`);
    } catch (err) {
      // You can optionally set error state here
      console.error('Update failed', err);
    }
  };

  if (isLoading) return <Loading />;

  if (!company) {
    return (
      <Container className="py-3">
        <Alert variant="danger">Unable to load company data.</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-3">
      <CompanyForm initialValues={company} onSubmit={handleSubmit} />
    </Container>
  );
}
