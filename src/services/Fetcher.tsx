import axios, { AxiosInstance } from 'axios'
import { notification } from 'antd'
import get from 'lodash/get'
import Router from 'next/router'

const BASE_URL = process.env.BASE_URL_API || 'http://example.com'

function createAuthAxios(baseURL: string): AxiosInstance {
  const instanceAxios = axios.create({
    baseURL,
  })

  instanceAxios.interceptors.request.use((config) => {
    const curConfig = { ...config }

    // ALWAYS READ UPDATED TOKEN
    try {
      curConfig.headers.Authorization = localStorage.getItem('token')
    } catch (e) {
      console.log(e)
    }
    return curConfig
  })

  instanceAxios.interceptors.response.use(
    function onSuccess(response) {
      return response
    },
    function onError(error) {
      // console.log({ error })

      const status = get(error, 'response.status', null)
      if (status === 401) {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('data_user')
        Router.replace('/')
        return Promise.reject(error)
      }

      notification.error({
        message: error.message,
        description: get(error, 'response.data.message', '-'),
      })
      return Promise.reject(error)
    },
  )

  return instanceAxios
}

class MyFetcher {
  private axiosToken: AxiosInstance

  private axiosDefault: AxiosInstance

  constructor() {
    this.axiosToken = null
    this.axiosDefault = null
  }

  get default(): AxiosInstance {
    if (!this.axiosDefault) {
      this.axiosDefault = axios.create({
        baseURL: BASE_URL,
      })
      return this.axiosDefault
    }

    return this.axiosDefault
  }

  get withAuth(): AxiosInstance {
    if (!this.axiosToken) {
      this.axiosToken = createAuthAxios(BASE_URL)
      return this.axiosToken
    }
    return this.axiosToken
  }
}

const Fetcher = new MyFetcher()

export default Fetcher
