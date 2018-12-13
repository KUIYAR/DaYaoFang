$(function(){
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

    //11 购物车渲染
    $.ajax({
        type:'get',
        url:'../api/cart.php',
        data:{
            way:'shop'
        },
        success:init
    });

    function init(data){
        var arr = JSON.parse(data);
        // console.log(arr);
        //购物车订单表有数据时
        if(arr.length){
            $('.emptycar').css('display','none');
            var res = arr.map(function(item){

                return `
                    <dl class="clearfix" data-id='${item.id}'>
                        <dd class='chk'>
                            <input type="checkbox" class='soncheck'/>
                        </dd>
                        <dd class='chk2'>
                            <img src="${item.detailurl}"/>
                        </dd>
                        <dd class='goodname'>
                            <a href="javascript:void(0)">${item.name}</a>
                            <span>规格：200ml</span>
                        </dd>
                        <dd class='goodprice'>${item.price}</dd>
                        <dd class='goodamount clearfix'>
                            <span class='sub'></span>
                            <input type="text" value='${item.number}'/>
                            <span class='add'></span>
                        </dd>
                        <dd class='goodfav'>省0元</dd>
                        <dd class='goodsum'>${(item.price*item.number).toFixed(2)}</dd>
                        <dd class='goodop'>
                            <a href="javascript:void(0)" class='remove'>删除</a>
                        </dd>
                    </dl>
                        `;
            }).join('');
            var total = `
                    <div class="allitem clearfix">
                        <div class="aileft fl">
                            <a href="javascript:void(0)" class='removemore'>删除选中的商品</a>
                            共选中<em>0</em>件商品
                        </div>
                        <div class="airight fr">
                            <ul>
                                <li>共<em>0</em>件商品</li>
                                <li>总计：0.00元</li>
                            </ul>
                        </div>
                    </div>
                    <div class="total">
                        <ul>
                            <li>商品总额（不含邮费）：</li>
                            <li>0.00元</li>
                        </ul>
                    </div>
                        `;
            $('.list').html(res+total);
        }
    }



    var arr = [];
    //4.全选与单选
    //4.1 单选

    $('.list').on('click','.soncheck',function(){
        updateNum();
        if($(this).is(':checked')) {
            //判断：如果所有的$soncheck都选中则全选打对勾！
            var len = $('.list .soncheck').length;
            var num = 0;
            $('.list .soncheck').each(function() {
                if($(this).is(':checked')) {
                    num++;
                }
            });
            if(num == len) {
                $(this).parents('.carlist').find('.allcheck').prop("checked", true);
            }

        } else {
        //否则，全选取消    
            $(this).parents('.carlist').find('.allcheck').prop("checked", false);
        }

    });



    //4.2 全选
    $('.carlist').on('click','.allcheck',function(){

        if($(this).is(':checked')){
            $(this).parents('.fieldName').next().find('.soncheck').prop("checked", true);
        }else{
            $(this).parents('.fieldName').next().find('.soncheck').prop("checked", false);
        }
        updateNum();
    });

    //5.删除商品
    //5.1 删除当行
    $('.list').on('click','.remove' ,function(){
        var istrue = confirm('您确实要把该商品移出购物车吗？');
        if(istrue){
            $(this).parents('dl').remove();
            // console.log($(this).parents('dl').attr('data-id'));
            //接口：删除购物车订单的数据
            var gid = $(this).parents('dl').attr('data-id');
            $.ajax({
                type:'get',
                url:'../api/cart.php',
                async:true,
                data:{
                    id:gid,
                    way:'del'
                },
                success:function(data){

                }
            });

        }
        updateNum();
        update();
    })

    //储存标记的商品的下标
    function updateNum(){
        //每次重新标记要清空数组
        arr.length = 0;
        var len = $('.soncheck').size(); //选中商品的总个数
        for(var i = 0; i < len; i++) {
            if($('.soncheck').eq(i).prop('checked')) {
                //意味着这一行被勾选
                arr.push(i);
            }
        }
        // console.log(arr);

        //统计勾选行的数量和小计，累计并渲染到对应位置
        var num = 0; //总数量
        var totalPrice = 0; //存总价
        for(var i = 0; i < arr.length; i++) {
            num += $('.goodamount input').eq(arr[i]).val()*1;
            var price = $('.list .goodsum').eq(arr[i]).text()*1;

            totalPrice += price;
        }
        // console.log(num,totalPrice);

        $('.allitem .aileft em').html(num);
        $('.allitem .airight em').html(num);

        $('.allitem .airight ul li').eq(1).html('总计：'+totalPrice.toFixed(2)+'元');
        $('.total ul li').eq(1).html(totalPrice.toFixed(2)+'元');
        
        //商品勾选状态下结算按钮的高亮
        if(totalPrice != 0 && num != 0) {
            if(!$('.balance').hasClass('active')) {
                $('.balance').addClass('active');
            }
        } else {
            if($('.balance').hasClass('active')) {
                $('.balance').removeClass('active');
            }
        }
    }

    //5.2 删除多个
    $('.list').on('click','.removemore',function(){
        var istrue = confirm('您确实要把所选中的商品移出购物车吗？');
        if(istrue){
            for(var i = arr.length-1;i>=0;i--){
                //先获取id再进行商品操作，否则操作反过来会获取不到id
                var gid = $('.soncheck').eq(arr[i]).parents('dl').attr('data-id');
                console.log(gid);
                $('.soncheck').eq(arr[i]).parents('dl').remove();
                // ajax
                $.ajax({
                    type:'get',
                    url:'../api/cart.php',
                    async:true,
                    data:{
                        id:gid,
                        way:'del'
                    },
                    success:function(data){
                        console.log(data);
                    }
                });
            }
        }
        if(arr.length==0){
            alert('您未选中产品，请选择删除的产品！');
        }
        updateNum();
        update();
    });

    //6.加减数量
    function goodSum(now){
        var num = now.parent().find('input').val()*1; //数量
        var price = now.parents('dl').find('.goodprice').text()*1;  //单价
        price = $.trim(price)*1; //工具方法：去除前后空格
        //      console.log(num,price);
        var sum = (num * price).toFixed(2); //保留两个小数，小计：数量*单价
        now.parents('dl').find('.goodsum').html(sum);
    }
    //6.1 加
    $('.list').on('click','.add',function(){
        //获取数量
        var value = $(this).prev().val();
        value++;
        //更改数量
        $(this).prev().val(value);
        //更改小计
        goodSum($(this));
        updateNum();
    });

    //6.2 减
    $('.list').on('click','.sub',function(){
        //获取数量
        var value = $(this).next().val();
        value--;
        if(value<=1){
            value = 1;
        }
        //更改数量
        $(this).next().val(value);
        //更改小计
        goodSum($(this));
        updateNum();
    });

    //7.手动更改数量
    $('.list').on('blur','.goodamount input',function(){
        goodSum($(this));
        updateNum();
    });

    //8.是否存在商品时购物车的页面状态
    function update(){
        if($('.carlist .list dl').size()==0){
            $('.carlist').css('display','none');
            $('.emptycar').css('display','block');
        }else{
            $('.carlist').css('display','block');
            $('.emptycar').css('display','none');
        }
    }

    //9.结算
    $('.list').on('click','.balance',function(){
        if($(this).hasClass('active')){
            var istrue = confirm('您确定是否支付？');
            if(istrue){
                alert('支付成功！');
            }
        }
    });

    //10.继续购物
    $('.list').on('click','.gobuy',function(){
        location.href = '../main.html';
    });
});