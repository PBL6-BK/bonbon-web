import { Form, Input, Select } from 'antd'
import { FormInstance } from 'antd/lib'
import FormModal from 'src/components/common/FormModal'
import { CategoryDetail } from 'src/types/category.type'
import { useContext, useEffect, useState } from 'react'
import { User } from 'src/types/user.type'
import userApi from 'src/apis/user.api'
import { debounce } from 'lodash'
import { AppContextType, AppContext } from 'src/contexts/app.context'
import { Group, RequestedGroup, UserGroupDetail } from 'src/types/group.type'
import { Currency } from 'src/types/spending.type'

interface Props {
  title: string
  modalRef: any
  form: FormInstance
  members: UserGroupDetail[]
  handleSubmit?: () => void
  handleCancel?: () => void
}

const { Option } = Select

export default function MemberForm({ title, modalRef, form, members, handleSubmit, handleCancel }: Props) {
  const { user } = useContext<AppContextType>(AppContext)
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users)
  const [userIds, setUserIds] = useState<number[]>([])

  const getFullNameMemberById = (id: number) => {
    return members.find((member) => member.user_id === id)?.full_name
  }

  const handleSearch = debounce((value: string) => {
    if (value) {
      setFilteredUsers(users.filter((user) => user.email.toLowerCase().includes(value.toLowerCase())))
    } else {
      setFilteredUsers(users)
    }
  }, 300)

  const handleChange = (value: number[]) => {
    setUserIds(value)
  }

  useEffect(() => {
    const getAllUsers = async () => {
      const res = await userApi.getAllUsers()
      const data = res.data
      const otherUsers = data['results'].filter((other: User) => other.email !== user?.email)
      setUsers(otherUsers)
    }
    getAllUsers()
  }, [])

  return (
    <>
      <FormModal
        ref={modalRef}
        title={title}
        okText='OK'
        cancelText='Cancel'
        form={form}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      >
        <Form.Item
          name='member_ids'
          label='Users'
          rules={[
            {
              required: true,
              message: 'Please select at least one user.'
            },
            {
              validator: (_, selectedIds) => {
                const alreadyInGroup = selectedIds?.filter((id: number) =>
                  members.map((member) => member.user_id).includes(id)
                )
                if (alreadyInGroup && alreadyInGroup.length > 0) {
                  return Promise.reject(
                    new Error(
                      `Some users are already in the group: ${alreadyInGroup
                        .map((id: number) => getFullNameMemberById(id))
                        .join(', ')}`
                    )
                  )
                }
                return Promise.resolve()
              }
            }
          ]}
        >
          <Select
            mode='multiple'
            placeholder='Search users by email'
            onSearch={handleSearch}
            onChange={handleChange}
            value={userIds}
            filterOption={false}
            style={{ width: '100%' }}
          >
            {filteredUsers.map((user) => (
              <Option key={user.id} value={user.id}>
                <p>{user.email}</p>
              </Option>
            ))}
          </Select>
        </Form.Item>
      </FormModal>
    </>
  )
}
