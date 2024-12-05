import { FixedOutComeBody } from 'src/types/settings.type'
import http from 'src/utils/http'

export const URL_GET_PERSONAL_FINANCE = '/settings/get_personal_finance'
export const URL_GET_BANKING = '/settings/get_user_banking'
export const URL_UPDATE_FIXED_INCOME = '/settings/fixed_income_update'
export const URL_GET_FIXED_OUTCOME = '/settings/list_fixed_outcome'
export const URL_UPDATE_USER_BANKING = '/settings/update_user_banking'
export const URL_CREATE_FIXED_OUTCOME = '/settings/create_fixed_outcome'

const settingsApi = {
  getPersonalFinance: () => {
    return http.get(URL_GET_PERSONAL_FINANCE)
  },
  getBankingInfomation: () => {
    return http.get<{ bank_account: string; bank_name: string }>(URL_GET_BANKING)
  },
  getFixedOutcome: () => {
    return http.get(URL_GET_FIXED_OUTCOME)
  },
  updateFixedIncome: (fixedIncomeUpdate: number) => {
    return http.put(URL_UPDATE_FIXED_INCOME, { fixed_income: fixedIncomeUpdate })
  },
  updateUserBanking: (userBanking: { bank_account: string; bank_name: string }) => {
    return http.patch(URL_UPDATE_USER_BANKING, userBanking)
  },
  createFixedOutcome: (fixedOutcomeList: FixedOutComeBody[]) => {
    return http.post(URL_CREATE_FIXED_OUTCOME, { fixed_outcomes: fixedOutcomeList })
  }
}

export default settingsApi
