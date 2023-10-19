
import { Breadcrumb } from 'react-bootstrap'
import './Breadcrumb.scss'

interface BreadcrumbModel {
  link?: string
  title: string
}

interface BreadcrumbsParams {
  items: BreadcrumbModel[]
}

export default function Breadcrumbs({ items } : BreadcrumbsParams) {
  return (
    <Breadcrumb className="ms-3">
      {items.map((item, i) => (
        item.link
          ? <Breadcrumb.Item key={i} href={item.link}>{item.title}</Breadcrumb.Item>
          : <Breadcrumb.Item key={i} active>{item.title}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  )
}