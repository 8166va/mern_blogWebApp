import axios from 'axios';
import {API_NOTIFICATION, SERVICE_URL} from "../constants/config";
import { getAccessToken ,getType} from '../utils/common-utils';
const apiURL='http://localhost:8000';
const axiosInstance = axios.create({
    baseURL:apiURL,
    timeout:10000,
    headers: {
      "content-type": "application/json"
}
  });
  axiosInstance.interceptors.request.use(
    function(config) {
      if(config.TYPE.params){
        config.params=config.TYPE.params
      }else if(config.TYPE.query)
      {
        config.url=config.url+'/'+config.TYPE.query;
      }
      return config;
  },
    function (error) {
      return Promise.reject(error);
    }
  );
  axiosInstance.interceptors.response.use(
    function (response) {
      return processResponse(response);
    },
    function (error) {
      return Promise.reject(ProcessError(error));
    }
  );
  const processResponse=(response)=>{
        if(response.status===200)
        {
          return {isSuccess:true,data:response.data}
        }else{
            return {
                isFailure:true,
                status:response?.status,
                msg:response?.msg,
                code:response?.code
            }
        }
  }
  const ProcessError=(error)=>{
    if(error.response){
      console.log('error in response ',JSON.stringify(error));
     return{
      isError:true,
      msg:API_NOTIFICATION.responseFailure,
      code:error.response.status
     }
    }else if(error.request){
       //connectivity issue
       console.log('error in request',JSON.stringify(error));
       return{
        isError:true,
        msg:API_NOTIFICATION.requestFailure,
        code:""
       }
    }else{
      console.log('error in network',JSON.stringify(error));
       //error in frontend
       return{
        isError:true,
        msg:API_NOTIFICATION.networkError,
        code:""
       }
    }
  }

  const API={};
  for(const [key,value] of Object.entries(SERVICE_URL))
  {
    API[key]=(body,showUploadProgress,showDownloadProgress)=>
      axiosInstance({
        method:value.method,
        url:value.url,
        data:value.method==='DELETE'?{}:body,
        responseType:value.responseType,
        headers:{
          authorization:getAccessToken()
        },
        TYPE:getType(value,body),
        onUploadProgress:function(progressEvent){
          if(showUploadProgress){
            let percentageCompleted=Math.round((progressEvent.loaded*100)/ProgressEvent.total);
            showUploadProgress(percentageCompleted);
          }
        },
        onDownloadProgress:function(progressEvent){
          if(showDownloadProgress){
            let percentageCompleted=Math.round((progressEvent.loaded*100)/ProgressEvent.total);
            showDownloadProgress(percentageCompleted);
          }
        }


      });
    }
    export {API};