export type FaqType = {
  id: number
  name: string
  description: string
  question_and_answer: QA[]
}

export type QA = {
  id: number
  question: string
  answer: string
}
