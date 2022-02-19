function sendSms(){var mobile=$('#mobile_phone').val();var flag=$('#flag').val();$.post("sms.php?act=send&flag="+flag,{"mobile":mobile},function(result){if(result.code==2){RemainTime();swal({text:('OTP code has been sent to your mobile'),type:'success',confirmButtonColor:'#ff6700',})}else{if(result.msg){swal({text:(result.msg),type:'error',confirmButtonColor:'#ff6700',})}else{swal({text:('Mobile verification code failed to send'),type:'error',confirmButtonColor:'#ff6700',})}}},"json");}
function register2(){var status=true;var mobile=$('#mobile_phone').val();var mobile_pwd=$('#mobile_pwd').val();var mobile_code=$('#mobile_code').val();if(mobile.length==''){swal({text:('Please enter your mobile number.'),type:'error',confirmButtonColor:'#ff6700',})
return false;}
if(mobile_pwd.length==''){swal({text:('Please enter your password.'),type:'error',confirmButtonColor:'#ff6700',})
return false;}
if(mobile_code.length==''){swal({text:('Please enter your mobile verification code'),type:'error',confirmButtonColor:'#ff6700',})
return false;}
if(!$("#agreement").attr("checked")){swal({text:('Please read the user agreement and tick agree'),type:'error',confirmButtonColor:'#ff6700',})
return false;}
$.ajax({type:"POST",url:"sms.php?act=check",data:"mobile="+mobile+"&mobile_code="+mobile_code+"&flag=register",dataType:"json",async:false,success:function(result){if(result.code!=2){swal({text:(result.msg),type:'error',confirmButtonColor:'#ff6700',})
status=false;}}});return status;}
function submitForget(){var status=true;var mobile=$('#mobile_phone').val();var mobile_code=$('#mobile_code').val();if(mobile.length==''){swal({text:('Please enter your mobile number.'),type:'error',confirmButtonColor:'#ff6700',})
return false;}
if(mobile_code.length==''){swal({text:('Please enter your phone verification code'),type:'error',confirmButtonColor:'#ff6700',})
return false;}
$.ajax({type:"POST",url:"sms.php?act=check",data:"mobile="+mobile+"&mobile_code="+mobile_code,dataType:"json",async:false,success:function(result){if(result.code!=2){swal({text:(result.msg),type:'error',confirmButtonColor:'#ff6700',})
status=false;}}});return status;}
var iTime=59;var Account;function RemainTime(){document.getElementById('zphone').disabled=true;var iSecond,sSecond="",sTime="";if(iTime>=0){iSecond=parseInt(iTime%60);if(iSecond>=0){sSecond=iSecond+"Second";}
sTime=sSecond;if(iTime==0){clearTimeout(Account);sTime='Get your phone verification code';iTime=59;document.getElementById('zphone').disabled=false;}else{Account=setTimeout("RemainTime()",1000);iTime=iTime-1;}}else{sTime='No countdown';}
document.getElementById('zphone').value=sTime;}