import { RequestedGroup } from 'src/types/group.type'
import http from 'src/utils/http'

export const URL_GET_GROUP = '/groups/group/list'
export const URL_CREATE_GROUP = '/groups/group/create'
export const URL_UPDATE_GROUP = '/groups/group/update'
export const URL_DELETE_GROUP = '/groups/group/delete'
export const URL_GET_ALL_MEMBERS_GROUP = '/groups/user-group/list'
export const URL_GET_ALL_EVENTS_GROUP = '/groups/group-event/list'

const groupApi = {
  getAllGroups() {
    return http.get(URL_GET_GROUP)
  },
  createGroup(group: RequestedGroup) {
    return http.post(URL_CREATE_GROUP, group)
  },
  getAllMembersOfGroup(id: number) {
    return http.get(`${URL_GET_ALL_MEMBERS_GROUP}/${id}`)
  },
  getAllEventsOfGroup(id: number) {
    return http.get(`${URL_GET_ALL_EVENTS_GROUP}/${id}`)
  },
  deleteGroup(id: number) {
    return http.delete(`${URL_DELETE_GROUP}/${id}`)
  },
  updateGroup(id: number, group: RequestedGroup) {
    return http.put(`${URL_UPDATE_GROUP}/${id}`, group)
  }
}

export default groupApi
