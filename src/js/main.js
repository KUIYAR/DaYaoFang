$(function(){
    //11 获取用户名
    var username=Cookie.get('name');
    if(username){
       $('#top .top .top_left').html(
        `
        <a href="">收藏康德乐</a>
        <em>您好，${username} 欢迎来到康德乐大药房!</em>
        <a href="html/logout.html" class='member logout'>退出</a>
        `) ;
    }

    //12 退出
    $('.logout').click(function(){
        var now=new Date();
        now.setDate(now.getDate()-1);
        Cookie.set('name','',{'expires':now,'path':'/'});
        //刷新页面
         location.reload();
    });

    //13 ajax渲染
    $.ajax({
        type:"get",
        url:'../api/main.php',
        async:true,//异步
        success:function(data){
            $('.fbright ul').html(init(data));
            $('.fb2right ul').html(init2(data));
        }
    });

    //13.1 1楼
    function init(data){
        var obj = JSON.parse(data);
        var res = obj.map(function(item){
            var html = `
                    <li data-id=${item.id}>
                        <div class="fbrpic">
                            <img src="${item.url}" alt="" />
                        </div>
                        <div class="fbrinf">
                            <p>${item.name}</p>
                            <p>${item.price}</p>
                        </div>
                    </li>
            `;
            return html;
        }).join('');
        return res+res; //注意封装记得返回，函数没有返回值显示undefined
    }

    //13.2 二楼
    function init2(data){
        var obj = JSON.parse(data);
        var res = obj.map(function(item){
            var html = `
                    <li data-id=${item.id}>
                        <div class="fb2rpic">
                            <img src="${item.url}" alt="" />
                        </div>
                        <div class="fb2rinf">
                            <p>${item.name}</p>
                            <p>${item.price}</p>
                        </div>
                    </li>
            `;
            return html;
        }).join('');
        return res+res; //注意封装记得返回，函数没有返回值显示undefined
    }

    //14 点击跳转详情页
    $('.floor .fbright ul').on('click','li',function(){
        // console.log($(this).attr('data-id'));
        var gid = $(this).attr('data-id')
        window.open('../html/details.html?id='+gid);
    });

    $('.floor2 .fb2right ul').on('click','li',function(){
        var gid = $(this).attr('data-id');
        window.open('../html/details.html?id='+gid);
    });



    //1.我的康德乐的显示隐藏
    $('.menu').mouseenter(function(){
        $('.mymenu_hiden').css('display','block');
    });
    $('.menu').mouseleave(function(){
        $('.mymenu_hiden').css('display','none');
    });

    //2.网站导航的显示隐藏
    $('.webnav').mouseenter(function(){
        $('.mywebnav_hiden').css('display','block');
    });
    $('.webnav').mouseleave(function(){
        $('.mywebnav_hiden').css('display','none');
    });

    //3.两个隐藏的样式设置
    $('.mymenu_hiden li:first-child').siblings('').css('cursor','pointer');
    $('.mywebnav_hiden li:first-child').siblings('').css('cursor','pointer');

    //4.左导航
    $('.head_categorys').hover(
        function(){
            $('.head_categorys em').css('background','url(img/allgbg01.png)');
        },
        function(){
            $('.head_categorys em').css('background','url(img/allgbg.png)');
        }
    );

    //5.一级菜单滑入滑出与二级菜单的显示
    $('.allsort').find('.firstitem').hover(
        function(){
            $(this).find('a').attr('class','active');
            $(this).find('s').css('background','url(img/elves4.png)');
            $('.secondmenu li').eq($(this).index()).css('display','block');
        },
        function(){
            $(this).find('a').removeAttr("class");
            $(this).find('s').css('background','');
            $('.secondmenu li').eq($(this).index()).css('display','none');
        }
    );

    $('.seconditem').hover(
        function(){
            $(this).css('display','block');
            $('.firstitem a').eq($(this).index()).attr('class','active');
            $('.firstitem s').eq($(this).index()).attr('background','');
        },
        function(){
            $(this).css('display','none');
            $('.firstitem a').eq($(this).index()).attr('class','');
            $('.firstitem s').eq($(this).index()).attr('background','url(img/elves4.png)');
        }
    );

    //6.导航两个选项的下拉菜单
    $('.specialtyChannel').hover(
        function(){
            $(this).find('.channel').css('display','block');
        },
        function(){
            $(this).find('.channel').css('display','none');
        }
    );

    $('.informationChannel').hover(
        function(){
            $(this).find('.channel').css('display','block');
        },
        function(){
            $(this).find('.channel').css('display','none');
        }
    );

    //7.左轮播
    
    //7.1 图片定位右侧，第一张在轮播可视区
    var iW = $('.picshow li').eq(0).outerWidth();
    $('.picshow li').css('left',iW);
    $('.picshow li').eq(0).css('left',0);

    //7.2 定时器：每3秒切换一次图片
    var timer = null;
    var now = 0;
    clearInterval(timer);
    timer = setInterval(next,3000);

    function next(){
        //旧图左移，新图定位右侧后左移
        $('.picshow li').eq(now).animate({'left':-iW},1000);
        now=++now>=$('.picshow li').size()?0:now;
        $('.picshow li').eq(now).css('left',iW);
        $('.picshow li').eq(now).animate({'left':0},1000);
        light();
    }

    function prev(){
        //旧图右移，新图定位左侧后右移
        $('.picshow li').eq(now).animate({'left':iW},1000);
        now=--now<0?$('.picshow li').size()-1:now;
        $('.picshow li').eq(now).css('left',-iW);
        $('.picshow li').eq(now).animate({'left':0},1000);
        light();
    }

    //7.3 焦点跟随
    function light(){
        //排他
        $('.spanshow li').removeClass('active');
        //高亮当前
        $('.spanshow li').eq(now).addClass('active')
    }

    //7.4 按钮切图
    $('.btn_left').click(function(){
        prev();
    });

    $('.btn_right').click(function(){
        next();
    });

    //7.5 按钮的淡入淡出和鼠标悬停控制轮播
    $('.bl_box').hover(
        function(){ //鼠标进入，定时器停止，透明度为1
            clearInterval(timer);
            $('.btn span').css({'opacity':1});
        },
        function(){ //鼠标移出，定时器开启，透明度为0
            clearInterval(timer);
            timer = setInterval(next,6000);
            $('.btn span').css({'opacity':0});
        }
    );

    //7.6 焦点跟随
    $('.spanshow li').click(function(){
        //保存点击的焦点
        var idx = $(this).index();
        //点击的焦点比高亮点大
        if(idx>now){
            //高亮点对应的图左移，焦点图定位右侧左再移
            $('.picshow li').eq(now).animate({'left':-iW},1000);
            $('.picshow li').eq(idx).css('left',iW);
            $('.picshow li').eq(idx).animate({'left':0},1000);
            //刷新高亮点序号
            now = idx;
        }
        //点击的焦点比高亮点小
        if(idx<now){
            //高亮点对应的图右移，焦点图定位左侧右再移
            $('.picshow li').eq(now).animate({'left':iW},1000);
            $('.picshow li').eq(idx).css('left',-iW);
            $('.picshow li').eq(idx).animate({'left':0},1000);
            now = idx;
        }
        light();
    });


    //8.1 右选项卡
    var cityidx = 0;
    $('.banner .banner_right .city ul').find('li').click(function(){

        cityidx = $(this).index();

        $(this).siblings().removeClass('cur');
        $(this).addClass('cur');

        $(this).parents('.city').next().find('.cI').eq(cityidx).siblings('.cI').css('display','none');
        $(this).parents('.city').next().find('.cI').eq(cityidx).css('display','block');

    });

    //8.2 右选项卡图片切换
    var isshow = false;
    $('.cIbtn>li').click(function(){
        var cityImgs = $(this).parent().siblings('.cI').eq(cityidx);
        if(isshow){
            cityImgs.children().eq(0).css('display','none');
            cityImgs.children().eq(1).css('display','block');
        }else{
            cityImgs.children().eq(0).css('display','block');
            cityImgs.children().eq(1).css('display','none');
        }

        isshow = !isshow;
        
    });

    //9.content左边选项卡
    $('.content .conleft .cltop').find('ul>li').click(function(){
        var idx = $(this).index();

        $(this).siblings('li').removeClass('active');
        $(this).addClass('active');

        $('.clbottom .clb_tab').css('display','none');
        $('.clbottom .clb_tab').eq(idx).css('display','block');

    });

    //10.content右边轮播图
    // console.log($('.crb_pic').children().eq(0).width());
    var iW2 = $('.crb_good').children().eq(0).width();
    var uW = iW2*$('.crb_good').children().size();
    $('.crb_good').css('width',uW);
    var fisrt = 0;

    //10.1 焦点跟随
    $('.crb_span li').click(function(){

        //保存点击的焦点
        var idx = $(this).index();
        $('.crb_good').animate({'left':-iW2*idx},1000);

        $(this).siblings().removeClass('active');
        $(this).addClass('active');

    });

    
});