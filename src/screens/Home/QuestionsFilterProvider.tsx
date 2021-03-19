import React, {
  createContext,
  useState,
  useMemo,
  FC,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react'

import { QuestionWhereInput } from '../../graphql/__generated__/graphql-schema'


type ProviderValue = {
  where: QuestionWhereInput
  setWhere: Dispatch<SetStateAction<QuestionWhereInput>>
}

const FiltersContext = createContext<ProviderValue | null>(null)

export const useFiltersProvider = () => {
  const context = useContext(FiltersContext)

  if (context === null) {
    throw new Error('You probably forgot to put <FiltersProvider>.')
  }

  return context
}

export const useOrderForm = () => {
  const context = useFiltersProvider()

  return context.setWhere as QuestionWhereInput
}

export const FiltersProvider: FC = ({ children }) => {
  const [where, setWhere] = useState<QuestionWhereInput>({})

  const providerValue = useMemo(() => ({ where, setWhere }), [
    where,
    setWhere,
  ])

  return (
    <FiltersContext.Provider value={providerValue}>
      {children}
    </FiltersContext.Provider>
  )
}
