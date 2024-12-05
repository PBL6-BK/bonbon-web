import { Currency } from './spending.type'

export type PersonalFinanceType = {
  balance: number
  fixed_income: number
  currency: string
  bank_account: string
  bank_name: string
}

export type FixedIncomeUpdateBody = {
  fixed_income: number
}

export type FixedOutcome = {
  id: number
  name: string
  amount: number
  currency: Currency
  category_id: number
  category_name: string
  category_icon: string
}

export type FixedOutComeBody = {
  name: string
  amount: number
  currency: Currency
  category_id: number
}
