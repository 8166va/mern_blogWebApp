//API_NOTIFICATION
export const API_NOTIFICATION={
loading:{
    title:'loading',
    msg:'please Wait! your request is loading'
},
success:{
    title:'success',
    msg:'data is successfully loaded'
},
responseFailure:{
    title:'Error',
    msg:'error occur while response'
},
requestFailure:{
    title:'Error',
    msg:'error occur while parsing or request'
},
networkError:{
    title:'Error',
    msg:'please check internet connectivity or try again later'
}
}

export const SERVICE_URL={
    //api service call
    //sample request
    //need service call url:'/',methods->post,get,put,delete
    userSignup:{url:'/signup',method:'POST'},
    userLogin:{url:'/login',method:'POST'},
    imageUpload:{url:'/file/upload',method:'POST'},
    createPost:{url:'/create',method:'POST'},
    displayPosts:{url:'/posts',method:'GET',params:true},
    getPostById:{url:'post',method:'GET',query:true},
    EditPost:{url:'update',method:'PUT',query:true},
    deletePost:{url:'delete',method:'DELETE',query:true},
    postComment:{url:'/comment/new',method:'POST'},
    getAllComments:{url:'comments',method:'GET',query:true},
    deleteComment:{url:'comment/delete',method:'DELETE',query:true}
}