import Fetcher from 'services/Fetcher'
import { AxiosInstance } from 'axios'
import { BASE_API_URL } from 'constant'

class BaseApiCall {
  public api: AxiosInstance

  constructor() {
    this.api = Fetcher.createAuthAxios(BASE_API_URL, 'token')
  }

  login(data) {
    return this.api.post(`/login`, data)
  }
}

const ApiCall = new BaseApiCall()

export default ApiCall
