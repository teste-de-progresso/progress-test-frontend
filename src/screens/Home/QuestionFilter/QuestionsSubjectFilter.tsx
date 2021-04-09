import React, { FC } from 'react'
import { gql, useQuery } from '@apollo/client'

import { Query } from '../../../graphql/__generated__/graphql-schema'
import { useFiltersProvider } from './QuestionsFilterProvider'

const SUBJECTS_QUERY = gql`
  query {
    subjects {
      id
      name
    }
  }
`

type Props = {
  register: any
}

export const QuestionsSubjectFilter: FC<Props> = ({ register }) => {
  const { where } = useFiltersProvider();
  const { loading, data } = useQuery<Query>(SUBJECTS_QUERY)

  if (loading) return null

  return (
    <div>
      <select
        ref={register}
        className="w-full rounded p-1 border-gray-400 border shadow-sm"
        name="subjectId"
        defaultValue={where.subjectId ?? ""}
      >
        <option value="" />
        {data?.subjects?.map((subject) => (
          <option
            key={`${subject.name}-${subject.id}`}
            value={subject.id}
          >
            {subject.name}
          </option>
        ))}
      </select>
    </div>
  )
}