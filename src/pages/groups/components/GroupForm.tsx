import { Form, Input, Select } from 'antd'
import { FormInstance } from 'antd/lib'
import FormModal from 'src/components/common/FormModal'
import { CategoryDetail } from 'src/types/category.type'
import { useContext, useEffect, useState } from 'react'
import { User } from 'src/types/user.type'
import userApi from 'src/apis/user.api'
import { debounce } from 'lodash'
import { AppContextType, AppContext } from 'src/contexts/app.context'
import { Group, RequestedGroup } from 'src/types/group.type'
import { Currency } from 'src/types/spending.type'

interface Props {
  title: string
  modalRef: any
  form: FormInstance
  formData?: RequestedGroup
  handleSubmit?: () => void
  handleCancel?: () => void
}

const { Option } = Select

export default function GroupForm({ title, modalRef, form, formData, handleSubmit, handleCancel }: Props) {
  const { user } = useContext<AppContextType>(AppContext)
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users)
  const [userIds, setUserIds] = useState<number[]>([])

  const handleSearch = debounce((value: string) => {
    if (value) {
      setFilteredUsers(users.filter((user) => user.email.toLowerCase().includes(value.toLowerCase())))
    } else {
      setFilteredUsers(users)
    }
  }, 300)

  // Handle user selection
  const handleChange = (value: number[]) => {
    setUserIds(value)
  }

  // const tagRender = (props: any) => {
  //   const { label, value, closable, onClose } = props

  //   // Find user by ID for display name
  //   const selectedUser = users.find((user) => user.id === value)

  //   return (
  //     <span className='custom-tag rounded-2 me-1 rounded-md bg-gray-200 p-1'>
  //       {selectedUser ? selectedUser.email : label}{' '}
  //       <span onClick={onClose} style={{ marginLeft: 4, cursor: 'pointer' }}>
  //         ×
  //       </span>
  //     </span>
  //   )
  // }

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
          name='name'
          label='Name'
          initialValue={formData && formData.name}
          rules={[
            { required: true, message: 'Name is required' },
            { max: 30, message: 'Name cannot exceed 30 characters' }
          ]}
        >
          <Input maxLength={30} />
        </Form.Item>

        {!formData && (
          <Form.Item name='member_ids' label='Members' rules={[{ required: true }]}>
            <Select
              mode='multiple'
              placeholder='Search users by email'
              onSearch={handleSearch}
              onChange={handleChange}
              value={userIds}
              filterOption={false}
              // tagRender={tagRender}
              style={{ width: '100%' }}
            >
              {filteredUsers.map((user) => (
                <Option key={user.id} value={user.id}>
                  {/* <div className='flex items-center gap-3'>
                  <div
                    className='h-8 w-8 rounded-full bg-green-400'
                    style={{
                      backgroundImage: `url(${user.avatar})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div> */}
                  <p>{user.email}</p>
                  {/* </div> */}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
        <Form.Item
          name='currency'
          label='Currency'
          initialValue={formData ? formData.currency : Currency.VND}
          rules={[{ required: true }]}
        >
          <Select style={{ width: 120 }}>
            <Option value={Currency.VND}>VND</Option>
            <Option value={Currency.USD}>USD</Option>
          </Select>
        </Form.Item>
      </FormModal>
    </>
  )
}
