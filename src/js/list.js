$(function(){
    //10.商品列渲染
    var now = 1;    //当前第几页
    var pages=0;    //总页数
    $.ajax({
        type:"get",
        url:'../api/list.php',
        async:true,//异步
        success:function(data){
            // console.log(data);
            var arr = JSON.parse(data);
            // console.log(arr);
            // console.log(init(arr));  //-->{datalist: Array(4), total: 5, qty: 4, pages: 2, page: 1}
            $('.goods ul').html(init(arr));
            $('.fr_total').html('总计 '+arr.total+' 个记录');
            $('.fr_page').html('<strong>'+ arr.page +'</strong>/'+ arr.pages);
            pages = arr.pages;
        }
    });
    
    //10.1 初始化数据
    function init(arr){
        var html='';
        var qty = arr.qty;//一页的条数
        var item = arr.datalist;//一页4条数据
        for(var i=0;i<item.length;i++){
            html += `<li data-id='${item[i].id}'>
                        <div class='goodpic'>
                            <img src="${item[i].detailurl}"/>
                        </div>
                        <div class='goodinf'>
                            <p class="name">${item[i].name}</p>
                            <span class='price'>￥${item[i].price}</span>
                            <span class='number fr'>在售</span>
                        </div>
                        <div class='goodother clearfix'>
                            <div>查看详情</div>
                            <div class='addToCart'>添加到购物车</div>
                        </div>
                        <div class="seek">
                            <em></em>在线咨询
                        </div>
                    </li>`;
        }
        //更新上一页下一页状态
        update();
        return html;
    }

    //10.2 上下页按钮的显示
    function update(){
        // console.log(now,pages);
        if(now!=1){ //上一页显示隐藏状态
            $('.frb_prev').css('display','block');
        }else{
            $('.frb_prev').css('display','none');
        }
        if(now!=pages){ //下一页显示隐藏状态
            $('.frb_next').css('display','block');
        }else{
            $('.frb_next').css('display','none');
        }
    }

    //11 上下页切换
    //11.1 下一页
    $('.frb_next').click(function(){
        now++;
        if(now>=pages){
            now=pages;
        }
        $.ajax({
            type:"get",
            url:"../api/list.php",
            async:true,
            data:{'page':now,'qty':4},
            success:function(data){
                var arr = JSON.parse(data);
                // console.log(arr);
                $('.goods ul').html(init(arr));
                $('.fr_page').html('<strong>'+ arr.page +'</strong>/'+ arr.pages);
            }
        });
    });

    //11.2 上一页
    $('.frb_prev').click(function(){
        now--;
        if(now<=1){
            now=1;
        }
        $.ajax({
            type:"get",
            url:"../api/list.php",
            async:true,
            data:{'page':now,'qty':4},
            success:function(data){
                var arr = JSON.parse(data);
                // console.log(arr);
                $('.goods ul').html(init(arr));
                $('.fr_page').html('<strong>'+ arr.page +'</strong>/'+ arr.pages);
            }
        });
    });

    //12.加入购物车
    $('.goods').on('click','.addToCart',function(){
        var gid = $(this).parents('li').attr('data-id');
        // console.log($(this).parents('li').attr('data-id'));
        $.ajax({
            type:"get",
            url:"../api/addCart.php",
            async:true,
            data:{'id':gid,'number':1},
            success:asideCart
        });

        alert('添加到购物车成功！');
        location.reload();
    });

    //13.侧边栏购物车显示
    $.ajax({
        type:"get",
        url:"../api/cart.php",
        async:true,
        data:{way:'shop'},
        success:asideCart
    });

    function asideCart(data){
        var arr = JSON.parse(data);
        // console.log(arr);
        var res = arr.map(function(item){
            return `
                <li class='${item.id}'>
                    <div class="gpic fl">
                        <img src="${item.detailurl}"/>
                    </div>
                    <div class='goodname'>${item.name}</div>
                    <div class='goodprice'>单价：￥<span>${item.price}</span></div>
                    <div class='goodtotal'>
                        <div class="number fl">
                            <div class='sub'> </div>
                            <input type="text" value = '1'/>
                            <div class='add'></div>
                        </div>
                        <div class='pricetotal fl'>￥${item.price}</div>
                                    </div>
                    <div class="goodclose"></div>
                </li>
                    `;
        }).join('');

        $('.goods_scroll').html(res);
    }

    //14. 销量排序
    var istrue = true;
    $('.fleft .hot').click(function(){
        //默认不排序，第一次点击升序
        $(this).addClass('active');
        if(istrue){
            $.ajax({
                type:'get',
                url:'../api/sort.php',
                async:true,
                data:{'way':'asc','key':'hot'},
                success:function(data){
                    var arr = JSON.parse(data);
                    $('.goods ul').html(init(arr));

                }
            });
            $(this).addClass('uplight');
            $(this).removeClass('downlight');
        }else{
           $.ajax({
                type:'get',
                url:'../api/sort.php',
                async:true,
                data:{'way':'desc','key':'hot'},
                success:function(data){
                    var arr = JSON.parse(data);
                    $('.goods ul').html(init(arr));

                }
            });
           $(this).addClass('downlight');
           $(this).removeClass('uplight');
        }

        istrue = !istrue;
        
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

    //7.左分类树状图点击
    //7.1 一级
    $('.sortlist .firstlist').click(function(){
        //加减图片的变化
        this.istrue = !this.istrue; //undefined->true
        if(this.istrue){
            $(this).children(0).children(0).css('background','url(../img/elves4.png) no-repeat -113px -70px');
        }else{
            $(this).children(0).children(0).css('background','url(../img/elves4.png) no-repeat -95px -70px');
        }
        //节点的下一个兄弟节点的状态显示
        $(this).next().toggle();
    });

    //7.2 二级
    $('.secondlist .slitem').click(function(){
        this.istrue = !this.istrue;
        if(this.istrue){
            $(this).children(0).children(0).css('background','url(../img/elves4.png) no-repeat -79px -70px');
        }else{
            $(this).children(0).children(0).css('background','url(../img/elves4.png) no-repeat -63px -70px');
        }
        $(this).next().toggle();
    });

    //8.连锁
    $('.addrcon ul li').click(function(){
        $('.addrcon ul li').removeClass('active');
        $(this).addClass('active');

        var idx = $(this).index();

        $('.addrtab .at').css('display','none');
        $('.addrtab .at').eq(idx).css('display','block');


    });

    //9.商品
    $('.goods').on('mouseover','li',function(){
        $(this).addClass('active');
        $(this).find('.seek').css('display','block');
    });
    $('.goods').on('mouseleave','li',function(){
        $(this).removeClass('active');
        $(this).find('.seek').css('display','none');
    });


});