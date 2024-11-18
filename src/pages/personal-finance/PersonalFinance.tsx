import { useEffect, useState } from 'react'
import Balance from './components/Balance'
import CategoryList from './components/CategoryList'
import SpendingList, { FilterType } from './components/SpendingList'
import { SpendingDetail } from 'src/types/spending.type'
import { CategoryProvider, useCategory } from 'src/contexts/category.context'
import spendingApi from 'src/apis/spending.api'
import DoughnutChart from './components/DoughnutChart'

function getWeek(date: Date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
}

export default function PersonalFinance() {
  const [spendingList, setSpendingList] = useState<SpendingDetail[]>([])
  const [income, setIncome] = useState<number>(0)
  const [outcome, setOutcome] = useState<number>(0)
  const [balance, setBalance] = useState<number>(0)

  const handleAddSpending = (spending: SpendingDetail) => {
    setSpendingList([spending, ...spendingList])

    if (spending.type === 'INCOME') {
      setIncome((prevIncome) => prevIncome + spending.amount)
      setBalance((prevBalance) => Math.round((prevBalance + spending.amount) * 100) / 100) // rounding to 2 decimal places
    } else {
      setOutcome((prevOutcome) => prevOutcome + spending.amount)
      setBalance((prevBalance) => Math.round((prevBalance - spending.amount) * 100) / 100) // rounding to 2 decimal places
    }
  }

  const handleUpdateSpending = (spending: SpendingDetail) => {
    let oldAmount = 0
    const newSpendingList = spendingList.map((item) => {
      if (item.id === spending.id) {
        oldAmount = item.amount || 0
        return spending
      }
      return item
    })

    setSpendingList(newSpendingList)

    if (spending.type === 'INCOME') {
      setIncome((income) => {
        const updatedIncome = income + spending.amount - oldAmount
        return parseFloat(updatedIncome.toFixed(2)) // Round to 2 decimal places
      })
    } else {
      setOutcome((outcome) => {
        const updatedOutcome = outcome + spending.amount - oldAmount
        return parseFloat(updatedOutcome.toFixed(2)) // Round to 2 decimal places
      })
    }
  }

  const handleDeleteSpending = (spending: SpendingDetail) => {
    const newSpendingList = spendingList.filter((item) => item.id !== spending.id)
    setSpendingList(newSpendingList)

    if (spending.type === 'INCOME') {
      setIncome((prevIncome) => prevIncome - spending.amount)
      setBalance((prevBalance) => Math.round((prevBalance - spending.amount) * 100) / 100) // rounding to 2 decimal places
    } else {
      setOutcome((prevOutcome) => prevOutcome - spending.amount)
      setBalance((prevBalance) => Math.round((prevBalance + spending.amount) * 100) / 100) // rounding to 2 decimal places
    }
  }

  const handleFilterSpending = async (filter: FilterType) => {
    const res = await spendingApi.getAllSpendings()
    const data = res.data
    let newSpendingList = data['results'] || []

    if (filter.categoryId !== 0)
      newSpendingList = newSpendingList.filter((item: SpendingDetail) => item.category_id === filter.categoryId)

    if (filter.time === 'This week') {
      newSpendingList = newSpendingList.filter(
        (item: SpendingDetail) => getWeek(new Date(item.time)) === getWeek(new Date())
      )
    } else if (filter.time === 'This month') {
      newSpendingList = newSpendingList.filter(
        (item: SpendingDetail) => new Date(item.time).getMonth() === new Date().getMonth()
      )
    } else if (filter.time === 'This year') {
      newSpendingList = newSpendingList.filter(
        (item: SpendingDetail) => new Date(item.time).getFullYear() === new Date().getFullYear()
      )
    }
    setSpendingList(newSpendingList)
  }

  useEffect(function () {
    const getSpendingList = async () => {
      const res = await spendingApi.getAllSpendings()
      const data = res.data
      const newSpendingList = data['results']?.filter(
        (item: SpendingDetail) => new Date(item.time).getMonth() === new Date().getMonth()
      )
      setSpendingList(newSpendingList || [])
    }
    getSpendingList()
  }, [])

  useEffect(
    function () {
      const getBalanceOverview = async () => {
        const res = await spendingApi.balanceOverview()
        const data = res.data
        setIncome(data['total_income'])
        setOutcome(data['total_outcome'])
        setBalance(data['balance'])
      }
      getBalanceOverview()
    },
    [balance, income, outcome]
  )

  return (
    <CategoryProvider>
      <div className='scrollbar-hide m-1 flex grid min-h-full grid-cols-12 gap-5 overflow-y-auto rounded-2xl bg-white p-5 py-2'>
        <div className='col-span-5 flex flex-col gap-5'>
          <div className='flex w-full items-center gap-3'>
            <Balance balance={balance} />
            <DoughnutChart income={income} outcome={outcome} />
          </div>
          <div className='flex h-[22.5rem] w-full flex-col gap-3 overflow-y-auto'>
            <CategoryList income={income} />
          </div>
        </div>
        <div className='scrollbar-hide col-span-7 flex h-[34rem] w-full flex-col gap-3 overflow-y-auto'>
          <SpendingList
            spendingList={spendingList}
            onUpdateSpending={handleUpdateSpending}
            onAddSpending={handleAddSpending}
            onDeleteSpending={handleDeleteSpending}
            onFilterSpending={handleFilterSpending}
          />
        </div>
      </div>
    </CategoryProvider>
  )
}
