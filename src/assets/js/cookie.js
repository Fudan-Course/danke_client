/*用export把方法暴露出来*/
/*设置cookie*/
export function setCookie(c_name, value, session_id, expire) {
  console.log(value)
  console.log(session_id)
  var date=new Date()
  date.setSeconds(date.getSeconds()+expire)
  var ss = c_name + "=" + escape(value) + "; session_id=" + session_id + "; expires=" + date.toGMTString()
  // console.log(ss)
  document.cookie = c_name + "=" + escape(value) + ";session_id=\"" + session_id + "\";expires=" + date.toGMTString()
  console.log(document.cookie)
}

/*获取cookie*/
export function getCookie(c_name="user_id"){
  console.log(document.cookie)
  if (document.cookie.length>0){
    let c_start=document.cookie.indexOf(c_name + "=")
    if (c_start!=-1){
      c_start=c_start + c_name.length+1
      let c_end=document.cookie.indexOf(";",c_start)
      if (c_end==-1) c_end=document.cookie.length
      return unescape(document.cookie.substring(c_start,c_end))
    }
  }
  return ""
}


/*删除cookie*/
export function delCookie(c_name="user_id"){
  setCookie(c_name, "", -1, -1)
}
