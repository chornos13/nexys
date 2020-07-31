import useParamSWR, { IConfigUseParamSWR } from 'hooks/useParamSWR'
import { ConfigInterface } from 'swr'
import get from 'lodash/get'

function useFaq(configs?: IConfigUseParamSWR, options?: ConfigInterface) {
  const swr = useParamSWR('/common/faq', configs, options)
  const { data } = swr

  const faqs = get(data, 'data', [])
  const total = get(data, 'total', faqs.length)

  return {
    ...swr,
    data: faqs,
    total,
  }
}

export default useFaq
