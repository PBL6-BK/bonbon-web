import { useRef } from 'react'
import CategoryItem from './CategoryItem'
import { IFormModalRef } from 'src/components/common/FormModal'
import { Form, FormInstance } from 'antd'
import CategoryForm from './CategoryForm'
import { CategoryDetail } from 'src/types/category.type'
import categoryApi from 'src/apis/category.api'
import { toast } from 'react-toastify'
import { useCategory } from 'src/contexts/category.context'
import { OrbitProgress } from 'react-loading-indicators'

export default function CategoryList({ income }: { income: number }) {
  const { categoryList, setCategoryList, reloadCategories, isLoading } = useCategory()
  const modalRef = useRef<IFormModalRef>(null)
  const [addForm] = Form.useForm()

  const useFieldValue = (fieldName: string, form: FormInstance) => {
    return Form.useWatch(fieldName, form)
  }

  const category: CategoryDetail = {
    id: Date.now(),
    name: useFieldValue('name', addForm),
    percentage: useFieldValue('percentage', addForm),
    icon: useFieldValue('icon', addForm)
  }

  const handleAddCategory = async () => {
    const res = await categoryApi.createCategory(category)
    const data = res.data
    setCategoryList([...categoryList, data])
    reloadCategories()
    toast.success('Add category successfully')
  }

  const handleUpdateCategory = async (id: number, category: CategoryDetail) => {
    await categoryApi.updateCategory(id, category)
    const newCategory = { ...category, id: id }
    const newCategoryList = categoryList.map((item) => {
      if (item.id === newCategory.id) {
        return category
      }
      return item
    })
    setCategoryList(newCategoryList)
    reloadCategories()
    toast.success('Update category successfully')
  }

  return (
    <>
      <div className='flex justify-between gap-3'>
        <h2>Category</h2>
        <button
          className='text-md rounded border-none bg-[#6ac6ff] p-2 font-bold text-black hover:cursor-pointer hover:bg-[#48baff]'
          onClick={() => modalRef.current?.showModal()}
        >
          + Add category
        </button>
        <CategoryForm
          modalRef={modalRef}
          form={addForm}
          categoryList={categoryList}
          income={income}
          title='Add category'
          handleCancel={modalRef.current?.closeModal}
          handleSubmit={handleAddCategory}
        />
      </div>
      <div className='scrollbar-hide m-1 flex h-full flex-wrap overflow-y-auto rounded-2xl border-none bg-[#e6f4ff] p-5'>
        {!isLoading &&
          categoryList.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              categoryList={categoryList}
              onUpdateCategory={handleUpdateCategory}
              income={income}
            />
          ))}
        {isLoading && (
          <div className='flex h-full w-full items-center justify-center'>
            <OrbitProgress color='#1da1f2' size='medium' text='' textColor='' />
          </div>
        )}
      </div>
    </>
  )
}
