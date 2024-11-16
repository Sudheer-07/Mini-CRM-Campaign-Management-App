import Axios from 'axios';
const BASE_URL =  'http://localhost:7000';
const AxiosInstance = Axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {},
});
const setAuthorizationToken = (token) => {
  AxiosInstance.defaults.headers.common.Authorization =
    token
      ? `Bearer ${token}`
      : "";
};
async function postMethod(endpoint, data) {
  return new Promise(resolve => {
    var config = {
      method: 'post',
      url: endpoint,
      data: data
    };
    AxiosInstance(config).then(response => {
      resolve(response.data);
    }, error => {
      resolve(error.response.data);
    })
  });
};

async function getMethod(path, params = {}) {
  return new Promise(resolve => {
    var config = {
      method: 'get',
      url: path,
      params: params
    };
    AxiosInstance(config).then(response => {
      resolve(response.data)
    },error => {
      if (!error.response || error.code === 'ECONNABORTED') {
        resolve({status:false,message:'error!'})
      }else{
        resolve(error.response)
      }
    })
  })
}
async function putMethod(path, data, params = {}) {
  return new Promise(resolve => {
    var config = {
      method: 'put',
      url: path,
      data:data,
      params: params
    };
    AxiosInstance(config).then(response => {
      resolve(response.data)
    },error => {
      if (!error.response || error.code === 'ECONNABORTED') {
        resolve({status:false,message:'error!'})
      }else{
        resolve(error.response.data)
      }
    })
  })
}
export { postMethod,putMethod,setAuthorizationToken, getMethod};
  
