import GroupEventList from './GroupEventList'
import GroupEvent from './GroupEventList'
import SidePanel from './SidePanel'

const GroupDetail = () => {
  // const { id } = useParams()
  // const location = useLocation()
  // const navigate = useNavigate()
  // const groupName = location.state?.groupName
  // const [members, setMembers] = useState<UserGroupDetail[]>([])

  return (
    <div className='scrollbar-hide m-1 flex grid min-h-full grid-cols-12 gap-3 overflow-y-auto rounded-2xl bg-white p-3'>
      <div className='col-span-3 h-[33.5rem] rounded-xl bg-gray-200 p-5'>
        <SidePanel />
      </div>
      <div className='col-span-9 rounded-xl bg-gray-200 p-2 text-lg'>
        <GroupEventList />
      </div>
    </div>
  )
}

export default GroupDetail
