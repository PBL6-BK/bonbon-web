import { Currency } from './spending.type'
interface Group {
  id: number
  name: string
  currency: Currency
  created_by: number
  total_spent: number
  total_members: number
  members: UserGroupDetail[]
}

interface RequestedGroup {
  name: string
  currency: Currency
  member_ids?: number[]
}

interface UserGroupDetail {
  id: number
  user_id: number
  full_name: string
  avatar: string
  total_spent: number
  can_edit: boolean
  is_owner: boolean
}

interface EventGroup {
  id: number
  group_id: number
  name: string
  created_at: string
  updated_at: string
}

export type { Group, RequestedGroup, UserGroupDetail, EventGroup }
