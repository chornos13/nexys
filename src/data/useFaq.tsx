import { useQuery, UseQueryOptions } from 'react-query'
import ApiCall from 'services/ApiCall'
import useUrlQuery from 'helpers/QueryUrl/useUrlQuery'

interface FaqData {
  owner: {
    login: string
    avatar_url: string
  }
}

function useFaq(options?: UseQueryOptions<FaqData>) {
  const queryUrl = useUrlQuery()

  const query = useQuery<FaqData>(
    queryUrl.transformKey('/common/faq'),
    () =>
      ApiCall.api
        .get(
          queryUrl.transformUrl(
            'https://api.github.com/repos/chornos13/nextjs-concept?',
          ),
        )
        .then((res) => {
          return res.data
        }),
    options,
  )

  return {
    ...query,
    helper: queryUrl,
  }
}

export default useFaq
