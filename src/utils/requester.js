import axios from 'axios';
import Qs from 'querystring';
import CONFIG from '../../config';
console.log(CONFIG);
export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};
export const request = (api,params,methods = METHODS.GET,jsonType = true) => {
  const requestOptions = {
    baseURL:CONFIG.API,
    url:api,
    methods:methods,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': jsonType ? 'application/json' : 'application/x-www-form-urlencoded',
    },
    withCredentials: true
  }
  if (methods == 'GET') {
    requestOptions.params = params;
    requestOptions.paramsSerializer = function(params) {
      return Qs.stringify(params);
    };
  }else{
    requestOptions.data = params;
    requestOptions.data = jsonType ? JSON.stringify(params) : qs.stringify(params);
  }
  return axios(requestOptions);
};