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
});