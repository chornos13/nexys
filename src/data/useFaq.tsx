import { useQuery, UseQueryOptions } from 'react-query'

interface FaqData {
  owner: {
    login: string
    avatar_url: string
  }
}

function useFaq(options?: UseQueryOptions<FaqData>) {
  const query = useQuery<FaqData>(
    '/common/faq',
    () =>
      fetch(
        'https://api.github.com/repos/chornos13/nextjs-concept',
      ).then((res) => res.json()),
    options,
  )

  return {
    ...query,
  }
}

export default useFaq
