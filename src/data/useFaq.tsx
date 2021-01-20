import { useQuery, UseQueryOptions } from 'react-query'
import ApiCall from 'services/ApiCall'
import useUrlQuery, { UseUrlQueryOptions } from 'helpers/QueryUrl/useUrlQuery'

interface FaqData {
  owner: {
    login: string
    avatar_url: string
  }
}

function useFaq(
  urlOptions?: UseUrlQueryOptions,
  options?: UseQueryOptions<FaqData>,
) {
  const urlQuery = useUrlQuery(urlOptions)
  const query = useQuery<FaqData>(
    urlQuery.transformKey('/common/faq'),
    () =>
      ApiCall.api
        .get(
          urlQuery.transformUrl(
            'https://api.github.com/repos/chornos13/nextjs-concept?isChecked=true&',
          ),
        )
        .then((res) => {
          return res.data
        }),
    options,
  )

  return {
    ...query,
    helpers: urlQuery,
  }
}

export default useFaq
