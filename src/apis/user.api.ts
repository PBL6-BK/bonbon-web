import http from 'src/utils/http'

export const URL_GET_USER = '/users/list'

const userApi = {
  getAllUsers() {
    return http.get(URL_GET_USER)
  }
}

export default userApi
