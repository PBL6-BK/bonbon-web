import { faAngleLeft, faEllipsisV, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PATH_URL } from 'src/constants/path'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useRef, useState } from 'react'
import { RequestedGroup, UserGroupDetail } from 'src/types/group.type'
import groupApi from 'src/apis/group.api'
import { AppContextType, AppContext } from 'src/contexts/app.context'
import { toast } from 'react-toastify'
import ConfirmModal, { IConfirmModalRef } from 'src/components/common/ConfirmModal'
import { IFormModalRef } from 'src/components/common/FormModal'
import { Form } from 'antd'
import GroupForm from '../GroupForm'
import { useFieldValue } from 'src/shared/hook'
import MemberForm from '../MemberForm'

export default function SidePanel() {
  const { id } = useParams()
  const { user } = useContext<AppContextType>(AppContext)
  const location = useLocation()
  const navigate = useNavigate()

  const [group, setGroup] = useState(location.state)
  const [members, setMembers] = useState<UserGroupDetail[]>([])
  const [isOpenMember, setIsOpenMember] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const confirmModalRef = useRef<IConfirmModalRef>(null)
  const formModalRef = useRef<IFormModalRef>(null)
  const [editForm] = Form.useForm()
  const [addMemberForm] = Form.useForm()
  const addMemberFormModalRef = useRef<IConfirmModalRef>(null)

  const canEdit = members.find((mem: UserGroupDetail) => mem.user_id === user?.id)?.can_edit

  const updatedGroup: RequestedGroup = {
    name: useFieldValue('name', editForm),
    currency: useFieldValue('currency', editForm)
  }

  const memberIds = useFieldValue('member_ids', addMemberForm)

  const handleDeleteGroup = async () => {
    await groupApi.deleteGroup(Number(id))
    navigate(PATH_URL.groups)
    toast.success('Delete group successfully')
  }

  const handleUpdateGroup = async () => {
    await groupApi.updateGroup(Number(id), updatedGroup)
    setGroup(updatedGroup)
    toast.success('Update group successfully')
  }

  const handleAddMembers = async () => {
    await groupApi.addMemberToGroup(Number(id), memberIds)
    toast.success('Add members successfully')
  }

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  useEffect(() => {
    console.log(group)
    const getMembers = async () => {
      const res = await groupApi.getAllMembersOfGroup(Number(id))
      const data = res.data
      setMembers(data['results'])
    }
    getMembers()
  }, [id])

  return (
    <>
      <div
        className='flex items-center gap-2 hover:cursor-pointer'
        onClick={() => navigate(PATH_URL.groups)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            navigate(PATH_URL.groups)
          }
        }}
        role='button'
        tabIndex={0}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
        <span>All groups</span>
      </div>
      <div className='mt-3 flex items-center justify-between'>
        <h1>{group.name}</h1>
        <div
          className='relative col-span-1 text-right hover:cursor-pointer'
          onMouseEnter={toggleMenu}
          onMouseLeave={toggleMenu}
        >
          <FontAwesomeIcon icon={faEllipsisV} size='xl' className='hover:cursor-pointer' onClick={toggleMenu} />
          {isMenuOpen && (
            <div
              className='absolute right-0 top-0 z-10 mt-2 w-48 rounded-md bg-white p-2 shadow-lg'
              role='menu'
              tabIndex={0}
            >
              <ul className=''>
                <li className='p-2 hover:bg-[#e6f4ff]'>
                  <button
                    className={`w-full border-none bg-inherit text-left text-lg ${
                      canEdit ? 'cursor-pointer text-black' : 'text-gray-400'
                    }`}
                    onClick={() => formModalRef.current?.showModal()}
                    disabled={!canEdit}
                  >
                    Edit group
                  </button>
                  <GroupForm
                    title='Edit group'
                    modalRef={formModalRef}
                    formData={group}
                    form={editForm}
                    handleSubmit={handleUpdateGroup}
                  />
                </li>
                <li className='p-2 hover:bg-[#e6f4ff]'>
                  <button
                    className={`w-full border-none bg-inherit text-left text-lg ${
                      canEdit ? 'cursor-pointer text-black' : 'text-gray-400'
                    }`}
                    onClick={() => confirmModalRef.current?.showModal()}
                    disabled={!canEdit}
                  >
                    Delete group
                  </button>
                  <ConfirmModal title='Delete group' ref={confirmModalRef} onOk={handleDeleteGroup} />
                </li>
                <li className='p-2 hover:bg-[#e6f4ff]'>
                  <button
                    className={`w-full border-none bg-inherit text-left text-lg ${
                      canEdit ? 'cursor-pointer text-black' : 'text-gray-400'
                    }`}
                    onClick={() => addMemberFormModalRef.current?.showModal()}
                    disabled={!canEdit}
                  >
                    Add member
                  </button>
                  <MemberForm
                    title='Add new member'
                    members={members}
                    modalRef={addMemberFormModalRef}
                    form={addMemberForm}
                    handleSubmit={handleAddMembers}
                    handleCancel={() => addMemberForm.resetFields()}
                  />
                </li>
                <li className='p-2 hover:bg-[#e6f4ff]'>
                  <button
                    className={`w-full border-none bg-inherit text-left text-lg ${
                      canEdit ? 'cursor-pointer text-black' : 'text-gray-400'
                    }`}
                    disabled={!canEdit}
                  >
                    Remove member
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* <div className='mt-6'>
          <Input size='large' placeholder='large size' prefix='Search' />
        </div> */}
      <div className='mt-6'>
        {/* Header with toggle */}
        <div
          className='flex cursor-pointer items-center gap-3 text-xl'
          onClick={() => setIsOpenMember(!isOpenMember)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsOpenMember(!isOpenMember)
            }
          }}
          role='button'
          tabIndex={0}
        >
          <span>All members</span>
          <FontAwesomeIcon icon={faAngleDown} />
        </div>

        <ul
          className={`scrollbar-hide ms-5 mt-3 flex flex-col gap-2 overflow-y-auto text-lg ${
            isOpenMember ? 'max-h-[500px]' : 'max-h-0'
          }`}
        >
          {members.map((mem) => (
            <li key={mem.id} className='flex items-center gap-3'>
              <div
                className='h-8 w-8 rounded-full bg-[#6ac6ff]'
                style={{
                  backgroundImage: `url(${mem.avatar})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              {mem.full_name}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
