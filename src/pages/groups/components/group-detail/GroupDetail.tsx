import { useParams } from 'react-router-dom'
import GroupEventList from '../group-event/GroupEventList'
import SidePanel from './SidePanel'
import { MemberProvider } from 'src/contexts/member.context'

const GroupDetail = () => {
  const { id } = useParams()

  return (
    <MemberProvider id={Number(id)}>
      <div className='scrollbar-hide m-1 grid min-h-full grid-cols-12 gap-3 overflow-y-auto rounded-2xl bg-white p-3'>
        <div className='col-span-3 h-[33.5rem] rounded-xl bg-[#e6f4ff] p-5'>
          <SidePanel />
        </div>
        <div className='col-span-9 rounded-xl bg-[#e6f4ff] text-lg'>
          <GroupEventList />
        </div>
      </div>
    </MemberProvider>
  )
}

export default GroupDetail
