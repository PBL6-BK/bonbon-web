import http from 'src/utils/http'

export const URL_POST_SUGGEST_BUDGET_DECISION = '/ai-assistance/suggest_budget_decision'
export const URL_POST_SUGGEST_BUDGET_MODIFICATION = '/ai-assistance/suggest_budget_modification'
export const URL_POST_SUGGEST_ASK = '/ai-assistance/ask'

const aiAssistanceApi = {
  suggestBudgetDecision(savingsGoal: number) {
    return http.post(URL_POST_SUGGEST_BUDGET_DECISION, { savings_goal: savingsGoal })
  },
  suggestBudgetModification(message: string) {
    return http.post(URL_POST_SUGGEST_BUDGET_MODIFICATION, { message: message })
  },
  ask(message: string) {
    return http.post(URL_POST_SUGGEST_ASK, { message: message })
  }
}

export default aiAssistanceApi
