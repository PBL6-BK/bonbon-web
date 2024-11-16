import { Route, Routes } from 'react-router-dom'
import GroupList from './components/GroupList'
import GroupDetail from './components/group-detail/GroupDetail'

export default function Groups() {
  return (
    <Routes>
      <Route path='/' element={<GroupList />} />
      <Route path='/:id' element={<GroupDetail />} />
    </Routes>
  )
}
