$(function(){
    //13.获取id渲染
    var gid = location.search.split('=')[1];
    $.ajax({
        type:"get",
        url:"../api/details.php",
        async:true,
        data:{'id':gid},
        success:init
    });

    function init(data){
        var arr = JSON.parse(data)[0];

        // console.log(arr);

        var html = `
            <div class="details con">
                <div class="dtop clearfix">
                    <div class="dtleft fl">
                        <div class="goodpic">
                            <div class="gpbig">
                                <div>
                                    <div class="slider"></div>
                                    <img class='original' src="${arr.detailurl}">
                                    <img class='original' src="${arr.detailurl2}"  style='display:none'>
                                </div>
                                <div class='enlarge'>
                                    <img src="${arr.detailurl}" style='width:1584.04px;height:1584.04px'>
                                    <img src="${arr.detailurl2}" style='display:none;width:1584.04px;height:1584.04px'>
                                </div>
                            </div>
                            <div class="gpsmall">
                                <ul class='clearfix'>
                                    <li class='active'>
                                        <img src="${arr.detailurl}">
                                    </li>
                                    <li>
                                        <img src="${arr.detailurl2}">
                                    </li>
                                </ul>
                            </div>
                            <div class="gpbtn">
                                <span class="gpbtnprev"> < </span>
                                <span class="gpbtnnext"> > </span>
                            </div>
                        </div>
                        <div class="goodtips">温馨提示：部分商品包装更换频繁，如货品与图片不完全一致，请以商品实物为准。</div>
                        <div class="goodshare">
                            <div class="sharepic clearfix">
                                <span>分享到：</span>
                                <ul class='clearfix'>
                                    <li>
                                        <div class="more">
                                            <p>分享到</p>
                                            <ul class="clearfix">
                                                <li><s></s>一键分享</li>
                                                <li><s></s>一键分享</li>
                                                <li><s></s>一键分享</li>
                                                <li><s></s>一键分享</li>
                                                <li><s></s>一键分享</li>
                                                <li><s></s>一键分享</li>
                                                <li><s></s>一键分享</li>
                                                <li><s></s>一键分享</li>
                                                <li><s></s>一键分享</li>
                                                <li><s></s>一键分享</li>
                                                <li><s></s>一键分享</li>
                                                <li><s></s>一键分享</li>
                                                <li><s></s>一键分享</li>
                                                <li><s></s>一键分享</li>
                                                <li><s></s>一键分享</li>
                                                <li><s></s>一键分享</li>
                                            </ul>
                                            <div><s></s>更多....</div>
                                        </div>
                                    </li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </div>
                            <span class="collection">收藏</span>
                        </div>
                    </div>
                    <div class="dtright">
                        <div class="gooddt fl">
                            <h1><s></s>${arr.name}</h1>
                            <div class='favourable'>双11优惠：3盒669元 活动时间：11月8-30号</div>
                            <div class="price"><span>会员价</span>${arr.price}</div>
                            <div class='summary'>
                                <dl class="dtinf clearfix">
                                    <dt>通 用 名 ：</dt>
                                    <dd>盐酸达泊西汀片</dd>
                                </dl>
                                <dl class="dtinf clearfix">
                                    <dt>厂    家 ：</dt>
                                    <dd>德国Janssen Ortho L.L.C.</dd>
                                </dl>
                                <dl class="dtinf clearfix">
                                    <dt>批准文号 ：</dt>
                                    <dd>注册证号H20150563</dd>
                                </dl>
                                <dl class="speco clearfix">
                                    <dt class='mfrs'>规　　格 ：</dt>
                                    <dd class='active'>30mg*3片<b></b></dd>
                                    <dd>30mg*6片</dd>
                                </dl>
                                <dl class="speco clearfix">
                                    <dt>优惠套餐 ：</dt>
                                    <dd class='active'>双11优惠：2盒6片装888元<b></b></dd>
                                </dl>
                            </div>
                            <div class="summary">
                                <dl class="speco clearfix">
                                    <dt>附近门店</dt>
                                    <dd class='addr'>
                                        <h2>广州越秀店</h2>
                                        <s></s>
                                        <ul>
                                            <li class='active'>广州越秀店</li>
                                            <li>广州海珠店</li>
                                            <li>广州荔湾店</li>
                                            <li>北京海淀店</li>
                                            <li>北京朝阳店</li>
                                            <li>成都青羊店</li>
                                            <li>成都百济店</li>
                                            <li>上海徐汇店</li>
                                        </ul>
                                    </dd>
                                </dl>
                                <dl class="speco clearfix">
                                    <dt>数量</dt>
                                    <dd class='number'>
                                        <input type="text" value='1'/>
                                        <span class='add'></span>
                                        <span class='sub'></span>
                                    </dd>
                                    <dd class='btn'><em></em>加入购物车</dd>
                                </dl>
                            </div>
                            <ul clas='clearfix'>
                                <li><em></em>正品保证</li>
                                <li><em></em>提供发票</li>
                                <li><em></em>隐私包装</li>
                            </ul>
                        </div>
                        <div class="goodaddr fr">
                            <h2>康德乐大药房全国分店：</h2>
                            <div class="gatab">
                                <img src="../img/gatab.png"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dbottom"></div>
            </div>
                    `;

        $('#details').html(html);
    };


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
            $('.head_categorys em').css('background','url(../img/allgbg01.png)');
            $('.firstmenu').css('display','block');
        },
        function(){
            $('.head_categorys em').css('background','url(../img/allgbg.png)');
            $('.firstmenu').css('display','none');
        }
    );

    //5.一级菜单滑入滑出与二级菜单的显示
    $('.allsort').find('.firstitem').hover(
        function(){
            $(this).find('a').attr('class','active');
            $(this).find('s').css('background','url(../img/elves4.png)');
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

    //7.分享
    $('#details').on('mouseover','.goodshare .sharepic>ul>li:first',function(){
        $('.more').css('display','block');
    });
    $('#details').on('mouseout','.goodshare .sharepic>ul>li:first',function(){
        $('.more').css('display','none');
    });

    //8.放大镜
    var sliderWidth = 100,//阴影的宽度 
        sliderHeight = 100,//阴影的高度 
        gpbigWidth = 398,//容器的宽度 
        gpbigHeight = 398,//容器的高度 
        enlargeWidth = 398,//放大图片盒子的宽度 
        enlargeHeight = 398,//放大图片盒子的高度 
        rateX = enlargeWidth / sliderWidth,//放大区和遮罩层的宽度比例 
        rateY = enlargeHeight / sliderHeight;//放大区和遮罩层的高度比例

        //设置放大区域图片的宽(高)
    var bigPicWidth = 398*rateX;

    $('.enlarge img').css('width',bigPicWidth);



    //8.1 鼠标滑入滑出时滑块和放大区域的显示和消失
    $('#details').on('mouseover','.gpbig',function(){
        $('.slider').show();
        $('.enlarge').show();
    });

    $('#details').on('mouseleave','.gpbig',function(){
        $('.slider').hide();
        $('.enlarge').hide();
    });

    //8.2 鼠标移动时，阴影和放大区域图片的移动
    $('#details').on('mousemove','.gpbig',function(e){
        var x = e.pageX,
            y = e.pageY;
            // console.log(x,y);

        $('#details .slider').offset({//8.4 设置滑块位置：鼠标正中心
            top:y-sliderHeight/2,
            left:x-sliderWidth/2
        });

        //8.5 获取遮罩层相对父元素的位置 
        var sPosition = $('.slider').position(), 
            sTop = sPosition.top, 
            sLeft = sPosition.left, 
            hdiffer = gpbigHeight - sliderHeight, 
            wdiffer = gpbigWidth - sliderWidth; 
  
        //8.6 限制滑块在盒子内移动
        if(sTop<0){
            sTop = 0; 
        }else if(sTop>hdiffer){
            sTop = hdiffer; 
        }

        if(sLeft<0){
            sLeft = 0; 
        }else if(sLeft > wdiffer){
            sLeft = wdiffer; 
        }
        
        $('.slider').css({ 
          top: sTop, 
          left: sLeft 
        }); 
  
        //8.7 设置放大区图片移动 
        $('.enlarge img').css({ 
          top: -rateY*sTop, 
          left: -rateX*sLeft 
        }); 
    });


    //9.缩略图
    //9.1 设置缩略图容器ul的宽
    var iW = 62;
    var iNum = $('.gpsmall>ul>li').size();
    $('.gpsmall ul').css('width',iW*iNum);
           
    var idx = 0;    //用于10的索引值引用

    //9.2 点击缩略图的样式变化
    $('#details').on('click','.gpsmall>ul>li',function(){
        idx = $(this).index();
        $('.gpsmall>ul>li').removeClass('active');
        $(this).addClass('active');

        $('.gpbig img').eq($(this).index()).css('display','block').siblings().css('display','none');

        $('.enlarge img').eq($(this).index()).css('display','block').siblings().css('display','none');;
    });

    //10.缩略图按钮切换
    //10.1 上一张
    $('#details').on('click','.gpbtnprev',function(){
        idx--;
        if(idx<0){
            idx=0;
        }
        $('.gpsmall>ul>li').removeClass('active');
        $('.gpsmall>ul>li').eq(idx).addClass('active');

        $('.gpbig img').eq(idx).css('display','block').siblings().css('display','none');

        $('.enlarge img').eq(idx).css('display','block').siblings().css('display','none');;
    });

    //10.2 下一张
    $('#details').on('click','.gpbtnnext',function(){
        idx++;
        if(idx>$('.gpsmall>ul>li').size()-1){
            idx=$('.gpsmall>ul>li').size()-1;
        }
        $('.gpsmall>ul>li').removeClass('active');
        $('.gpsmall>ul>li').eq(idx).addClass('active');

        $('.gpbig img').eq(idx).css('display','block').siblings().css('display','none');

        $('.enlarge img').eq(idx).css('display','block').siblings().css('display','none');;
    });

    //11 规格选择
    $('.speco .mfrs').siblings('dd').click(function(){
        $('.speco .mfrs').siblings('dd').removeClass('active');
        $('.speco .mfrs').siblings('dd').find('b').remove();

        $(this).addClass('active').append('<b></b>');
    });

    //12.选择门店
    $('#details').on('mouseover','.summary .speco .addr',function(){
        $('.summary .speco .addr').find('s').css('background','url(../img/elves2.png) no-repeat -452px -48px');
        $('.summary .speco .addr').find('ul').css('display','block');
    });
    $('#details').on('mouseleave','.summary .speco .addr',function(){
        $('.summary .speco .addr').find('s').css('background','url(../img/elves2.png) no-repeat -445px -48px');
        $('.summary .speco .addr').find('ul').css('display','none');
    });


    $('#details').on('click','.summary .speco .addr li',function(){
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        $('.summary .speco .addr h2').text($(this).text());
        $('.summary .speco .addr ul').css('display','none');
    });

    //13.加减
    var num_text = 1;
    //13.1 减
    $('#details').on('click','.number .sub',function(){
        // console.log($(this).prev().prev().val(num_text));
        if(num_text<=1){
            num_text = 1;
        }else{
            num_text--;
        }
        $(this).prev().prev().val(num_text);
    });

    //13.2 加
    $('#details').on('click','.number .add',function(){
        // console.log($(this).prev().val(num_text));
        if(num_text>=100){
            num_text = 100;
        }else{
            num_text++;
        }
        $(this).prev().val(num_text);
    });
    //13.3 输入框输入内容修改数量
    $('#details').on('keyup','.number input',function(){
        var val = $(this).val();
        if(val>=100){
            val = 100;
        }if(val<=1){
            val = 1;
        }
        $(this).val(val);
        num_text = val;
    });

    //14.加入购物车
    $('#details').on('click','.btn',function(){
        var number = $('#details .number input').val();
        // 非空
        if(number){
            $.ajax({
                type:"get",
                url:"../api/addCart.php",
                async:true,
                data:{'id':gid,'number':number},
                success:datas
            });
            var istrue = confirm('加入购物车成功！您是否前去购物车结算？');
            if(istrue){
                location.href = '../html/car.html';
            }
            else{
                location.reload();
            }
        }else{
            alert('请输入商品数量！');
        }
    });

    //购物车总件数
    function datas(data){
        $.ajax({
            type:'get',
            url:'../api/cart.php',
            async:true,
            data:{way:'sum'},
            success:function(data){
                var arr = JSON.parse(data)[0];
                console.log(arr);
                $('.head_mycard a .num').html(data);
                $('.aside .sidenav .car').html('<s></s>购物车'+data+'件');
            }
        });
    }

    //15.侧边栏购物车显示
    $.ajax({
        type:"get",
        url:"../api/cart.php",
        async:true,
        data:{way:'shop'},
        success:asideCart
    });

    function asideCart(data){
        var arr = JSON.parse(data);
        var res = arr.map(function(item){
            return `
                <li>
                    <div class="gpic fl">
                        <img src="${item.detailurl}"/>
                    </div>
                    <div class='goodname'>${item.name}</div>
                    <div class='goodprice'>单价：<span>${item.price}</span></div>
                    <div class='goodtotal'>
                        <div class="number fl">
                            <div class='sub'> </div>
                            <input type="text" value='${item.number}'/>
                            <div class='add'></div>
                        </div>
                        <div class='pricetotal fl'></div>
                    </div>
                    <div class="goodclose"></div>
                </li>
                    `;
        }).join('');

        $('.goods_scroll').html(res);
    }


});