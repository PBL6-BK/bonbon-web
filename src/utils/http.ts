import axios, { AxiosError, type AxiosInstance } from 'axios'
import {
  clearLS,
  getAccessTokenFromLS,
  getProfileFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from './auth'
import config from '../configs'
import { ErrorResponse } from 'src/types/utils.type'
import { RefreshTokenResponse } from 'src/types/auth.type'
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from 'src/apis/auth.api'
import { isAxiosBadRequestError, isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './utils'
import { SECONDS_IN_DAY } from 'src/shared/constant'
import { User } from 'src/types/user.type'
import { toast } from 'react-toastify'

export class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private user: User
  private refreshTokenRequest: Promise<string> | null
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.refreshToken = getRefreshTokenFromLS()
    this.user = getProfileFromLS()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 40000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': SECONDS_IN_DAY,
        'expire-refresh-token': SECONDS_IN_DAY * 160
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        console.log('config', config)

        if (this.accessToken && config.headers) {
          config.headers.authorization = `Bearer ${this.accessToken}`
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === URL_LOGIN || url === URL_REGISTER) {
          const data = response.data
          const user = {
            id: data.id,
            email: data.email,
            fullName: data.name,
            avatar: data.avatar
          }

          this.accessToken = data.access_token
          this.refreshToken = data.refresh_token
          this.user = user
          setAccessTokenToLS(this.accessToken)
          setRefreshTokenToLS(this.refreshToken)
          setProfileToLS(this.user)
        } else if (url === URL_LOGOUT) {
          this.accessToken = ''
          this.refreshToken = ''
          clearLS()
        }
        return response
      },
      (error: AxiosError) => {
        // Only toast error not 422 and 401
        // if (
        //   ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        // ) {
        //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
        //   const data: any | undefined = error.response?.data
        //   const message = data?.message || error.message
        //   console.log(`Error ${message}`)
        // }

        /**
        Unauthorized (401) has many cases
           - Token is incorrect
           - Not pass token
           - Token is expired
        */

        // If the error code is 401
        if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {
          const config = error.response?.config
          /**
           * Only in case the token is expired and the request is not a refresh token request then we proceed to call the refresh token
           */

          if (isAxiosExpiredTokenError(error) && config?.url !== URL_REFRESH_TOKEN) {
            // Prevent calling handleRefreshToken multiple times
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  // Hold refreshTokenRequest for 10s to use for the next requests if there is a 401 status code
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10000)
                })
            return this.refreshTokenRequest.then((accessToken) => {
              // Replay the old request with the new token
              return this.instance({ ...config, headers: { ...config?.headers, authorization: accessToken } })
            })
          }

          /**
           * In the following cases:
           * - Token is incorrect
           * - Token is not passed
           * - Token is expired but the refresh token request is failed
           * Then we proceed to clear local storage and toast the message
           */

          clearLS()
          this.accessToken = ''
          this.refreshToken = ''
          console.log(`Error ${error.response?.data.data?.message || error.response?.data.message}`)
          // window.location.reload()
        } else if (isAxiosBadRequestError<ErrorResponse<{ name: string; message: string }>>(error)) {
          toast.error(error.response?.data.data?.message || error.response?.data.message)
        }
        return Promise.reject(error)
      }
    )
  }
  private handleRefreshToken() {
    return this.instance
      .post<RefreshTokenResponse>(URL_REFRESH_TOKEN, {
        token: this.refreshToken
      })
      .then((res) => {
        const { token } = res.data.data
        setAccessTokenToLS(token)
        this.accessToken = token
        return token
      })
      .catch((error) => {
        clearLS()
        this.accessToken = ''
        this.refreshToken = ''
        throw error
      })
  }
}

const http = new Http().instance
export default http
