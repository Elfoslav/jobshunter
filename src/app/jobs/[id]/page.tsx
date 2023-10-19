'use client'

import Link from 'next/link'
import { Row, Col, Card, Container } from 'react-bootstrap'
import { GeoAltFill, GlobeAmericas, CashCoin } from 'react-bootstrap-icons'
import DOMPurify from 'dompurify'
import { useGetJobById, useGetSimilarJobs } from '@/services/jobs/JobsService'
import Skills from '../components/Skills'
import { getAgoString } from '@/lib/functions'
import { useUser } from '@/app/context/UserContext'
import Breadcrumbs from '@/app/components/Breadcrumbs'

export default function Page({ params }: { params: { id: string } }) {
  const { data: job, isLoading } = useGetJobById(params.id)
  const { data: similarJobs } = useGetSimilarJobs(job)
  const { user } = useUser()
  const breadcrumbs = [
    { link: '/', title: 'Jobs' },
    { title: job?.title || '' },
  ]

  if (isLoading) {
    return <Container>Loading...</Container>
  }

  if (!job) {
    return <Container>No job found with given ID: {params.id}</Container>
  }

  return (
    <div>
      <Breadcrumbs items={breadcrumbs} />

      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <h1>{job.title}</h1>
              <div>{job.company}</div>
              <div className="d-flex gap-3">
                <div className="d-flex align-items-center mb-1">
                  <GeoAltFill className="me-1"/> {job.location}
                </div>
                {job.isRemote &&
                  <div className="d-flex align-items-center mb-1">
                    <GlobeAmericas className="me-1"/> Remote {job.remotePercentage}%
                  </div>
                }
              </div>

              <div>
                <CashCoin /> ${job.salaryMin} - ${job.salaryMax}
              </div>

              <div className="mt-1 text-bold">
                {job.employmentTypes.map((employmentType, i) => (
                  <span key={i}>{employmentType}{job.employmentTypes.length !== i + 1 ? ', ' : ''}</span>
                ))}
              </div>

              <Skills skills={job.requiredSkills} user={user} primary className="mt-2" />
              <Skills skills={job.optionalSkills} user={user} className="mt-3 mb-2" />

              {similarJobs && similarJobs.length > 0 &&
                <div className="mt-3">
                  <h3 className="text-smaller">Similar jobs</h3>
                  {similarJobs.map((similarJob) => (
                    <div key={similarJob.id}>
                      <Link href={`/jobs/${similarJob.id}`}>
                        {similarJob.title}
                      </Link>
                    </div>
                  ))}
                </div>
              }

              <div className="mt-2">
                {getAgoString(job.postedAt)}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="mt-sm-4 mt-md-0">
            <Card.Body>
              <div
                className="mt-1"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job.description)}}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}