'use client';

import {
  useMutation,
  useQuery,
  useSuspenseQuery,
  useQueryClient,
  UseQueryResult,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';

import CompaniesStore from './CompaniesStore';
import { ExistingCompany, NewCompany } from '@/models/Company';
import { COMPANIES_PER_PAGE, COMPANIES_QUERIES } from '@/lib/consts';

const filterCompanies = (
  data: ExistingCompany[],
  searchQuery: string = '',
  skills: string[] = []
): ExistingCompany[] => {
  let filtered = data.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  if (searchQuery) {
    filtered = filtered.filter((c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return filtered;
};

const getCompanies = async (
  page: number,
  searchQuery = '',
  skills: string[]
): Promise<ExistingCompany[]> => {
  const offset = (page - 1) * COMPANIES_PER_PAGE;
  const data = CompaniesStore.read();
  const filtered = filterCompanies(data, searchQuery, skills).slice(offset, offset + COMPANIES_PER_PAGE);
  return filtered;
};

const getCompaniesCount = async (
  searchQuery: string,
  skills: string[]
): Promise<number> => {
  const data = CompaniesStore.read();
  return filterCompanies(data, searchQuery, skills).length;
};

const getCompanyById = async (id: string): Promise<ExistingCompany | null> => {
  const companies = CompaniesStore.read();
  return companies.find((c) => c.id === id) || null;
};

const getCompaniesByIds = async (ids: string[]): Promise<ExistingCompany[]> => {
  const companies = CompaniesStore.read();
  return companies.filter((c) => ids.includes(c.id));
};

const createCompany = async (newCompany: NewCompany): Promise<void> => {
  const companyWithId: ExistingCompany = {
    ...newCompany,
    id: crypto.randomUUID(),
  };
  CompaniesStore.create(companyWithId);
};

const updateCompany = async (updatedCompany: ExistingCompany): Promise<void> => {
  CompaniesStore.update(updatedCompany.id, updatedCompany);
};

const deleteCompany = async (companyId: string): Promise<void> => {
  CompaniesStore.delete(companyId);
};

// --- Hooks ---

export const useGetCompanies = (
  page: number,
  searchQuery = '',
  skills: string[] = []
): UseQueryResult<ExistingCompany[], unknown> & { count: number } => {
  const result = useQuery({
    queryKey: [COMPANIES_QUERIES.COMPANIES, page, searchQuery, skills],
    queryFn: () => getCompanies(page, searchQuery, skills),
  });

  return { ...result, count: result.data?.length ?? 0 };
};

export const useGetCompaniesCount = (
  searchQuery = '',
  skills: string[] = []
): UseQueryResult<number, unknown> => {
  return useQuery({
    queryKey: [COMPANIES_QUERIES.COMPANIES_COUNT, searchQuery, skills],
    queryFn: () => getCompaniesCount(searchQuery, skills),
  });
};

export const useGetCompanyById = (
  companyId: string
): UseQueryResult<ExistingCompany | null, unknown> => {
  return useQuery({
    queryKey: [COMPANIES_QUERIES.COMPANY_BY_ID, companyId],
    queryFn: () => getCompanyById(companyId),
  });
};

export const useGetCompaniesByIds = (
  companiesIds: string[]
): UseQueryResult<ExistingCompany[], unknown> => {
  return useQuery({
    queryKey: [COMPANIES_QUERIES.COMPANIES_BY_IDS, companiesIds],
    queryFn: () => getCompaniesByIds(companiesIds),
    initialData: [],
  });
};

export const useCreateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COMPANIES_QUERIES.COMPANIES] });
    },
  });
};

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COMPANIES_QUERIES.COMPANIES] });
    },
    onError: (err) => {
      console.error('Error updating company:', err);
    },
  });
};

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COMPANIES_QUERIES.COMPANIES] });
    },
  });
};
