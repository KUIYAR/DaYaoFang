$(function(){
    //1.侧边栏(购物车和收藏)的点击展开
    $('#aside .aside .sidenav .car,.collection').click(function(){
        if($(this).hasClass('car')){
            //显示购物栏，隐藏收藏栏
            $('.mybuy').css('display','block');
            $('.mycollection').css('display','none');
        }else{
            //显示收藏栏，隐藏购物栏
            $('.mybuy').css('display','none');
            $('.mycollection').css('display','block');
        }
        $('#aside').animate({'right': 265}, 500,'linear');
    });

    //2.侧边栏的缩回
    $('#aside .close').click(function(){
        $('#aside').animate({'right': 0}, 500,'linear');
    });

    //3.除微信外的滑入滑出的显示隐藏
    $('#aside .aside .sidenav .wx').siblings().hover(
        function(){
            $(this).animate({'right': 0}, 400,'linear');
        },
        function(){
            $(this).animate({'right': -71}, 400,'linear');
        }

    );

    //4.微信二维码的显示
    $('#aside .aside .sidenav .wx').hover(
        function(){
            $(this).find('div').eq(0).css('display','block');
        },
        function(){
            $(this).find('div').eq(0).css('display','none');
        }

    );

    //5.返回顶部
    $('#aside .aside .sidenav .returntop').click(function(){
        $('body,html').animate({scrollTop:0},400);
    });

    //6.删除商品
    $('.goods_scroll .goodclose').click(function(){
        var istrue = confirm('您确实要把该商品移出购物车吗？');
        if(istrue){
            $(this).parent().remove();
        }
    });



});