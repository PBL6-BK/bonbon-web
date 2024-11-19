import http from 'src/utils/http'

export const URL_POST_SUGGEST_BUDGET_DECISION =
  // 'https://bonbon.high10hunter.click/api/ai-assistance/suggest_budget_decision'
  '/ai-assistance/suggest_budget_decision'
const aiAssistanceApi = {
  getSuggestionPlan(savingsGoal: number) {
    return http.post(URL_POST_SUGGEST_BUDGET_DECISION, { savings_goal: savingsGoal })
  }
}

export default aiAssistanceApi
