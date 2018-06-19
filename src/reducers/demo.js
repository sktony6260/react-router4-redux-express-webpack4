import { handleActions } from 'redux-actions';
const initState = {
  posts:[],
  photos:[]
}
export default handleActions({
  'GET_POSTS':(state,action) => {
    let newState = {...state};
    if (!action.error) {
      newState.posts = [...action.payload.data];
      return newState
    }else{
      state;
    }
  },
  'GET_PHOTOS':(state,action) => {
    let newState = {...state};
    if (!action.error) {
      newState.photos = [...action.payload.data];
      return newState;
    }else{
      return state;
    }
  },
  'DEL_PHOTOS':(state,action) => {
    let newState = {...state};
    if (!action.error) {
      newState.photos = newState.photos.filter(o => o.id != action.meta);
      return newState;
    }else{
      return state;
    }
  }
},initState);