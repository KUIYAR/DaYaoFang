$(function(){
    var name=Cookie.get('name');
    $('.username input').val(name);

    $('#login .login .btn').click(function(){
        var uValue = $.trim($('.username').val());
        var psValue = $.trim($('.password').val());

        $.ajax({
            'data':{username:uValue,password:psValue},
            'type':'post',
            'url':'../api/login.php',
            'success': login
        });

        var now = new Date();
         Cookie.set('name',uValue,{'path':'/'});

    });

    function login(data){
        if(data == '1'){
            location.href = '../main.html?user='+$.trim($('.username').val());
        }else{
            $('.password').next().css('display','block');
            $('.password').next().html('用户名或密码错误！');
        }
    }
});