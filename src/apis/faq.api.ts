import http from 'src/utils/http'

export const URL_FAQ = '/faq/FAQ/list'

const faqApi = {
  getFaq: () => {
    return http.get(URL_FAQ)
  }
}

export default faqApi
