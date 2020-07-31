import Fetcher from 'services/Fetcher'
import { AxiosInstance } from 'axios'

class BaseApiCall {
  private default: AxiosInstance

  private withAuth: AxiosInstance

  constructor() {
    this.default = Fetcher.default
    this.withAuth = Fetcher.withAuth
  }

  login(data) {
    return this.default.post(`/login`, data)
  }

  FAQ = {
    post: (data) => this.withAuth.post(`/common/faq`, data),
    put: (id, data) => this.withAuth.put(`/common/faq/${id}`, data),
    delete: (id) => this.withAuth.delete(`/common/faq/${id}`),
  }
}

const ApiCall = new BaseApiCall()

export default ApiCall
