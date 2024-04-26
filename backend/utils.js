

module.exports = (res,resp)=>{
  if(res.locals.accessToken) return  {resp, NewAccesstoken: res.locals.accessToken}
  return resp;
}
