import { useQuery, UseQueryOptions } from 'react-query'
import ApiCall from 'services/ApiCall'
import useUrlQuery, {
  UseUrlQueryOptions,
} from '@nexys/hooks/useUrlQuery/useUrlQuery'
import { AxiosError } from 'axios'

interface UseProfessionData {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

type UseProfessionResult = {
  data: UseProfessionData[]
  total: number
}

type TQueryFnData = UseProfessionResult
type TError = AxiosError

function useProfession(
  urlOptions?: UseUrlQueryOptions,
  options?: UseQueryOptions<TQueryFnData, TError>,
) {
  const urlQuery = useUrlQuery(urlOptions)
  const query = useQuery<TQueryFnData, TError>(
    urlQuery.transformKey('/profession'),
    () =>
      ApiCall.api
        .get(
          urlQuery.transformUrl('https://api.minangitcamp.com/v1/profession?'),
        )
        .then((res) => {
          return res.data
        }),
    {
      ...options,
    },
  )

  return {
    ...query,
    data: query.data?.data,
    total: query.data?.total,
    helpers: urlQuery,
  }
}

export default useProfession
