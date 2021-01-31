// noinspection ES6UnusedImports
import axios from 'axios'

declare module 'axios' {
  // noinspection JSUnusedGlobalSymbols
  interface AxiosRequestConfig {
    isShowNotificationError?: boolean
  }
}
