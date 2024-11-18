import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import categoryApi from 'src/apis/category.api'
import groupApi from 'src/apis/group.api'
import { CategoryDetail } from 'src/types/category.type'
import { UserGroupDetail } from 'src/types/group.type'

interface MemberContextType {
  members: UserGroupDetail[]
  setMembers: React.Dispatch<React.SetStateAction<UserGroupDetail[]>>
  reloadMembers: () => void
}

const MemberContext = createContext<MemberContextType | undefined>(undefined)

export const MemberProvider = ({ id, children }: { id: number; children: ReactNode }) => {
  const [members, setMembers] = useState<UserGroupDetail[]>([])
  const [reloadTrigger, setReloadTrigger] = useState(0)

  const reloadMembers = () => {
    setReloadTrigger((prev) => prev + 1)
  }

  useEffect(() => {
    const fetchMembers = async () => {
      const res = await groupApi.getAllMembersOfGroup(id)
      const data = res.data
      setMembers(data['results'] || [])
    }
    fetchMembers()
  }, [reloadTrigger, id])

  return <MemberContext.Provider value={{ members, setMembers, reloadMembers }}>{children}</MemberContext.Provider>
}

export const useMembers = () => {
  const context = useContext(MemberContext)
  if (!context) {
    throw new Error('useMembers must be used within a MemberProvider')
  }
  return context
}
