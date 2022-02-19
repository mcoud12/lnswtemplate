function userEdit()
{var frm=document.forms['formEdit'];var email=frm.elements['email'].value;var msg='';var reg=null;var passwd_answer=frm.elements['passwd_answer']?Utils.trim(frm.elements['passwd_answer'].value):'';var sel_question=frm.elements['sel_question']?Utils.trim(frm.elements['sel_question'].value):'';var mobile_phone=frm.elements['extend_field5']?Utils.trim(frm.elements['extend_field5'].value):'';if(email.length==0)
{msg+=email_empty+'<br>';}
else
{if(!(Utils.isEmail(email)))
{msg+=email_error+'<br>';}}
if(mobile_phone.length==0)
{msg+=mobile_empty+'<br>';}
else
{if(!(Utils.isMobile(mobile_phone)))
{msg+=mobile_error+'<br>';}}
if(passwd_answer.length>0&&sel_question==0||document.getElementById('passwd_quesetion')&&passwd_answer.length==0)
{msg+=no_select_question+'<br>';}
for(i=7;i<frm.elements.length-2;i++)
{needinput=document.getElementById(frm.elements[i].name+'i')?document.getElementById(frm.elements[i].name+'i'):'';if(needinput!=''&&frm.elements[i].value.length==0)
{msg+='- '+needinput.innerHTML+msg_blank+'<br>';}}
if(msg.length>0)
{swal({title:'Oops!',html:(msg),background:'rgba(0,0,0,.7)',confirmButtonColor:'#ff6700',confirmButtonText:'Yes',confirmButtonColor:'#fff',})
return false;}
else
{return true;}}
function editPassword()
{var frm=document.forms['formPassword'];var old_password=frm.elements['old_password'].value;var new_password=frm.elements['new_password'].value;var confirm_password=frm.elements['comfirm_password'].value;var msg='';var reg=null;if(old_password.length==0)
{msg+=old_password_empty+'<br>';}
if(new_password.length==0)
{msg+=new_password_empty+'<br>';}
if(confirm_password.length==0)
{msg+=confirm_password_empty+'<br>';}
if(new_password.length>0&&confirm_password.length>0)
{if(new_password!=confirm_password)
{msg+=both_password_error+'<br>';}}
if(msg.length>0)
{swal({title:'Oops!',html:(msg),background:'rgba(0,0,0,.7)',confirmButtonText:'Okay',confirmButtonColor:'#fff',})
return false;}
else
{return true;}}
function submitMsg()
{var frm=document.forms['formMsg'];var msg_title=frm.elements['msg_title'].value;var msg_content=frm.elements['msg_content'].value;var msg='';if(msg_title.length==0)
{msg+=msg_title_empty+'\n';}
if(msg_content.length==0)
{msg+=msg_content_empty+'\n'}
if(msg_title.length>200)
{msg+=msg_title_limit+'\n';}
if(msg.length>0)
{swal({text:(msg),type:'error',confirmButtonColor:'#ff6700',})
return false;}
else
{return true;}}
function checkRecoveryEmail(email)
{var logform=$('form[name="getPassword"]');var error=logform.find('#recovery_notice');var submit_disabled=false;if(email=='')
{error.css({'display':'block'});$('form[name="getPassword"]').find('.regbox .recovery_email .labelbox').removeClass("form_success");$('form[name="getPassword"]').find('.regbox .recovery_email .labelbox').addClass("err_label");error.find('#recovery_notice_text').html('Please enter your email address.');submit_disabled=true;}
else if(!Utils.isEmail(email))
{error.css({'display':'block'});$('form[name="getPassword"]').find('.regbox .recovery_email .labelbox').removeClass("form_success");$('form[name="getPassword"]').find('.regbox .recovery_email .labelbox').addClass("err_label");error.find('#recovery_notice_text').html('The email address you entered is invalid.');submit_disabled=true;}
if(submit_disabled)
{document.forms['getPassword'].elements['Submit'].disabled='disabled';return false;}
Ajax.call('user.php?act=check_email','email='+email,check_recovery_email_callback,'GET','TEXT',true,true);}
function check_recovery_email_callback(result)
{var logform=$('form[name="getPassword"]');var error=logform.find('#recovery_notice');var res=result.trim();if(res=='ok')
{error.css({'display':'block'});error.find('#recovery_notice_text').html('Email address is not associated with any account.');$('form[name="getPassword"]').find('.regbox .recovery_email .labelbox').removeClass("form_success");$('form[name="getPassword"]').find('.regbox .recovery_email .labelbox').addClass("err_label");document.forms['getPassword'].elements['Submit'].disabled='disabled';}
else
{error.css({'display':'none'});$('form[name="getPassword"]').find('.regbox .recovery_email .labelbox').removeClass("err_label");$('form[name="getPassword"]').find('.regbox .recovery_email .labelbox').addClass("form_success");document.forms['getPassword'].elements['Submit'].disabled='';}}
function submitPwdInfo()
{var frm=document.forms['getPassword'];var email=frm.elements['email'].value;var errorMsg='';if(email.length==0)
{errorMsg+=email_address_empty+'\n';$('form[name="getPassword"]').find('#recovery_notice').css('display','block');$('form[name="getPassword"]').find('#recovery_notice_text').html('Please enter your email address.');$('form[name="getPassword"]').find('.regbox .recovery_email .labelbox').removeClass("form_success");$('form[name="getPassword"]').find('.regbox .recovery_email .labelbox').addClass("err_label");}
else
{if(!(Utils.isEmail(email)))
{$('form[name="getPassword"]').find('#recovery_notice').css('display','block');$('form[name="getPassword"]').find('#recovery_notice_text').html('The email address you entered is invalid.');$('form[name="getPassword"]').find('.regbox .recovery_email .labelbox').removeClass("form_success");$('form[name="getPassword"]').find('.regbox .recovery_email .labelbox').addClass("err_label");errorMsg+=email_address_error+'\n';}}
if(errorMsg.length>0)
{return false;}
return true;}
function check_recovery_password(new_password)
{var logform=$('form[name="getPassword2"]');var error=logform.find('#recovery_password_notice');if(new_password.length<6)
{error.css({'display':'block'});error.find('#recovery_password_notice_text').html('Password can not be less than 6 characters.');$('form[name="getPassword2"]').find('.regbox .recovery_password_new .labelbox').removeClass("form_success");$('form[name="getPassword2"]').find('.regbox .recovery_password_new .labelbox').addClass("err_label");document.forms['getPassword2'].elements['Submit'].disabled='disabled';}
else
{error.css({'display':'none'});$('form[name="getPassword2"]').find('.regbox .recovery_password_new .labelbox').addClass("form_success");document.forms['getPassword2'].elements['Submit'].disabled='';}}
function check_recovery_conform_password(confirm_password)
{var logform=$('form[name="getPassword2"]');var error=logform.find('#recovery_confirm_password_notice');password=document.getElementById('new_password').value;if(confirm_password.length<6)
{error.css({'display':'block'});error.find('#recovery_confirm_password_notice_text').html('Password can not be less than 6 characters.');$('form[name="getPassword2"]').find('.regbox .recovery_password_confirm_new .labelbox').removeClass("form_success");$('form[name="getPassword2"]').find('.regbox .recovery_password_confirm_new .labelbox').addClass("err_label");document.forms['getPassword2'].elements['Submit'].disabled='disabled';return false;}
if(confirm_password!=password)
{error.css({'display':'block'});error.find('#recovery_confirm_password_notice_text').html('Password confirmation does not match password.');$('form[name="getPassword2"]').find('.regbox .recovery_password_confirm_new .labelbox').removeClass("form_success");$('form[name="getPassword2"]').find('.regbox .recovery_password_confirm_new .labelbox').addClass("err_label");document.forms['getPassword2'].elements['Submit'].disabled='disabled';}
else
{error.css({'display':'none'});$('form[name="getPassword2"]').find('.regbox .recovery_password_confirm_new .labelbox').addClass("form_success");document.forms['getPassword2'].elements['Submit'].disabled='';}}
function submitPwd()
{var frm=document.forms['getPassword2'];var password=frm.elements['new_password'].value;var confirm_password=frm.elements['confirm_password'].value;var errorMsg='';if(password.length==0)
{errorMsg+=new_password_empty+'\n';$('form[name="getPassword2"]').find('#recovery_password_notice').css('display','block');$('form[name="getPassword2"]').find('#recovery_password_notice_text').html('Please enter your new password.');$('form[name="getPassword2"]').find('.regbox .recovery_password_new .labelbox').removeClass("form_success");$('form[name="getPassword2"]').find('.regbox .recovery_password_new .labelbox').addClass("err_label");}
if(confirm_password.length==0)
{errorMsg+=confirm_password_empty+'\n';$('form[name="getPassword2"]').find('#recovery_confirm_password_notice').css('display','block');$('form[name="getPassword2"]').find('#recovery_confirm_password_notice_text').html('Please confrim your new password.');$('form[name="getPassword2"]').find('.regbox .recovery_password_confirm_new .labelbox').removeClass("form_success");$('form[name="getPassword2"]').find('.regbox .recovery_password_confirm_new .labelbox').addClass("err_label");}
if(confirm_password!=password)
{errorMsg+=both_password_error+'\n';$('form[name="getPassword2"]').find('#recovery_confirm_password_notice').css('display','block');$('form[name="getPassword2"]').find('#recovery_confirm_password_notice_text').html('Password confirmation does not match password.');$('form[name="getPassword2"]').find('.regbox .recovery_password_confirm_new .labelbox').removeClass("form_success");$('form[name="getPassword2"]').find('.regbox .recovery_password_confirm_new .labelbox').addClass("err_label");}
if(errorMsg.length>0)
{return false;}
else
{return true;}}
function addBooking()
{var frm=document.forms['formBooking'];var goods_id=frm.elements['id'].value;var rec_id=frm.elements['rec_id'].value;var number=frm.elements['number'].value;var desc=frm.elements['desc'].value;var linkman=frm.elements['linkman'].value;var email=frm.elements['email'].value;var tel=frm.elements['tel'].value;var msg="";if(number.length==0)
{msg+=booking_amount_empty+'\n';$('form[name="formBooking"]').find('#linkqty_notice').css('display','block');$('form[name="formBooking"]').find('#linkqty_text').html('Please enter your desired quantity!');}
else
{var reg=/^[0-9]+/;if(!reg.test(number))
{msg+=booking_amount_error+'\n';$('form[name="formBooking"]').find('#linkqty_notice').css('display','block');$('form[name="formBooking"]').find('#linkqty_text').html('Please enter a valid format of quantity!');}}
if(linkman.length==0)
{msg+=contact_username_empty+'\n';$('form[name="formBooking"]').find('#linkman_notice').css('display','block');$('form[name="formBooking"]').find('#linkman_notice_text').html('Please enter your name.');}
if(email.length==0)
{msg+=email_empty+'\n';$('form[name="formBooking"]').find('#linkemail_notice').css('display','block');$('form[name="formBooking"]').find('#linkemail_notice_text').html('Please enter your email.');}
else
{if(!(Utils.isEmail(email)))
{msg+=email_error+'\n';$('form[name="formBooking"]').find('#linkemail_notice').css('display','block');$('form[name="formBooking"]').find('#linkemail_notice_text').html('Please enter your email.');}}
if(tel.length==0)
{msg+=contact_phone_empty+'\n';$('form[name="formBooking"]').find('#linkmobile_notice').css('display','block');$('form[name="formBooking"]').find('#linkmobile_notice_text').html('Please enter your mobile number.');}
else
{if(!(Utils.isMobile(tel)))
{msg+=contact_phone_empty+'\n';$('form[name="formBooking"]').find('#linkmobile_notice').css('display','block');$('form[name="formBooking"]').find('#linkmobile_notice_text').html('Please enter mobile number in local format.');}}
if(msg.length>0)
{return false;}
return true;}
function user_login(back_history){var logform=$('form[name="formLogin"]');var username=logform.find('#username');var password=logform.find('#password');var captcha=logform.find('#authcode');var error=logform.find('.err_tip');var back_act=logform.find("input[name='back_act']").val();if(username.val()==''){error.css({'display':'block'});error.find('.error-con').html('Please enter your email address or mobile.');username.parents('.labelbox').addClass('error_bg');return false;}
if(password.val()==''){error.css({'display':'block'});password.parents('.labelbox').addClass('error_bg');error.find('.error-con').html('Please enter your password.');return false;}
if(captcha.val()==''){error.css({'display':'block'});captcha.parents('.item-detail').addClass('item-error');error.find('.error-con').html('Please enter verification code.');return false;}
if(back_history){Ajax.call('user.php?act=act_login','username='+username.val()+'&password='+password.val()+'&captcha='+captcha.val()+'&back_act='+back_act,return_login_back,'POST','JSON');}else{Ajax.call('user.php?act=act_login','username='+username.val()+'&password='+password.val()+'&captcha='+captcha.val()+'&back_act='+back_act,return_login,'POST','JSON');}
return false;}
function return_login(result){if(result.error>0){$('form[name="formLogin"]').find('.err_tip').css({'display':'block'});$('form[name="formLogin"]').find('.err_tip .error-con').html(result.message);}else{top.location.reload();}}
function return_login_back(result){if(result.error>0){$('form[name="formLogin"]').find('.err_tip').css({'display':'block'});$('form[name="formLogin"]').find('.err_tip .error-con').html(result.message);}else{window.location.href=result.url;}}
function userLogin(){var frm=document.forms['formLogin'];var username=frm.elements['username'].value;var password=frm.elements['password'].value;var msg='';if(username.length==0){msg+=username_empty+'\n';}
if(password.length==0){msg+=password_empty+'\n';}
if(msg.length>0){alert(msg);return false;}else{return true;}}
function chkstr(str)
{for(var i=0;i<str.length;i++)
{if(str.charCodeAt(i)<127&&!str.substr(i,1).match(/^\w+$/ig))
{return false;}}
return true;}
function check_password(password)
{var logform=$('form[name="formUser"]');var error=logform.find('#password_notice');if(password.length<6)
{error.css({'display':'block'});error.find('#password_notice_text').html('Password can not be less than 6 characters.');$('form[name="formUser"]').find('.regbox .main_password .labelbox').removeClass("form_success");$('form[name="formUser"]').find('.regbox .main_password .labelbox').addClass("err_label");document.forms['formUser'].elements['Submit'].disabled='disabled';}
else
{error.css({'display':'none'});$('form[name="formUser"]').find('.regbox .main_password .labelbox').addClass("form_success");document.forms['formUser'].elements['Submit'].disabled='';}}
function check_conform_password(conform_password)
{var logform=$('form[name="formUser"]');var error=logform.find('#confirm_password');password=document.getElementById('password1').value;if(conform_password.length<6)
{error.css({'display':'block'});error.find('#confirm_password_text').html('Password can not be less than 6 characters.');$('form[name="formUser"]').find('.regbox .confirm_password .labelbox').removeClass("form_success");$('form[name="formUser"]').find('.regbox .confirm_password .labelbox').addClass("err_label");document.forms['formUser'].elements['Submit'].disabled='disabled';return false;}
if(conform_password!=password)
{error.css({'display':'block'});error.find('#confirm_password_text').html('Password confirmation does not match password.');$('form[name="formUser"]').find('.regbox .confirm_password .labelbox').removeClass("form_success");$('form[name="formUser"]').find('.regbox .confirm_password .labelbox').addClass("err_label");document.forms['formUser'].elements['Submit'].disabled='disabled';}
else
{error.css({'display':'none'});$('form[name="formUser"]').find('.regbox .confirm_password .labelbox').addClass("form_success");document.forms['formUser'].elements['Submit'].disabled='';}}
function is_registered(username)
{var submit_disabled=false;var unlen=username.replace(/[^\x00-\xff]/g,"**").length;if(username=='')
{document.getElementById('username_notice').innerHTML=msg_un_blank;var submit_disabled=true;}
if(!chkstr(username))
{document.getElementById('username_notice').innerHTML=msg_un_format;var submit_disabled=true;}
if(unlen<3)
{document.getElementById('username_notice').innerHTML=username_shorter;var submit_disabled=true;}
if(unlen>14)
{document.getElementById('username_notice').innerHTML=msg_un_length;var submit_disabled=true;}
if(submit_disabled)
{document.forms['formUser'].elements['Submit'].disabled='disabled';return false;}
Ajax.call('user.php?act=is_registered','username='+username,registed_callback,'GET','TEXT',true,true);}
function registed_callback(result)
{if(result=="true")
{document.getElementById('username_notice').innerHTML=msg_can_rg;document.forms['formUser'].elements['Submit'].disabled='';}
else
{document.getElementById('username_notice').innerHTML=msg_un_registered;document.forms['formUser'].elements['Submit'].disabled='disabled';}}
function checkMobilePhone(mobile)
{var logform=$('form[name="formUser"]');var error=logform.find('#mobile_notice');var submit_disabled=false;if(mobile=='')
{error.css({'display':'block'});$('form[name="formUser"]').find('.regbox .mobile_number .labelbox').removeClass("form_success");$('form[name="formUser"]').find('.regbox .mobile_number .labelbox').addClass("err_label");error.find('#mobile_notice_text').html('Mobile number cant be empty.');submit_disabled=true;}
else if(!Utils.isMobile(mobile))
{error.css({'display':'block'});$('form[name="formUser"]').find('.regbox .mobile_number .labelbox').removeClass("form_success");$('form[name="formUser"]').find('.regbox .mobile_number .labelbox').addClass("err_label");error.find('#mobile_notice_text').html('Please enter mobile number in local format.');submit_disabled=true;}
if(submit_disabled)
{document.forms['formUser'].elements['Submit'].disabled='disabled';return false;}
Ajax.call('user.php?act=check_mobile_phone','mobile='+mobile,check_mobile_callback,'GET','TEXT',true,true);}
function check_mobile_callback(result)
{var logform=$('form[name="formUser"]');var error=logform.find('#mobile_notice');var res=result.trim();if(res=="true")
{error.css({'display':'none'});$('form[name="formUser"]').find('.regbox .mobile_number .labelbox').removeClass("err_label");$('form[name="formUser"]').find('.regbox .mobile_number .labelbox').addClass("form_success");document.forms['formUser'].elements['Submit'].disabled='';}
else
{error.css({'display':'block'});$('form[name="formUser"]').find('.regbox .mobile_number .labelbox').removeClass("form_success");$('form[name="formUser"]').find('.regbox .mobile_number .labelbox').addClass("err_label");error.find('#mobile_notice_text').html('Phone number already exists.');document.forms['formUser'].elements['Submit'].disabled='disabled';}}
function checkEmail(email)
{var logform=$('form[name="formUser"]');var error=logform.find('#email_notice');var submit_disabled=false;if(email=='')
{error.css({'display':'block'});$('form[name="formUser"]').find('.regbox .email_address .labelbox').removeClass("form_success");$('form[name="formUser"]').find('.regbox .email_address .labelbox').addClass("err_label");error.find('#email_notice_text').html('Please enter your email address.');submit_disabled=true;}
else if(!Utils.isEmail(email))
{error.css({'display':'block'});$('form[name="formUser"]').find('.regbox .email_address .labelbox').removeClass("form_success");$('form[name="formUser"]').find('.regbox .email_address .labelbox').addClass("err_label");error.find('#email_notice_text').html('The email address you entered is invalid.');submit_disabled=true;}
if(submit_disabled)
{document.forms['formUser'].elements['Submit'].disabled='disabled';return false;}
Ajax.call('user.php?act=check_email','email='+email,check_email_callback,'GET','TEXT',true,true);}
function check_email_callback(result)
{var logform=$('form[name="formUser"]');var error=logform.find('#email_notice');var res=result.trim();if(res=='ok')
{error.css({'display':'none'});$('form[name="formUser"]').find('.regbox .email_address .labelbox').addClass("form_success");document.forms['formUser'].elements['Submit'].disabled='';}
else
{error.css({'display':'block'});error.find('#email_notice_text').html('Email address is already registered.');$('form[name="formUser"]').find('.regbox .email_address .labelbox').removeClass("form_success");$('form[name="formUser"]').find('.regbox .email_address .labelbox').addClass("err_label");document.forms['formUser'].elements['Submit'].disabled='disabled';}}
function register()
{var frm=document.forms['formUser'];var email=frm.elements['email'].value;var password=Utils.trim(frm.elements['password'].value);var confirm_password=Utils.trim(frm.elements['confirm_password'].value);var checked_agreement=frm.elements['agreement'].checked;var mobile_phone=frm.elements['mobile']?Utils.trim(frm.elements['mobile'].value):'';var msg="";var msg='';if(email.length==0)
{msg+=email_empty+'\n';$('form[name="formUser"]').find('#email_notice').css('display','block');$('form[name="formUser"]').find('#email_notice_text').html('Please enter your email address.');$('form[name="formUser"]').find('.regbox .email_address .labelbox').removeClass("form_success");$('form[name="formUser"]').find('.regbox .email_address .labelbox').addClass("err_label");}
else
{if(!(Utils.isEmail(email)))
{msg+=email_invalid+'\n';$('form[name="formUser"]').find('#email_notice').css('display','block');$('form[name="formUser"]').find('#email_notice_text').html('The email address you entered is invalid.');$('form[name="formUser"]').find('.regbox .email_address .labelbox').removeClass("form_success");$('form[name="formUser"]').find('.regbox .email_address .labelbox').addClass("err_label");}}
if(password.length==0)
{msg+=password_empty+'\n';$('form[name="formUser"]').find('#password_notice').css('display','block');$('form[name="formUser"]').find('#password_notice_text').html('Please enter your password.');$('form[name="formUser"]').find('.regbox .main_password .labelbox').removeClass("form_success");$('form[name="formUser"]').find('.regbox .main_password .labelbox').addClass("err_label");}
else if(password.length<6)
{msg+=password_shorter+'\n';$('form[name="formUser"]').find('#password_notice').css('display','block');$('form[name="formUser"]').find('#password_notice_text').html('Password can not be less than 6 characters.');$('form[name="formUser"]').find('.regbox .main_password .labelbox').removeClass("form_success");$('form[name="formUser"]').find('.regbox .main_password .labelbox').addClass("err_label");}
if(/ /.test(password)==true)
{msg+=passwd_balnk+'\n';$('form[name="formUser"]').find('#password_notice').css('display','block');$('form[name="formUser"]').find('#password_notice_text').html('Please enter your password.');$('form[name="formUser"]').find('.regbox .main_password .labelbox').removeClass("form_success");$('form[name="formUser"]').find('.regbox .main_password .labelbox').addClass("err_label");}
if(confirm_password.length==0)
{msg+=confirm_password_invalid+'\n';$('form[name="formUser"]').find('#confirm_password').css('display','block');$('form[name="formUser"]').find('#confirm_password_text').html('Password confirmation cannot be blank.');$('form[name="formUser"]').find('.regbox .confirm_password .labelbox').removeClass("form_success");$('form[name="formUser"]').find('.regbox .confirm_password .labelbox').addClass("err_label");}
else
{if(confirm_password!=password)
{msg+=mobile_phone_invalid+'\n';$('form[name="formUser"]').find('#confirm_password').css('display','block');$('form[name="formUser"]').find('#confirm_password_text').html('Password confirmation does not match password.');$('form[name="formUser"]').find('.regbox .confirm_password .labelbox').removeClass("form_success");$('form[name="formUser"]').find('.regbox .confirm_password .labelbox').addClass("err_label");}}
if(checked_agreement!=true)
{msg+=agreement+'\n';alert(agreement);}
if(mobile_phone.length==0)
{msg+=mobile_phone_invalid+'\n';$('form[name="formUser"]').find('#mobile_notice').css('display','block');$('form[name="formUser"]').find('#mobile_notice_text').html('Please enter your mobile number.');$('form[name="formUser"]').find('.regbox .mobile_number .labelbox').removeClass("form_success");$('form[name="formUser"]').find('.regbox .mobile_number .labelbox').addClass("err_label");}
else
{if(!(Utils.isMobile(mobile_phone)))
{msg+=mobile_phone_invalid+'\n';$('form[name="formUser"]').find('#mobile_notice').css('display','block');$('form[name="formUser"]').find('#mobile_notice_text').html('Please enter mobile number in local format.');$('form[name="formUser"]').find('.regbox .mobile_number .labelbox').removeClass("form_success");$('form[name="formUser"]').find('.regbox .mobile_number .labelbox').addClass("err_label");}}
for(i=4;i<frm.elements.length-4;i++)
{needinput=document.getElementById(frm.elements[i].name+'i')?document.getElementById(frm.elements[i].name+'i'):'';if(needinput!=''&&frm.elements[i].value.length==0)
{msg+='- '+needinput.innerHTML+msg_blank+'\n';}}
if(msg.length>0)
{return false;}
else
{return true;}}
function saveOrderAddress(id)
{var frm=document.forms['formAddress'];var consignee=frm.elements['consignee'].value;var email=frm.elements['email'].value;var address=frm.elements['address'].value;var zipcode=frm.elements['zipcode'].value;var tel=frm.elements['tel'].value;var mobile=frm.elements['mobile'].value;var sign_building=frm.elements['sign_building'].value;var best_time=frm.elements['best_time'].value;if(id==0)
{alert(current_ss_not_unshipped);return false;}
var msg='';if(address.length==0)
{msg+=address_name_not_null+"\n";}
if(consignee.length==0)
{msg+=consignee_not_null+"\n";}
if(msg.length>0)
{swal({text:(msg),type:'error',confirmButtonColor:'#ff6700',})
return false;}
else
{return true;}}
function submitSurplus()
{var frm=document.forms['formSurplus'];var surplus_type=frm.elements['surplus_type'].value;var surplus_amount=frm.elements['amount'].value;var process_notic=frm.elements['user_note'].value;var payment_id=0;var msg='';if(surplus_amount.length==0)
{msg+=surplus_amount_empty+"\n";}
else
{var reg=/^[\.0-9]+/;if(!reg.test(surplus_amount))
{msg+=surplus_amount_error+'\n';}}
if(process_notic.length==0)
{msg+=process_desc+"\n";}
if(msg.length>0)
{alert(msg);return false;}
if(surplus_type==0)
{for(i=0;i<frm.elements.length;i++)
{if(frm.elements[i].name=="payment_id"&&frm.elements[i].checked)
{payment_id=frm.elements[i].value;break;}}
if(payment_id==0)
{alert(payment_empty);return false;}}
return true;}
function addBonus()
{var frm=document.forms['addBouns'];var bonus_sn=frm.elements['bonus_sn'].value;if(bonus_sn.length==0)
{alert(bonus_sn_empty);return false;}
else
{var reg=/^[0-9]{10}$/;if(!reg.test(bonus_sn))
{alert(bonus_sn_error);return false;}}
return true;}
function mergeOrder()
{if(!confirm(confirm_merge))
{return false;}
var frm=document.forms['formOrder'];var from_order=frm.elements['from_order'].value;var to_order=frm.elements['to_order'].value;var msg='';if(from_order==0)
{msg+=from_order_empty+'\n';}
if(to_order==0)
{msg+=to_order_empty+'\n';}
else if(to_order==from_order)
{msg+=order_same+'\n';}
if(msg.length>0)
{swal({text:(msg),type:'error',confirmButtonColor:'#ff6700',})
return false;}
else
{return true;}}
function returnToCart(orderId)
{Ajax.call('user.php?act=return_to_cart','order_id='+orderId,returnToCartResponse,'POST','JSON');}
function returnToCartResponse(result)
{alert(result.message);}
function checkIntensity(pwd)
{var Mcolor="#FFF",Lcolor="#FFF",Hcolor="#FFF";var m=0;var Modes=0;for(i=0;i<pwd.length;i++)
{var charType=0;var t=pwd.charCodeAt(i);if(t>=48&&t<=57)
{charType=1;}
else if(t>=65&&t<=90)
{charType=2;}
else if(t>=97&&t<=122)
charType=4;else
charType=4;Modes|=charType;}
for(i=0;i<4;i++)
{if(Modes&1)m++;Modes>>>=1;}
if(pwd.length<=4)
{m=1;}
switch(m)
{case 1:Lcolor="2px solid red";Mcolor=Hcolor="2px solid #DADADA";break;case 2:Mcolor="2px solid #f90";Lcolor=Hcolor="2px solid #DADADA";break;case 3:Hcolor="2px solid #3c0";Lcolor=Mcolor="2px solid #DADADA";break;case 4:Hcolor="2px solid #3c0";Lcolor=Mcolor="2px solid #DADADA";break;default:Hcolor=Mcolor=Lcolor="";break;}
if(document.getElementById("pwd_lower"))
{document.getElementById("pwd_lower").style.borderBottom=Lcolor;document.getElementById("pwd_middle").style.borderBottom=Mcolor;document.getElementById("pwd_high").style.borderBottom=Hcolor;}}
function changeType(obj)
{if(obj.getAttribute("min")&&document.getElementById("ECS_AMOUNT"))
{document.getElementById("ECS_AMOUNT").disabled=false;document.getElementById("ECS_AMOUNT").value=obj.getAttribute("min");if(document.getElementById("ECS_NOTICE")&&obj.getAttribute("to")&&obj.getAttribute('fee'))
{var fee=parseInt(obj.getAttribute("fee"));var to=parseInt(obj.getAttribute("to"));if(fee<0)
{to=to+fee*2;}
document.getElementById("ECS_NOTICE").innerHTML=notice_result+to;}}}
function calResult()
{var amount=document.getElementById("ECS_AMOUNT").value;var notice=document.getElementById("ECS_NOTICE");reg=/^\d+$/;if(!reg.test(amount))
{notice.innerHTML=notice_not_int;return;}
amount=parseInt(amount);var frm=document.forms['transform'];for(i=0;i<frm.elements['type'].length;i++)
{if(frm.elements['type'][i].checked)
{var min=parseInt(frm.elements['type'][i].getAttribute("min"));var to=parseInt(frm.elements['type'][i].getAttribute("to"));var fee=parseInt(frm.elements['type'][i].getAttribute("fee"));var result=0;if(amount<min)
{notice.innerHTML=notice_overflow+min;return;}
if(fee>0)
{result=(amount-fee)*to/(min-fee);}
else
{result=amount*(to+fee)/min+fee;}
notice.innerHTML=notice_result+parseInt(result+0.5);}}}
function confirmationdelete(text,text2)
{swal({title:'Cancel Order',text:text,showCancelButton:true,confirmButtonColor:'#fff',background:'rgba(0,0,0,.7)',cancelButtonColor:'#fff',confirmButtonText:'Yes',cancelButtonText:'No',}).then(function(){location.href=text2;},function(dismiss){return false;})}
function confirmreceaved(text,text2)
{swal({title:'Complete Order',text:text,showCancelButton:true,confirmButtonColor:'#fff',background:'rgba(0,0,0,.7)',cancelButtonColor:'#fff',confirmButtonText:'Yes',cancelButtonText:'No',}).then(function(){location.href=text2;},function(dismiss){return false;})}
function removeaddress(text,text2)
{swal({title:'Delete Address',text:text,showCancelButton:true,confirmButtonColor:'#fff',cancelButtonColor:'#fff',background:'rgba(0,0,0,.7)',confirmButtonText:'Yes',cancelButtonText:'No',}).then(function(){location.href=text2;},function(dismiss){return false;})}
function RemoveNotice(text,text2)
{swal({title:'Remove Product',text:text,showCancelButton:true,confirmButtonColor:'#fff',cancelButtonColor:'#fff',background:'rgba(0,0,0,.7)',confirmButtonText:'Yes',cancelButtonText:'No',}).then(function(){location.href=text2;},function(dismiss){return false;})}
function confirmationdeletecart(text,text2)
{swal({title:'Remove from cart',text:text,showCancelButton:true,confirmButtonColor:'#fff',background:'rgba(0,0,0,.7)',cancelButtonColor:'#fff',confirmButtonText:'Yes',cancelButtonText:'No',}).then(function(){location.href=text2;},function(dismiss){return false;})}