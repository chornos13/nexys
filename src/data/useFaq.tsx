import { useQuery, QueryConfig } from 'react-query'

interface FaqData {
  owner: {
    login: string
    avatar_url: string
  }
}

function useFaq(queryConfig?: QueryConfig<FaqData>) {
  const query = useQuery<FaqData>(
    '/common/faq',
    () =>
      fetch(
        'https://api.github.com/repos/chornos13/nextjs-concept',
      ).then((res) => res.json()),
    queryConfig,
  )

  return {
    ...query,
  }
}

export default useFaq
