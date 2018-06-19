// import axios from 'axios'
// export const METHODS = {
//   GET: 'GET',
//   POST: 'POST',
//   PUT: 'PUT',
//   PATCH: 'PATCH',
//   DELETE: 'DELETE',
// }
// const request = (url, params, method = METHODS.GET, isJsonType = true) => () => {
//   let _cache = null
//   const options = {
//     headers:{
//       'Content-type':isJsonType ? 'application/json' : 'application/x-www-form-urlencoded',
//       'X-Requested-With': 'XMLHttpRequest',
//     },
//     method,
//     withCredentials:true
//   }
//   return axios({ url, options });
// }
// const requestWrap = (prefix) => (url,...params) => {
//   url = prefix + url
//   return request(url,...params)
// }

// const jsonplaceholder = requestWrap('http://jsonplaceholder.typicode.com')

// export default {
//   getPosts:jsonplaceholder('/posts'),
//   getPhotos:jsonplaceholder('/photos'),
// }

import { createAction,createActions } from 'redux-actions';
import {request,METHODS} from 'utils/requester.js';
export default {
 getPosts:createAction('GET_POSTS',reqData => request('/api/posts',reqData)),
 getPhotos:createAction('GET_PHOTOS',reqData => request('/photos',reqData)),
 delPhotos:createAction('DEL_PHOTOS',id => request(`/photos/${id}`,undefined,METHODS.DELETE),id => id)
}