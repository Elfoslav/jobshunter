import React, { useState } from 'react'
import Select, { MultiValue } from 'react-select'
import { Form, Button, InputGroup, FormControl, Col, Row } from 'react-bootstrap'
import { Search } from 'react-bootstrap-icons'
import useQueryParams from '../../components/useQueryParams'
import './JobsList.scss'
import SelectOption from '@/models/SelectOption'

interface JobsFilterParams {
  search: string
  skillsOptions: Array<SelectOption>
}

const JobsFilter: React.FC<JobsFilterParams> = ({ search, skillsOptions }) => {
  const { queryParams, setQueryParams } = useQueryParams<{
    page?: number,
    search?: string,
    skills?: string[]
  }>()

  const skillsStr = queryParams.get('skills')
  let defaultSkills: SelectOption[] = []
  if (skillsStr) {
    defaultSkills = skillsStr.split(',').map((skill) => ({
      label: skill,
      value: skill,
    }))
  }
  const [searchText, setSearchText] = useState(search);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(searchText, defaultSkills)
  }

  const onChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedSearchText = e.target.value
    setSearchText(() => updatedSearchText)
    console.log(updatedSearchText)
    setQueryParams({
      search: updatedSearchText,
      page: 1,
    })
  }

  const onSkillChange = (value: MultiValue<SelectOption>) => {
    setQueryParams({
      skills: value.map((skillOption) => skillOption.value),
      page: 1,
    })
  }

  return (
    <Form onSubmit={handleFormSubmit} className="mb-2-sm mb-1">
      <Row>
        <Col md={6} lg={3}>
          <InputGroup className="mb-2">
            <FormControl
              type="text"
              placeholder="Fulltext search..."
              aria-label="Search"
              aria-describedby="search-icon"
              value={searchText}
              onChange={onChangeSearchText}
            />
            <Button variant="outline-secondary" id="search-icon" type="submit">
              <Search />
            </Button>
          </InputGroup>
        </Col>

        <Col md={6} lg={4}>
          <Form.Group>
            <Select
              defaultValue={defaultSkills}
              options={skillsOptions}
              closeMenuOnSelect={false}
              isMulti
              placeholder="Select skills..."
              onChange={onSkillChange}
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default JobsFilter