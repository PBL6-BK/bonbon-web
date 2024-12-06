export interface CategoryData {
  category: string
  current_spending?: number
  budget?: number
  suggested_reduction?: number
  explanation?: string
}

interface Props {
  categoryData: CategoryData
}

export default function CategoryCard({ categoryData }: Props) {
  return (
    <div className='mt-4 rounded-lg border border-teal-200 bg-teal-100 p-4 shadow-sm'>
      <h4 className='text-lg font-semibold text-teal-800'>{categoryData.category}</h4>
      <div className='mt-2 text-lg text-gray-700'>
        {categoryData.current_spending && (
          <p>
            <span className='font-medium text-teal-600'>Current Spending:</span> $
            {categoryData.current_spending.toFixed(2)}
          </p>
        )}
        {categoryData.budget && (
          <p>
            <span className='font-medium text-teal-600'>Budget:</span> ${categoryData.budget.toFixed(2)}
          </p>
        )}
        {categoryData.suggested_reduction && (
          <p>
            <span className='font-medium text-teal-600'>Suggested Reduction:</span> $
            {categoryData.suggested_reduction.toFixed(2)}
          </p>
        )}
        {categoryData.explanation && <p>{categoryData.explanation}</p>}
      </div>
    </div>
  )
}
