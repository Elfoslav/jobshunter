// app/company/page.tsx or app/company-profile/page.tsx

'use client';

import { useCompanyUser } from '@/app/context/UserContext';
import Image from 'next/image';

export default function CompanyProfilePage() {
  const { user: company, isLoading } = useCompanyUser();

  if (isLoading) return <p>Loading...</p>;
  if (!company) return <p>Company not found or unauthorized.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-4">
        {company.logoUrl && (
          <Image
            src={company.logoUrl}
            alt={`${company.companyName} logo`}
            width={80}
            height={80}
            className="rounded-full"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold">{company.companyName}</h1>
          <p className="text-gray-600">{company.industry}</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {company.description && (
          <section>
            <h2 className="text-xl font-semibold">About Us</h2>
            <p>{company.description}</p>
          </section>
        )}

        <section>
          <h2 className="text-xl font-semibold">Company Info</h2>
          <ul className="list-disc list-inside">
            {company.website && (
              <li>
                Website:{' '}
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {company.website}
                </a>
              </li>
            )}
            {company.size && <li>Size: {company.size} employees</li>}
            {company.foundedYear && <li>Founded: {company.foundedYear}</li>}
            {company.headquarters && <li>HQ: {company.headquarters}</li>}
          </ul>
        </section>

        {company.techStack && company.techStack.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold">Tech Stack</h2>
            <p>{company.techStack.join(', ')}</p>
          </section>
        )}

        {company.socialLinks && (
          <section>
            <h2 className="text-xl font-semibold">Social Links</h2>
            <ul className="flex gap-4">
              {company.socialLinks.linkedIn && (
                <li>
                  <a
                    href={company.socialLinks.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    LinkedIn
                  </a>
                </li>
              )}
              {company.socialLinks.twitter && (
                <li>
                  <a
                    href={company.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Twitter
                  </a>
                </li>
              )}
              {company.socialLinks.facebook && (
                <li>
                  <a
                    href={company.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Facebook
                  </a>
                </li>
              )}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
