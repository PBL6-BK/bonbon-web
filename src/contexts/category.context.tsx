import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import categoryApi from 'src/apis/category.api'
import { CategoryDetail } from 'src/types/category.type'

interface CategoryContextType {
  categoryList: CategoryDetail[]
  setCategoryList: React.Dispatch<React.SetStateAction<CategoryDetail[]>>
  reloadCategories: () => void
  isLoading: boolean
}

// Create context with default values
const CategoryContext = createContext<CategoryContextType | undefined>(undefined)

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categoryList, setCategoryList] = useState<CategoryDetail[]>([])
  const [reloadTrigger, setReloadTrigger] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // Function to trigger re-fetch
  const reloadCategories = () => {
    setReloadTrigger((prev) => prev + 1) // Increment to trigger useEffect
  }

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true)
      try {
        const response = await categoryApi.getAllCategories()
        const data = response.data
        setCategoryList(data['results'] || [])
      } catch (error) {
        console.error('Failed to fetch categories', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCategories()
  }, [reloadTrigger])

  return (
    <CategoryContext.Provider value={{ categoryList, setCategoryList, reloadCategories, isLoading }}>
      {children}
    </CategoryContext.Provider>
  )
}

export const useCategory = () => {
  const context = useContext(CategoryContext)
  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider')
  }
  return context
}
