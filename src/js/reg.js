$(function(){

    //1.用户名验证
    var isName = false;
    $('.username input').blur(function(){
        var uValue = $.trim($('.username input').val());
        if(uValue){
            if(checkReg.name(uValue)){
                $.ajax({
                    'data':{username:uValue},
                    'type':'post',
                    'url':'../api/checkname.php',
                    'success':checkname
                });
            }else{
                $('.username .check').css('display','none');
                $('.username .errortip').css('display','block');
                $('.username .errortip').html('用户名必须是4~20位字符');
            }
        }
        else{
            $('.username .errortip').css('display','block');
            $('.username .errortip').html('用户名不能为空');
        }
    });

    function checkname(data){
        // console.log(data);
        if(data === 'yes'){  //可以注册，开关打开
            $('.username .check').css('display','block');
            $('.username .errortip').css('display','none');
            isName = true;
        }else{
            $('.username .check').css('display','none');
            $('.username .errortip').css('display','block');
            $('.username .errortip').html('该用户名已经被注册');
        }
    }

    //2.密码
    var isPsw = false;
    $('.password input').blur(function(){
        var pwValue = $.trim($('.password input').val());
        if(pwValue){
            if(checkReg.psweasy(pwValue)){
                $('.password .check').css('display','block');
                $('.password .errortip').css('display','none');
                isPsw = true;
            }else{
                $('.password .check').css('display','none');
                $('.password .errortip').css('display','block');
                $('.password .errortip').html('密码必须是首字母开头的6~16位字符');
                isPsw = false;
            }
        }else{
            $('.username .check').css('display','none');
            $('.password .errortip').css('display','block');
            $('.password .errortip').html('密码不能为空');
            isPsw = false;
        }
    });

    //3.确认密码
    var isPswIg = false;
    $('.confirm_pwd input').blur(function(){
        if(isPsw){
            var cpValue = $.trim($('.confirm_pwd input').val());
            if(cpValue == $.trim($('.password input').val())){
                isPswIg = true;
                $('.confirm_pwd .check').css('display','block');
                $('.confirm_pwd .errortip').css('display','none');
            }else{
                $('.confirm_pwd .errortip').css('display','block');
                $('.confirm_pwd .errortip').html('两次密码输入不一致');
                $('.confirm_pwd .check').css('display','none');
                isPswIg = false;
            }
        }
    });

    var name=Cookie.get('name');
    $('.username input').val(name);

    //4.注册
    $('.reg .btn').click(function(){
        // console.log(isName,isPsw,isPswIg); //三个开关都打开
        if(isName && isPsw && isPswIg){
            var uValue = $.trim($('.username input').val());
            var pwValue = $.trim($('.password input').val());
            $.ajax({
                'data':{username:uValue,password:pwValue},
                'type':'post',
                'url':'../api/reg.php',
                'success':reg
            });

            var now=new Date();
            Cookie.set('name',uValue,{'path':'/'});


        }else{
            alert('注册失败，请输入正确信息');
        }
    });
    function reg(data){
        if(data == 'yes'){
            alert('您已注册成功，祝您购物愉快~');
        }
        location.href='../main.html?user='+$.trim($('.username input').val());
    }

});