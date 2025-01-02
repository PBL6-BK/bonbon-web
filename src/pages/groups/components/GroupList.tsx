import { useEffect, useRef, useState } from 'react'
import GroupItem from './GroupItem'
import groupApi from 'src/apis/group.api'
import { RequestedGroup, Group } from 'src/types/group.type'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { IFormModalRef } from 'src/components/common/FormModal'
import { Form } from 'antd'
import GroupForm from './GroupForm'
import { useFieldValue } from 'src/shared/hook'
import { toast } from 'react-toastify'
import { OrbitProgress } from 'react-loading-indicators'

const colors = [
  'bg-blue-200',
  'bg-indigo-200',
  'bg-sky-200',
  'bg-teal-200',
  'bg-orange-200',
  'bg-yellow-200',
  'bg-amber-200',
  'bg-[#6ac6ff]',
  'bg-lime-200',
  'bg-emerald-200',
  'bg-teal-200',
  'bg-red-200',
  'bg-pink-200',
  'bg-stone-200',
  'bg-teal-200',
  'bg-cyan-200',
  'bg-rose-200',
  'bg-purple-200',
  'bg-violet-200',
  'bg-fuchsia-200',
  'bg-pink-200',
  'bg-rose-200',
  'bg-[#e6f4ff]',
  'bg-zinc-200',
  'bg-neutral-200',
  'bg-blue-300',
  'bg-indigo-300',
  'bg-light-blue-300',
  'bg-sky-300',
  'bg-teal-300',
  'bg-green-300',
  'bg-lime-300',
  'bg-emerald-300',
  'bg-teal-300',
  'bg-red-300',
  'bg-pink-300',
  'bg-rose-300',
  'bg-orange-300',
  'bg-yellow-300',
  'bg-amber-300',
  'bg-purple-300',
  'bg-violet-300',
  'bg-fuchsia-300',
  'bg-pink-300',
  'bg-rose-300',
  'bg-[#e6f4ff]',
  'bg-[#e6f4ff]',
  'bg-neutral-300',
  'bg-stone-300',
  'bg-teal-300',
  'bg-cyan-300'
]

export default function GroupList() {
  const [groups, setGroups] = useState<Group[]>([])
  const modalRef = useRef<IFormModalRef>(null)
  const [addForm] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)

  const newGroup: RequestedGroup = {
    name: useFieldValue('name', addForm),
    currency: useFieldValue('currency', addForm),
    member_ids: useFieldValue('member_ids', addForm)
  }

  const handleAddGroup = async () => {
    const res = await groupApi.createGroup(newGroup)
    const data = res.data
    setGroups([{ ...data, total_spent: 0, total_members: data.members.length }, ...groups])
    toast.success('Create group successfully')
  }

  useEffect(() => {
    const getUserGroups = async () => {
      setIsLoading(true)
      try {
        const res = await groupApi.getAllGroups()
        const data = res.data
        console.log(data)
        setGroups(data['results'] || [])
      } finally {
        setIsLoading(false)
      }
    }
    getUserGroups()
  }, [])

  return (
    <div className='scrollbar-hide m-1 flex min-h-full overflow-y-auto rounded-2xl bg-white p-5'>
      <div className='flex w-full flex-wrap gap-x-5'>
        {!isLoading &&
          groups.map((group, index) => {
            return <GroupItem key={group.id} group={group} backgroundColor={colors[index % colors.length]} />
          })}
        {isLoading && (
          <div className='flex h-full w-full items-center justify-center'>
            <OrbitProgress color='#1da1f2' size='medium' text='' textColor='' />
          </div>
        )}
      </div>
      <div className='h-[32.5rem]'></div>
      <div className='fixed bottom-5 right-5 z-50 m-3 flex flex-col items-center'>
        <div className='flex flex-col items-center space-y-2'>
          <button
            className='shadow-3xl flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border-none bg-[#48baff] text-white'
            onClick={modalRef.current?.showModal}
          >
            <FontAwesomeIcon icon={faPlus} size='3x' />
          </button>
        </div>
      </div>
      <GroupForm
        modalRef={modalRef}
        form={addForm}
        title='Create new group'
        handleCancel={modalRef.current?.closeModal}
        handleSubmit={handleAddGroup}
      />
    </div>
  )
}
