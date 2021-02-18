import axios, { AxiosError, AxiosInstance } from 'axios'
import { notification } from 'antd'

function showNotification(error: AxiosError) {
  const { method } = error.config

  const isSendMethod = ['post', 'put'].includes(method)

  function show() {
    notification.error({
      message: 'Error!',
      description: error?.response?.data?.message || error.message,
    })
  }

  /*
   if post or put method, isShowNotificationError must set to true to show notification error
   */
  if (isSendMethod && error.config?.isShowNotificationError === true) {
    show()
    return
  }

  /*
  if the method other than post and put for ex: like get method and
  isShowNotificationError must set to false to hide notification error
   */
  if (!isSendMethod && error.config?.isShowNotificationError !== false) {
    show()
  }
}

function createAuthAxios(
  baseURL: string,
  keyLocalStorage?: string,
): AxiosInstance {
  const instanceAxios = axios.create({
    baseURL,
  })

  if (keyLocalStorage) {
    instanceAxios.interceptors.request.use((config) => {
      const curConfig = { ...config }

      // ALWAYS READ UPDATED TOKEN
      try {
        curConfig.headers[keyLocalStorage] = localStorage.getItem(
          keyLocalStorage,
        )
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
      return curConfig
    })
  }

  instanceAxios.interceptors.response.use(
    function onSuccess(response) {
      return response
    },
    function onError(error: AxiosError) {
      showNotification(error)
      // const status = get(error, 'response.status', null)
      // if (status === 401) {
      //   window.localStorage.removeItem('tokenpublic')
      //   Router.replace('/').then(() => {
      //     window.location.reload()
      //   })
      //   return Promise.reject(error)
      // }
      //
      // notification.error({
      //   message: error.message,
      //   description: get(error, 'response.data.message', '-'),
      // })
      return Promise.reject(error)
    },
  )

  return instanceAxios
}

const Fetcher = {
  createAuthAxios,
}

export default Fetcher
